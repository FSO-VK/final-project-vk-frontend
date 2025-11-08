import { backendClient } from '../../client';

export interface UnsubscribeOptions {
  id: string;
}

export async function unsubscribe(options: UnsubscribeOptions): Promise<void> {
  await backendClient.delete(`/notification/pushSubscription/${options.id}`, {
    useCredentials: true,
  });
}

export async function unsubscribeMock(_options: UnsubscribeOptions): Promise<void> {
  return Promise.resolve();
}
