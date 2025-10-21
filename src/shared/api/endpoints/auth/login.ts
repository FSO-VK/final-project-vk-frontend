import { backendClient } from '../../client';
import * as z from 'zod/mini';

export interface LoginOptions {
  email: string;
  password: string;
}

export const LoginDTO = z.object({
  userId: z.uuid(),
});

// login endpoint returns userID and sets session cookie.
export async function login(options: LoginOptions): Promise<z.infer<typeof LoginDTO>> {
  // in order to receive credentials, we should use them :D
  const body = await backendClient.post('/auth/session', { body: options, useCredentials: true });
  return LoginDTO.parse(body);
}

export async function loginMock(_options: LoginOptions): Promise<z.infer<typeof LoginDTO>> {
  // This shit-looking code is a way to shut up linter who wants
  // await statement inside async functions
  return await new Promise(() => {
    return {
      userId: 'cce5d740-e92a-4634-b2c9-f6c7a980e8f7',
    };
  });
}
