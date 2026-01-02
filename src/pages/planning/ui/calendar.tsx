import './calendar.css';
import { createSelector, For, type JSX } from 'solid-js';

export interface CalendarDate {
  dayOfWeek: string;
  day: number;
  month: number;
  year: number;
}

export interface CalendarRowSectionProps extends JSX.HTMLAttributes<HTMLDivElement> {
  days?: CalendarDate[];
  today?: CalendarDate;
  selectedDay?: CalendarDate;
  onDateClick: (day: CalendarDate) => void;
}

export function CalendarRowSection(props: CalendarRowSectionProps) {
  const isSelected = createSelector(() => props.selectedDay);

  const classModifier = (day: CalendarDate) => {
    if (isSelected(day)) {
      return 'calendar-row__cell_selected';
    }
    if (
      day.day === props?.today?.day &&
      day.month === props?.today?.month &&
      day.year === props?.today?.year
    ) {
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
