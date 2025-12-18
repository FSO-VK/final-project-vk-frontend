/// <reference lib="webworker" />
import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';
import * as z from 'zod/mini';
import { assertIfError } from './shared/lib';

declare let self: ServiceWorkerGlobalScope;

// self.__WB_MANIFEST is the default injection point
precacheAndRoute(self.__WB_MANIFEST);

// clean old assets
cleanupOutdatedCaches();

let allowlist: RegExp[] | undefined;
// in dev mode, we disable precaching to avoid caching issues
if (import.meta.env.DEV) allowlist = [/^\/$/];

// to allow work offline
registerRoute(new NavigationRoute(createHandlerBoundToURL('index.html'), { allowlist }));

// push notifications

interface NotificationPayload {
  title: string;
  body: string;
  data: { userID: string };
}

const NotificationPayload = z.object({
  title: z.string(),
  body: z.string(),
  data: z.object({ userID: z.string() }),
});

self.addEventListener('push', (event: PushEvent) => {
  if (event.data === null) {
    return;
  }

  try {
    const pushDataParseResult = NotificationPayload.safeParse(event.data.json());
    if (!pushDataParseResult.success) {
      console.error(`failed to parse push notification:`, pushDataParseResult.error);
      return;
    }
    const pushData = pushDataParseResult.data;
    event.waitUntil(
      self.registration.showNotification(pushData.title, {
        lang: 'ru',
        body: pushData.body,
      }),
    );
  } catch (e) {
    assertIfError(e);
    console.error(e);
  }
});
