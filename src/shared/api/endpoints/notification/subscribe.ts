import { backendClient } from '../../client';

import * as z from 'zod/mini';

export interface SubscribeOptions {
  subscription: {
    endpoint: string;
    keys: {
      p256dh: string;
      auth: string;
    };
  };
  ua: string;
}

export const SubscribeDTO = z.object({
  id: z.string(),
  userId: z.string(),
  subscription: z.object({
    endpoint: z.url(),
    keys: z.object({
      p256dh: z.string(),
      auth: z.string(),
    }),
  }),
  ua: z.string(),
});

export async function subscribe(options: SubscribeOptions): Promise<z.infer<typeof SubscribeDTO>> {
  const body = await backendClient.post('/notification/pushSubscription', {
    useCredentials: true,
    body: options,
  });
  return SubscribeDTO.parse(body);
}

export async function subscribeMock(
  options: SubscribeOptions,
): Promise<z.infer<typeof SubscribeDTO>> {
  return await Promise.resolve({
    id: '6c9d21e7-2328-47e4-a767-14c96f814b2c',
    userId: 'cce5d740-e92a-4634-b2c9-f6c7a980e8f7',
    subscription: options.subscription,
    ua: options.ua,
  });
}
