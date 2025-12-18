import { backendClient } from '../../client';
import { BaseDTO } from './dto';
import { RequiredOptions, OptionalOptions } from './options';

import * as z from 'zod/mini';

export interface AddMedicationOptions extends RequiredOptions, OptionalOptions {
  barCode?: string;
}

export const AddMedicationDTO = BaseDTO;

export async function add(
  options: AddMedicationOptions,
): Promise<z.infer<typeof AddMedicationDTO>> {
  const body = await backendClient.post('/medication/medication', {
    body: options,
    useCredentials: true,
  });
  return AddMedicationDTO.parse(body);
}

export async function addMock(
  options: AddMedicationOptions,
): Promise<z.infer<typeof AddMedicationDTO>> {
  return await Promise.resolve({
    id: 'fab5d740-e92a-4634-b2c9-f6c7a980e8f7',
    ...options,
  });
}
