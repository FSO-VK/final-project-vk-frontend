import { createSignal } from 'solid-js';
import { CalendarRowSection, Day } from './calendar';

export function SchedulePage() {
  const days: Day[] = [
    { dayOfWeek: 'пн', day: 1 },
    { dayOfWeek: 'вт', day: 2 },
    { dayOfWeek: 'ср', day: 3 },
    { dayOfWeek: 'чт', day: 4 },
    { dayOfWeek: 'пт', day: 5 },
    { dayOfWeek: 'сб', day: 6 },
    { dayOfWeek: 'вс', day: 7 },
  ];

  const currentDay = 3;

  const [selectedDay, setSelectedDay] = createSignal(currentDay);

  return (
    <main>
      <section>
        <CalendarRowSection
          days={days}
          today={currentDay}
          currentDay={selectedDay()}
          onDateClick={(day: number) => {
            setSelectedDay(day);
          }}
        />
      </section>
    </main>
  );
}
