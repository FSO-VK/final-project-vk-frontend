import * as z from 'zod/mini';
import { backendClient } from '../../client';

export interface AddPlanOptions {
  medicationId: string;
  amount: { value: number; unit: string };
  condition: string;
  startDate: Date;
  endDate: Date;
  recurrenceRule: string[];
}

export const AddPlanDTO = z.object({
  id: z.uuid(),
  medicationId: z.uuid(),
  amount: z.object({
    value: z.number(),
    unit: z.string(),
  }),
  condition: z.string(),
  status: z.enum(['active', 'finished', 'draft']),
  startDate: z.pipe(
    z.iso.date(),
    z.transform((val) => new Date(val)),
  ),
  endDate: z.pipe(
    z.iso.date(),
    z.transform((val) => new Date(val)),
  ),
  recurrenceRule: z.array(z.string()),
});

export async function add(options: AddPlanOptions): Promise<z.infer<typeof AddPlanDTO>> {
  const body = await backendClient.post('/planning/plan', {
    body: {
      ...options,
    },
    useCredentials: true,
  });
  return AddPlanDTO.parse(body);
}

export async function addMock(_: AddPlanOptions): Promise<z.infer<typeof AddPlanDTO>> {
  return await Promise.resolve(
    AddPlanDTO.parse({
      medicationId: '019b2759-7bc6-731a-8837-e4cdf8aa1700',
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
  );
}
