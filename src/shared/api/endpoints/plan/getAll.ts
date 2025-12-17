import * as z from 'zod/mini';
import { AddPlanDTO } from './add';
import { backendClient } from '../../client';

export const GetAllPlansDTO = z.object({
  allUserPlans: z.array(AddPlanDTO),
});

export async function getAll(): Promise<z.infer<typeof GetAllPlansDTO>> {
  const body = await backendClient.get('/planning/plan/all', {
    useCredentials: true,
  });
  return GetAllPlansDTO.parse(body);
}

export async function getAllMock(): Promise<z.infer<typeof GetAllPlansDTO>> {
  return await Promise.resolve({
    allUserPlans: [
      AddPlanDTO.parse({
        medicationId: '23637986-6453-43ad-9d10-7a7c8a271c71',
        amount: {
          value: 5,
          unit: 'мл',
        },
        condition: 'Надо принять аспирин с верхней полки',
        status: 'active',
        startDate: '2025-12-15',
        endDate: '2027-02-28',
        recurrenceRule: [
          'DTSTART;TZID=:20251215T000000\nRRULE:FREQ=WEEKLY;INTERVAL=2;UNTIL=20270228T000000Z;BYDAY=MO;BYHOUR=12;BYMINUTE=45',
          'DTSTART;TZID=:20251215T000000\nRRULE:FREQ=DAILY;UNTIL=20270228T000000Z;BYHOUR=20;BYMINUTE=15',
        ],
        id: '019b2759-dc5b-7291-bf1b-b7077bd62752',
      }),
      AddPlanDTO.parse({
        medicationId: '23637986-6453-43ad-9d10-7a7c8a271c71',
        amount: {
          value: 5,
          unit: 'мл',
        },
        condition: 'Надо принять аспирин с верхней полки',
        status: 'finished',
        startDate: '2025-12-15',
        endDate: '2027-02-28',
        recurrenceRule: [
          'DTSTART;TZID=:20251215T000000\nRRULE:FREQ=WEEKLY;INTERVAL=2;UNTIL=20270228T000000Z;BYDAY=MO;BYHOUR=12;BYMINUTE=45',
          'DTSTART;TZID=:20251215T000000\nRRULE:FREQ=DAILY;UNTIL=20270228T000000Z;BYHOUR=20;BYMINUTE=15',
        ],
        id: '019b2759-dc5b-7291-bf1b-b7077bd62752',
      }),
      AddPlanDTO.parse({
        medicationId: '23637986-6453-43ad-9d10-7a7c8a271c71',
        amount: {
          value: 5,
          unit: 'мл',
        },
        condition: 'Надо принять аспирин с верхней полки',
        status: 'active',
        startDate: '2025-12-15',
        endDate: '2027-02-28',
        recurrenceRule: [
          'DTSTART;TZID=:20251215T000000\nRRULE:FREQ=WEEKLY;INTERVAL=2;UNTIL=20270228T000000Z;BYDAY=MO;BYHOUR=12;BYMINUTE=45',
          'DTSTART;TZID=:20251215T000000\nRRULE:FREQ=DAILY;UNTIL=20270228T000000Z;BYHOUR=20;BYMINUTE=15',
        ],
        id: '019b2759-dc5b-7291-bf1b-b7077bd62752',
      }),
      AddPlanDTO.parse({
        medicationId: '23637986-6453-43ad-9d10-7a7c8a271c71',
        amount: {
          value: 5,
          unit: 'мл',
        },
        condition: 'Надо принять аспирин с верхней полки',
        status: 'finished',
        startDate: '2025-12-15',
        endDate: '2027-02-28',
        recurrenceRule: [
          'DTSTART;TZID=:20251215T000000\nRRULE:FREQ=WEEKLY;INTERVAL=2;UNTIL=20270228T000000Z;BYDAY=MO;BYHOUR=12;BYMINUTE=45',
          'DTSTART;TZID=:20251215T000000\nRRULE:FREQ=DAILY;UNTIL=20270228T000000Z;BYHOUR=20;BYMINUTE=15',
        ],
        id: '019b2759-dc5b-7291-bf1b-b7077bd62752',
      }),
    ],
  });
}
