import {
  askNotificationPermission,
  isUserSubscribed,
  subscribeUserToPush,
  unsubscribeUserFromPush,
} from '@/features/notification';
import { SwitchButton } from '@/shared/ui';
import { Suspense, createEffect } from 'solid-js';
import { createAsync } from '@solidjs/router';
import { createForm } from '@tanstack/solid-form';
import { assertIfError } from '@/shared/lib';

export function ProfileNotificationSection() {
  const isSubscribed = createAsync(() => isUserSubscribed());

  const handleSubmit = async (isSubscribed: boolean) => {
    if (!isSubscribed) {
      const hasPermission = await askNotificationPermission();
      if (hasPermission) {
        await subscribeUserToPush();
      }
    } else {
      await unsubscribeUserFromPush();
    }
  };

  const form = createForm(() => ({
    defaultValues: {
      subscription: false,
    },
    onSubmit: async ({ value }) => {
      try {
        await handleSubmit(value.subscription);
      } catch (e: unknown) {
        assertIfError(e);
        console.error('failed to change subscription state, reverting it:', e);
        form.setFieldValue('subscription', !value.subscription);
      }
    },
  }));

  createEffect(() => {
    const subscribeValue = isSubscribed();

    if (subscribeValue !== undefined) {
      form.setFieldValue('subscription', subscribeValue);
    }
  });

  return (
    <section class="profile-page__notification-options">
      <h2 class="profile-page__notification-options-header">Уведомления</h2>
      <div class="profile-page__notification-subscribe-container">
        Подписаться на уведомления
        <form>
          <Suspense>
            <form.Field
              name="subscription"
              children={(field) => (
                <SwitchButton
                  name={field().name}
                  id={field().name}
                  checked={field().state.value}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    field().handleChange(isChecked);
                    form.handleSubmit().catch(() => {
                      console.error("can't change subscription state");
                    });
                  }}
                />
              )}
            />
          </Suspense>
        </form>
      </div>
    </section>
  );
}
