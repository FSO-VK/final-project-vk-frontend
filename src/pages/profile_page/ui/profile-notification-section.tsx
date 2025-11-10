import {
  askNotificationPermission,
  isUserSubscribed,
  subscribeUserToPush,
  unsubscribeUserFromPush,
} from '@/features/notification';
import { SwitchButton } from '@/shared/ui';
import { createAsync } from '@solidjs/router';

export function ProfileNotificationSection() {
  const handleNotificationSubscribe = () => {
    askNotificationPermission().then(
      () => {
        subscribeUserToPush().catch((e) => console.error(e));
      },
      (e) => {
        console.error(e);
      },
    );
  };

  const handleNotificationUnsubscribe = () => {
    unsubscribeUserFromPush().catch(() => {
      console.error('failed to unsubscribe user');
    });
  };

  const isSubscribed = createAsync(() => isUserSubscribed());

  return (
    // <section class="profile-page__notification-options">
    //   <h2 class="profile-page__notification-options-header">Уведомления</h2>
    //   <div class="profile-page__notification-subscribe-container">
    //     Подписаться на уведомления
    //     <SwitchButton
    //       onCheck={() => handleNotificationSubscribe()}
    //       onUncheck={() => handleNotificationUnsubscribe()}
    //       initialChecked={isSubscribed()}
    //     />
    //   </div>
    // </section>
    <SwitchButton
      onCheck={() => handleNotificationSubscribe()}
      onUncheck={() => handleNotificationUnsubscribe()}
      initialChecked={isSubscribed()}
    />
  );
}
