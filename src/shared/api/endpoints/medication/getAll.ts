import { backendClient } from '../../client';
import { BaseDTO } from './dto';
import * as z from 'zod/mini';

export const GetAllMedicationsDTO = z.object({
  medicationBox: z.array(BaseDTO),
});

export async function getAll(): Promise<z.infer<typeof GetAllMedicationsDTO>> {
  const body = await backendClient.get('/medicine/all');
  return GetAllMedicationsDTO.parse(body);
}

export async function getAllMock(): Promise<z.infer<typeof GetAllMedicationsDTO>> {
  return await Promise.resolve({
    medicationBox: [
      {
        id: '23637986-6453-43ad-9d10-7a7c8a271c71',
        name: 'Фарингосепт',
        internationalName: 'Амбазон',
        amount: {
          value: 20,
          unit: 'шт.',
        },
        releaseForm: 'Таблетки для рассасывания',
        group: 'Антисептическое средство',
        producer: {
          name: 'С.К. ТЕРАПИЯ С.А.',
          country: 'Румыния',
        },
        activeSubstance: {
          name: 'Амбазона моногидрат',
          value: 10,
          unit: 'мг',
        },
        expirationDate: new Date('2027-12-31'),
        releaseDate: new Date('2025-12-31'),
      },
    ],
  });
}
