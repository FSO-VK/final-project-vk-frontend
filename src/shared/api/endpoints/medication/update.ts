import { backendClient } from '../../client';
import { BaseDTO } from './dto';
import { RequiredOptions, OptionalOptions } from './options';

import * as z from 'zod/mini';

export interface UpdateOptions extends RequiredOptions, OptionalOptions {
  id: string;
}

export const UpdateDTO = BaseDTO;

export async function update(options: UpdateOptions): Promise<z.infer<typeof UpdateDTO>> {
  const body = await backendClient.put('/medication', { body: options, useCredentials: true });
  return UpdateDTO.parse(body);
}

export async function updateMock(options: UpdateOptions): Promise<z.infer<typeof UpdateDTO>> {
  return await Promise.resolve(options);
}
