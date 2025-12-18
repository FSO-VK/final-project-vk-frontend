import { backendClient } from '../../client';
import * as z from 'zod/mini';

export interface ScanMedicationOptions {
  dataMatrixCode: string;
}

export const ScanMedicationDTO = z.object({
  name: z.string(),
  internationalName: z.string(),
  releaseForm: z.string(),
  group: z.array(z.string()),
  producer: z.object({
    name: z.string(),
    country: z.string(),
  }),
  expirationDate: z.pipe(
    z.string(),
    z.transform((val) => new Date(val)),
  ),
  releaseDate: z.optional(
    z.pipe(
      z.string(),
      z.transform((val) => new Date(val)),
    ),
  ),
  amount: z.object({
    value: z.number(),
    unit: z.string(),
  }),
  barCode: z.string(),
});

export async function scan(
  options: ScanMedicationOptions,
): Promise<z.infer<typeof ScanMedicationDTO>> {
  const body = await backendClient.get(`/medication/scan`, {
    query: {
      data: options.dataMatrixCode,
    },
    useCredentials: true,
  });
  return ScanMedicationDTO.parse(body);
}

export async function scanMock(
  _options: ScanMedicationOptions,
): Promise<z.infer<typeof ScanMedicationDTO>> {
  return await Promise.resolve({
    name: 'Фарингосепт',
    internationalName: 'Амбазон',
    releaseForm: 'Таблетки для рассасывания',
    group: ['Антисептическое средство'],
    producer: {
      name: 'С.К. ТЕРАПИЯ С.А.',
      country: 'Румыния',
    },
    amount: {
      value: 20,
      unit: 'шт.',
    },
    barCode: '5944702206931',
    expirationDate: new Date('2027-12-31'),
    releaseDate: new Date('2025-02-24'),
  });
}
