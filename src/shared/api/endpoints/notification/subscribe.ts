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

const SubscriptionDTO = z.object({
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
  isActive: z.boolean(),
});

export async function subscribe(
  options: SubscribeOptions,
): Promise<z.infer<typeof SubscriptionDTO>> {
  const body = await backendClient.post('/notification/pushSubscription', {
    useCredentials: true,
    body: options,
  });
  return SubscriptionDTO.parse(body);
}

export async function subscribeMock(
  options: SubscribeOptions,
): Promise<z.infer<typeof SubscriptionDTO>> {
  return await Promise.resolve({
    id: '6c9d21e7-2328-47e4-a767-14c96f814b2c',
    userId: 'cce5d740-e92a-4634-b2c9-f6c7a980e8f7',
    subscription: options.subscription,
    ua: options.ua,
    isActive: true,
  });
}
