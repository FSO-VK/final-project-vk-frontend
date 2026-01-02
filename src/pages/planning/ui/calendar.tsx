import './calendar.css';
import { createSelector, For, type JSX } from 'solid-js';

export interface CalendarDate {
  dayOfWeek: string;
  day: number;
  month: number;
  year: number;
}

// shitty way to create keys for comparison of CalendarDates
// cause createSelector compares by reference (===)
const getCalendarDateKey = (date: CalendarDate | undefined) => {
  if (!date) {
    return '';
  }
  return `${date.year}-${date.month}-${date.day}`;
};

export interface CalendarRowSectionProps extends JSX.HTMLAttributes<HTMLDivElement> {
  days?: CalendarDate[];
  today?: CalendarDate;
  selectedDay?: CalendarDate;
  onDateClick: (day: CalendarDate) => void;
}

export function CalendarRowSection(props: CalendarRowSectionProps) {
  const isSelected = createSelector(() => getCalendarDateKey(props.selectedDay));

  const classModifier = (day: CalendarDate) => {
    const key = getCalendarDateKey(day);
    if (isSelected(key)) {
      return 'calendar-row__cell_selected';
    }
    if (getCalendarDateKey(props.today) === key) {
      return 'calendar-row__cell_today';
    }
    return '';
  };

  return (
    <div class="calendar-row__container">
      <For each={props.days}>
        {(day) => (
          <div
            class={`calendar-row__cell ${classModifier(day)}`}
            onClick={[props.onDateClick, day]}
          >
            <div>{day.day}</div>
            <div>{day.dayOfWeek}</div>
          </div>
        )}
      </For>
    </div>
  );
}
