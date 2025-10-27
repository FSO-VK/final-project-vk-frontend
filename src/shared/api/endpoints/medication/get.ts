import { backendClient } from '../../client';
import * as z from 'zod/mini';
import { BaseDTO } from './dto';

export interface GetOptions {
  id: string;
}

export const GetDTO = BaseDTO;

export async function get(options: GetOptions): Promise<z.infer<typeof GetDTO>> {
  const body = await backendClient.get(`/medication/${options.id}`, { useCredentials: true });
  return GetDTO.parse(body);
}

export async function getMock(options: GetOptions): Promise<z.infer<typeof GetDTO>> {
  return await Promise.resolve({
    id: options.id,
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
  });
}
