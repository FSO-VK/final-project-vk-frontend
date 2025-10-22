import { backendClient } from '../../client';

// logout endpoint removes session cookie.
export async function logout() {
  await backendClient.delete('/auth/session', { useCredentials: true });
}

export async function logoutMock() {
  return new Promise<void>(() => {
    return;
  });
}
