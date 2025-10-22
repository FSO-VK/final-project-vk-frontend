import { backendClient } from '../../client';
import * as z from 'zod/mini';

export const CheckAuthDTO = z.object({
  userId: z.uuid(),
});

// check auth endpoint validates current session id and returns
// user.
export async function checkAuth(): Promise<z.infer<typeof CheckAuthDTO>> {
  const body = await backendClient.get('/auth/session', { useCredentials: true });
  return CheckAuthDTO.parse(body);
}

export async function checkAuthMock(): Promise<z.infer<typeof CheckAuthDTO>> {
  return new Promise(() => {
    return { userId: 'cce5d740-e92a-4634-b2c9-f6c7a980e8f7' };
  });
}
