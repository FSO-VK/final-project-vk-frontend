import { backendClient } from '../../client';
import * as z from 'zod/mini';

export interface RegisterOptions {
  email: string;
  password: string;
}

export const RegisterDTO = z.object({
  userId: z.uuid(),
});

// register endpoint returns created user and sets session cookie.
export async function register(options: RegisterOptions): Promise<z.infer<typeof RegisterDTO>> {
  const body = await backendClient.post('/auth/user', { body: options, useCredentials: true });
  return RegisterDTO.parse(body);
}

export async function registerMock(
  _options: RegisterOptions,
): Promise<z.infer<typeof RegisterDTO>> {
  return await Promise.resolve({
    userId: 'cce5d740-e92a-4634-b2c9-f6c7a980e8f7',
  });
}
