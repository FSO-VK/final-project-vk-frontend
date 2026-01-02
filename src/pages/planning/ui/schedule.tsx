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
  const weeks: () => ExtendedDay[][] = createMemo(() => {
    const date = new Date(anchorDate());
    return [getWeek(addDays(date, -7)), getWeek(date), getWeek(addDays(date, 7))];
  });
  const currentDate = new Date();
  const currentDay: CalendarDate = {
    day: currentDate.getDate(),
    dayOfWeek: currentDate.toLocaleDateString('ru-RU', { weekday: 'short' }),
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
  };
  const [selectedDay, setSelectedDay] = createSignal(currentDay);
  const selectedDate = createMemo(() => {
    return weeks()[1].find((d) => {
      return (
        d.day === selectedDay().day &&
        d.month === selectedDay().month &&
        d.year === selectedDay().year
      );
    })?.dateObj;
  });

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

  const pointerDownHandler = (e: PointerEvent) => {
    const elem = e.currentTarget as HTMLElement;
    // cause there are 3 week rows in a track (previous, current and next).
    calendarRowWidth = elem.getBoundingClientRect().width / 3;

    swipeStartX = e.clientX;
    isPointerHold = true;

    elem.style.transition = 'none';
  };

  const pointerMoveHandler = (e: PointerEvent) => {
    if (!isPointerHold) {
      return;
    }

    const diffX = e.clientX - swipeStartX;
    const dragThreshold = 10;
    if (Math.abs(diffX) <= dragThreshold) {
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

  let weekSwipeDirection = 0; // -1 - previous week, 0 - current week, 1 - next week
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
    const swipeThreshold = 0.6 * calendarRowWidth;
    let adjustedTransform = -calendarRowWidth;
    if (diffTransform > swipeThreshold) {
      adjustedTransform = 0;
      weekSwipeDirection = -1;
    } else if (diffTransform < -swipeThreshold) {
      adjustedTransform = -2 * calendarRowWidth;
      weekSwipeDirection = 1;
    }

    currentTransform = 0;
    elem.style.transition = `transform 0.5s ease-in-out`;
    elem.style.transform = `translateX(${adjustedTransform}px)`;
  };

  const transitionEndHandler = (e: TransitionEvent) => {
    if (weekSwipeDirection === 0) {
      return;
    }

    setAnchorDate((date) => addDays(date, weekSwipeDirection * 7));

    const elem = e.currentTarget as HTMLElement;
    elem.style.transition = 'none';
    elem.style.transform = `translateX(${-calendarRowWidth}px)`;
    weekSwipeDirection = 0;
  };

  return (
    <main class="schedule-page">
      <section class="schedule-page__calendar">
        <div class="schedule-page__current-date">{getDateFormatted(currentDate)}</div>
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
