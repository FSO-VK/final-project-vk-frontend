import { backendClient } from '../../client';
import { BaseDTO } from './dto';
import { RequiredOptions, OptionalOptions } from './options';

import * as z from 'zod/mini';

export interface AddOptions extends RequiredOptions, OptionalOptions {}

export const AddDTO = BaseDTO;

export async function add(options: AddOptions): Promise<z.infer<typeof AddDTO>> {
  const body = await backendClient.post('/medication', { body: options, useCredentials: true });
  return AddDTO.parse(body);
}

export async function addMock(options: AddOptions): Promise<z.infer<typeof AddDTO>> {
  return await Promise.resolve({
    id: 'fab5d740-e92a-4634-b2c9-f6c7a980e8f7',
    ...options,
  });
}
