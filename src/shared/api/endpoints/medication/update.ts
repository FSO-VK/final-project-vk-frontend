import { backendClient } from '../../client';
import { BaseDTO } from './dto';
import { RequiredOptions, OptionalOptions } from './options';

import * as z from 'zod/mini';

export interface UpdateMedicationOptions extends RequiredOptions, OptionalOptions {
  id: string;
}

export const UpdateMedicationDTO = BaseDTO;

export async function update(
  options: UpdateMedicationOptions,
): Promise<z.infer<typeof UpdateMedicationDTO>> {
  const body = await backendClient.put('/medication/medication', {
    body: options,
    useCredentials: true,
  });
  return UpdateMedicationDTO.parse(body);
}

export async function updateMock(
  options: UpdateMedicationOptions,
): Promise<z.infer<typeof UpdateMedicationDTO>> {
  return await Promise.resolve(options);
}
