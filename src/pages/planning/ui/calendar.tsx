import './calendar.css';
import { createSelector, For, type JSX } from 'solid-js';

export interface Day {
  dayOfWeek: string;
  date: number;
}

export interface CalendarRowSectionProps extends JSX.HTMLAttributes<HTMLDivElement> {
  days?: Day[];
  today?: number;
  currentDay?: number;
  onDateClick: (day: number) => void;
}

export function CalendarRowSection(props: CalendarRowSectionProps) {
  const isSelected = createSelector(() => props.currentDay);

  const classModifier = (day: number) => {
    if (isSelected(day)) {
      return 'calendar-row__cell_selected';
    }
    if (day === props.today) {
      return 'calendar-row__cell_today';
    }
    return '';
  };

  return (
    <div class="calendar-row__container">
      <For each={props.days}>
        {(day) => (
          <div
            class={`calendar-row__cell ${classModifier(day.date)}`}
            onClick={[props.onDateClick, day.date]}
          >
            <div>{day.date}</div>
            <div>{day.dayOfWeek}</div>
          </div>
        )}
      </For>
    </div>
  );
}
