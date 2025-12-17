import { createResource, createSignal, Suspense } from 'solid-js';
import { useLayoutStore } from '@/widgets/layouts';
import { CalendarRowSection, type Day } from './calendar';
import './schedule.css';
import { EmptyScreen } from '@/shared/ui/empty_screen/empty_screen';
import { getCurrentWeek, getDateFormatted } from './date';
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

  const date = new Date();
  const days: Day[] = getCurrentWeek(date);
  const currentDay = date.getDate();

  const [selectedDay, setSelectedDay] = createSignal(currentDay);
  const selectedDate = createMemo(() => {
    const d = new Date(Date.now());
    d.setDate(selectedDay());
    return d;
  });

  const timeFormatter = Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const planStore = usePlanStore();
  const [currentSchedule] = createResource(
    selectedDate,
    async (day) => {
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
        keys: Array.from(scheduleMap.keys()),
        values: schedule,
        map: scheduleMap,
      };
    },
    { ssrLoadFrom: 'initial' },
  );

  return (
    <main class="schedule-page">
      <section class="schedule-page__calendar">
        <div class="schedule-page__current-date">{getDateFormatted(date)}</div>
        <div class="schedule-page__calendar-row">
          <CalendarRowSection
            days={days}
            today={currentDay}
            currentDay={selectedDay()}
            onDateClick={(day: number) => {
              setSelectedDay(day);
            }}
          />
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
