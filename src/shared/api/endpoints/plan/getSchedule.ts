import * as z from 'zod/mini';
import { backendClient } from '../../client';

export interface GetScheduleOptions {
  startDate: Date;
  endDate: Date;
}

export const GetScheduleDTO = z.object({
  schedule: z.array(
    z.object({
      intakeRecordId: z.uuid(),
      medicationId: z.uuid(),
      medicationName: z.string(),
      amount: z.object({
        value: z.number(),
        unit: z.string(),
      }),
      status: z.enum(['Запланировано', 'Принято', 'Пропущено']),
      plannedAt: z.pipe(
        z.iso.datetime(),
        z.transform((val) => new Date(val)),
      ),
      takenAt: z.optional(
        z.pipe(
          z.iso.datetime(),
          z.transform((val) => new Date(val)),
        ),
      ),
    }),
  ),
});

export async function getSchedule(
  options: GetScheduleOptions,
): Promise<z.infer<typeof GetScheduleDTO>> {
  const body = await backendClient.get('/planning/plan/schedule', {
    useCredentials: true,
    query: {
      start: options.startDate.toISOString(),
      end: options.endDate.toISOString(),
    },
  });
  return GetScheduleDTO.parse(body);
}

export async function getScheduleMock(
  _: GetScheduleOptions,
): Promise<z.infer<typeof GetScheduleDTO>> {
  return await Promise.resolve({
    schedule: [
      {
        intakeRecordId: '4463344b-df4c-4ac4-8a83-7f24ebd5e829',
        medicationId: '23637986-6453-43ad-9d10-7a7c8a271c71',
        medicationName: 'Фарингосепт',
        amount: {
          value: 1,
          unit: 'шт.',
        },
        status: 'Запланировано',
        plannedAt: new Date(Date.now()),
      },
      {
        intakeRecordId: '4463344b-df4c-4ac4-8a83-7f24ebd5e829',
        medicationId: '23637986-6453-43ad-9d10-7a7c8a271c71',
        medicationName: 'Фарингосепт',
        amount: {
          value: 1,
          unit: 'шт.',
        },
        status: 'Принято',
        plannedAt: new Date(Date.now()),
        takenAt: new Date(Date.now()),
      },
      {
        intakeRecordId: '4463344b-df4c-4ac4-8a83-7f24ebd5e829',
        medicationId: '23637986-6453-43ad-9d10-7a7c8a271c71',
        medicationName: 'Фарингосепт',
        amount: {
          value: 1,
          unit: 'шт.',
        },
        status: 'Пропущено',
        plannedAt: new Date(Date.now()),
        takenAt: new Date(Date.now()),
      },
    ],
  });
}
