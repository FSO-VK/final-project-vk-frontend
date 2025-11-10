import * as z from 'zod/mini';

import {
  type SubscribeOptions,
  SubscribeDTO as _SubscribeDTO,
  subscribeMock,
  subscribe,
} from './subscribe';
import { GetVapidDTO as _GetVapidDTO, getVapidMock, getVapid } from './getVapid';
import { unsubscribe, unsubscribeMock } from './unsubscribe';

export type SubscribeDTO = z.infer<typeof _SubscribeDTO>;
export type GetVapidDTO = z.infer<typeof _GetVapidDTO>;

export type { SubscribeOptions };

export interface NotificationApi {
  subscribe: (o: SubscribeOptions) => Promise<SubscribeDTO>;
  unsubscribe: () => Promise<void>;
  getVapid: () => Promise<GetVapidDTO>;
}

export let notificationApi: NotificationApi;

if (import.meta.env.MODE === 'development') {
  notificationApi = {
    getVapid: getVapidMock,
    subscribe: subscribeMock,
    unsubscribe: unsubscribeMock,
  };
} else {
  notificationApi = {
    getVapid,
    subscribe,
    unsubscribe,
  };
}
