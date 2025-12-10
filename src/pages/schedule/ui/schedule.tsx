import { createSignal } from 'solid-js';
import { useLayoutStore } from '@/widgets/layouts';
import { CalendarRowSection, type Day } from './calendar';
import './schedule.css';
import { EmptyScreen } from '@/shared/ui/empty_screen/empty_screen';
import { getCurrentWeek, getDateFormatted } from './date';

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
      <EmptyScreen />
    </main>
  );
}
