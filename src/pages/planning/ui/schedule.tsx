import { createResource, createSignal, Suspense } from 'solid-js';
import { useLayoutStore } from '@/widgets/layouts';
import { CalendarRowSection, type CalendarDate } from './calendar';
import './schedule.css';
import { EmptyScreen } from '@/shared/ui/empty_screen/empty_screen';
import { type ExtendedDay, getWeek, getDateFormatted, addDays } from './date';
import { createMemo, Show } from 'solid-js';
import { IntakeRecordCard, usePlanStore } from '@/entities/plan';
import { For } from 'solid-js';
import { CenteredLoaderSpinner } from '@/shared/ui';
import { IntakeRecord } from '@/entities/plan/model/plan';

export function SchedulePage() {
  const layoutStore = useLayoutStore();

  layoutStore.setNavbarState({
    showBackButton: false,
    showDropdownMenu: false,
    dropdownMenuItems: [],
    title: 'Расписание',
  });

  const [anchorDate, setAnchorDate] = createSignal(new Date());
  // create 3 weeks: previous, current and next for swipe purposes
  const weeks: () => ExtendedDay[][] = createMemo(() => {
    const date = new Date(anchorDate());
    return [getWeek(addDays(date, -7)), getWeek(date), getWeek(addDays(date, 7))];
  });
  const currentDate = new Date();
  const currentDay: CalendarDate = {
    day: currentDate.getDate(),
    dayOfWeek: currentDate.toLocaleDateString('ru-RU', { weekday: 'short' }),
    month: currentDate.getMonth(),
    year: currentDate.getFullYear(),
  };
  const [selectedDay, setSelectedDay] = createSignal(currentDay);
  const [selectedDate, setSelectedDate] = createSignal(currentDate);

  const timeFormatter = Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const planStore = usePlanStore();
  const [currentSchedule] = createResource(
    selectedDate,
    async (day) => {
      if (!day) {
        return undefined;
      }
      const schedule = await planStore.getSchedule(day);
      const scheduleMap = new Map<string, IntakeRecord[]>();
      schedule.forEach((intakeRecord) => {
        const time = timeFormatter.format(intakeRecord.plannedAt);
        if (scheduleMap.has(time)) {
          scheduleMap.set(time, [...scheduleMap.get(time)!, intakeRecord]);
        } else {
          scheduleMap.set(time, [intakeRecord]);
        }
      });
      return {
        keys: Array.from(scheduleMap.keys()).sort(),
        values: schedule,
        map: scheduleMap,
      };
    },
    { ssrLoadFrom: 'initial' },
  );

  let calendarRowWidth = 0;
  let isDrag = false;
  let isPointerHold = false;
  let swipeStartX = 0;
  let currentTransform = 0;

  const DRAG_THRESHOLD = 10;
  const SWIPE_THRESHOLD_PERCENTAGE = 30;
  const TRANSITION_NONE = 'none';
  const TRANSITION_TRANSFORM = 'transform 0.5s ease-in-out';

  const pointerDownHandler = (e: PointerEvent) => {
    const elem = e.currentTarget as HTMLElement;
    // cause there are 3 week rows in a track (previous, current and next).
    calendarRowWidth = elem.getBoundingClientRect().width / 3;

    swipeStartX = e.clientX;
    isPointerHold = true;

    elem.style.transition = TRANSITION_NONE;
  };

  const pointerMoveHandler = (e: PointerEvent) => {
    if (!isPointerHold) {
      return;
    }

    const diffX = e.clientX - swipeStartX;
    if (Math.abs(diffX) <= DRAG_THRESHOLD) {
      // got a small move, assume is's as a click.
      // it's necessary to handle click on date cells.
      return;
    }

    currentTransform = diffX + -calendarRowWidth;
    isDrag = true;

    const elem = e.currentTarget as HTMLElement;
    elem.setPointerCapture(e.pointerId);
    elem.style.transform = `translateX(${currentTransform}px)`;
  };

  enum SwipeDirection {
    NoSwipe,
    Previous,
    Next,
  }

  let weekSwipeDirection = SwipeDirection.NoSwipe;
  const pointerUpHandler = (e: PointerEvent) => {
    if (isPointerHold && !isDrag) {
      // no swipe just a click
      isPointerHold = false;
      return;
    }
    isDrag = false;
    isPointerHold = false;

    const elem = e.currentTarget as HTMLElement;
    const diffTransform = currentTransform - -calendarRowWidth; // by default translateX is negative

    // need to adjust CalendarRow position after swipe: Monday is left and Sunday is right.
    const swipeThreshold = (SWIPE_THRESHOLD_PERCENTAGE / 100) * calendarRowWidth;
    let adjustedTransform = -calendarRowWidth;
    if (diffTransform > swipeThreshold) {
      weekSwipeDirection = SwipeDirection.Previous;
      adjustedTransform = 0; // index of previous week
    } else if (diffTransform < -swipeThreshold) {
      weekSwipeDirection = SwipeDirection.Next;
      adjustedTransform = 2 * -calendarRowWidth; // index of next week
    }

    currentTransform = 0;
    elem.style.transition = TRANSITION_TRANSFORM;
    elem.style.transform = `translateX(${adjustedTransform}px)`;
  };

  const transitionEndHandler = (e: TransitionEvent) => {
    if (weekSwipeDirection === SwipeDirection.NoSwipe) {
      return;
    }

    switch (weekSwipeDirection) {
      case SwipeDirection.Previous:
        setAnchorDate((date) => addDays(date, -7));
        break;
      case SwipeDirection.Next:
        setAnchorDate((date) => addDays(date, 7));
        break;
      default:
        console.error('unknown swipe direction:', weekSwipeDirection);
    }

    const elem = e.currentTarget as HTMLElement;
    elem.style.transition = TRANSITION_NONE;
    elem.style.transform = `translateX(${-calendarRowWidth}px)`;
    weekSwipeDirection = 0;
  };

  return (
    <main class="schedule-page">
      <section class="schedule-page__calendar">
        <div class="schedule-page__current-date">{getDateFormatted(selectedDate())}</div>
        <div class="schedule-page__calendar-window">
          <div
            class="schedule-page__calendar-track"
            onPointerDown={pointerDownHandler}
            onPointerUp={pointerUpHandler}
            onPointerMove={pointerMoveHandler}
            onPointerCancel={pointerUpHandler}
            onTransitionEnd={transitionEndHandler}
          >
            <For each={weeks()}>
              {(week) => {
                return (
                  <div class="schedule-page__calendar-slide">
                    <CalendarRowSection
                      days={week}
                      today={currentDay}
                      selectedDay={selectedDay()}
                      onDateClick={(day: CalendarDate) => {
                        setSelectedDay(day);
                        setSelectedDate(new Date(day.year, day.month, day.day));
                      }}
                    />
                  </div>
                );
              }}
            </For>
          </div>
        </div>
      </section>
      <Suspense fallback={<CenteredLoaderSpinner />}>
        <Show when={currentSchedule.latest !== undefined} fallback={<EmptyScreen />}>
          <For each={currentSchedule.latest?.keys}>
            {(time) => {
              return (
                <div class="schedule-page__intake-record-time-block">
                  <div class="schedule-page__intake-time">{time}</div>
                  <div class="schedule-page__intake-record-list">
                    <For each={currentSchedule.latest?.map.get(time) ?? []}>
                      {(intakeRecord) => {
                        return <IntakeRecordCard intakeRecord={intakeRecord} />;
                      }}
                    </For>
                  </div>
                </div>
              );
            }}
          </For>
        </Show>
      </Suspense>
    </main>
  );
}
