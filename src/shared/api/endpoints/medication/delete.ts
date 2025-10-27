import { backendClient } from '../../client';

export interface DeleteOptions {
  id: string;
}

export async function del(options: DeleteOptions): Promise<void> {
  await backendClient.delete('/medication', { body: options, useCredentials: true });
}

export async function delMock(_options: DeleteOptions): Promise<void> {
  return await Promise.resolve();
}
