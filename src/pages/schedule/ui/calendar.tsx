import './calendar.css';
import { For, JSX } from 'solid-js';

const dayOfWeeks = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export function CalendarRowSection(_props: JSX.HTMLAttributes<HTMLDivElement>) {
  return (
    <div class="calendar-row__container">
      <For each={dayOfWeeks}>
        {(dayOfWeek, day) => (
          <div class="calendar-row__cell">
            <div>{day()}</div>
            <div>{dayOfWeek}</div>
          </div>
        )}
      </For>
    </div>
  );
}
