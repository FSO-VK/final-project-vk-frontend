import { backendClient } from '../../client';

export async function unsubscribe(): Promise<void> {
  await backendClient.delete(`/notification/pushSubscription`, {
    useCredentials: true,
  });
}

export async function unsubscribeMock(): Promise<void> {
  return Promise.resolve();
}
