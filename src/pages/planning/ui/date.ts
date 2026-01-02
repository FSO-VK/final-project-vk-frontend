import { type CalendarDate } from './calendar';

export function getDateFormatted(date: Date): string {
  const formatter = new Intl.DateTimeFormat('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
  const formatted = formatter.format(date);
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

export interface ExtendedDay extends CalendarDate {
  dateObj: Date;
}

export function getWeek(time: Date): ExtendedDay[] {
  const dayOfWeek = time.getDay();

  // because week starts from sunday
  const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const day = new Date(time);
  day.setDate(time.getDate() - daysFromMonday);

  const formatter = new Intl.DateTimeFormat('ru-RU', {
    weekday: 'short',
  });
  const week: ExtendedDay[] = [];
  for (let i = 0; i < 7; i++) {
    const current = new Date(day);
    week.push({
      day: current.getDate(),
      dayOfWeek: formatter.format(current),
      month: current.getMonth() + 1,
      year: current.getFullYear(),
      dateObj: new Date(current),
    });
    day.setDate(day.getDate() + 1);
  }
  return week;
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}
