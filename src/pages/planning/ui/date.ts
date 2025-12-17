import { type Day } from './calendar';

export function getDateFormatted(date: Date): string {
  const formatter = new Intl.DateTimeFormat('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
  const formatted = formatter.format(date);
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

export function getCurrentWeek(time: Date): Day[] {
  const dayOfWeek = time.getDay();

  // because week starts from sunday
  const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const day = new Date(time);
  day.setDate(time.getDate() - daysFromMonday);

  const formatter = new Intl.DateTimeFormat('ru-RU', {
    weekday: 'short',
  });
  const week: Day[] = [];
  for (let i = 0; i < 7; i++) {
    const current = new Date(day);
    week.push({
      date: current.getDate(),
      dayOfWeek: formatter.format(current),
    });
    day.setDate(day.getDate() + 1);
  }
  return week;
}
