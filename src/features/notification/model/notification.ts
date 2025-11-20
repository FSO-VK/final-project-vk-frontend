import { useMeStore } from '@/entities/me';
import { notificationApi } from '@/shared/api';
import { useSwStore } from '@/shared/lib';

export async function askNotificationPermission() {
  const permissionResult = await Notification.requestPermission();
  return permissionResult === 'granted';
}

export async function isUserSubscribed(): Promise<boolean> {
  const swStore = useSwStore();
  const registration = swStore.getRegistration();
  if (registration === null) {
    return false;
  }
  const existingSubscription = await registration.pushManager.getSubscription();
  return existingSubscription !== null;
}

export async function subscribeUserToPush() {
  const permission = Notification.permission;
  if (permission !== 'granted') {
    throw new Error('failed to subscribe user: user has not granted permission');
  }

  const swStore = useSwStore();
  const registration = swStore.getRegistration();
  if (registration === null) {
    throw new Error('failed to subscribe user: registration is null');
  }
  const existingSubscription = await registration.pushManager.getSubscription();
  if (existingSubscription !== null) {
    console.warn('user already subscribed');
    return;
  }

  const { vapidPublicKey } = await notificationApi.getVapid();

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: vapidPublicKey,
  });

  const subscriptionJSON = subscription.toJSON();

  if (subscriptionJSON.keys === undefined) {
    throw new Error('failed to subscribe user: subscription keys is undefined');
  }

  await notificationApi.subscribe({
    ua: navigator.userAgent,
    subscription: {
      endpoint: subscriptionJSON.endpoint!,
      keys: {
        p256dh: subscriptionJSON.keys.p256dh ?? '',
        auth: subscriptionJSON.keys.auth ?? '',
      },
    },
  });
}

export async function unsubscribeUserFromPush(): Promise<void> {
  const swStore = useSwStore();
  const registration = swStore.getRegistration();
  if (registration === null) {
    throw new Error('failed to unsubscribe user: registration is null');
  }
  const existingSubscription = await registration.pushManager.getSubscription();
  if (existingSubscription === null) {
    return;
  }

  const meStore = useMeStore();
  const userId = meStore.userId();
  if (userId === null) {
    throw new Error('failed to unsubscribe user: user is null');
  }

  await notificationApi.unsubscribe();

  const isSuccess = await existingSubscription.unsubscribe();
  if (!isSuccess) {
    throw new Error('failed to unsubscribe user: browser subscription failed');
  }
}
