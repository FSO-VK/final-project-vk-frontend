import {
  askNotificationPermission,
  isUserSubscribed,
  subscribeUserToPush,
  unsubscribeUserFromPush,
} from '@/features/notification';
import { SwitchButton } from '@/shared/ui';
import { createEffect } from 'solid-js';
import { createAsync } from '@solidjs/router';
import { createForm } from '@tanstack/solid-form';
import { assertIfError } from '@/shared/lib';
import { toast } from '@/features/toaster';

export function ProfileNotificationSection() {
  const isSubscribed = createAsync(() => isUserSubscribed());

  const handleSubmit = async (wantToSubscribe: boolean) => {
    if (wantToSubscribe) {
      const hasPermission = await askNotificationPermission();
      if (hasPermission) {
        await subscribeUserToPush();
      } else {
        throw new Error('user has not given access to notifications');
      }
    } else {
      await unsubscribeUserFromPush();
    }
  };

  const REVERT_SWITCH_STATE_TIMEOUT = 400; // ms

  const form = createForm(() => ({
    defaultValues: {
      subscription: false,
    },
    onSubmit: async ({ value }) => {
      try {
        await handleSubmit(value.subscription);
      } catch (e: unknown) {
        assertIfError(e);
        setTimeout(() => {
          form.setFieldValue('subscription', !value.subscription);
        }, REVERT_SWITCH_STATE_TIMEOUT);
      }
    },
  }));

  createEffect(() => {
    form.setFieldValue('subscription', isSubscribed() ?? false);
  });

  return (
    <section class="profile-page__notification-options">
      <h2 class="profile-page__notification-options-header">Уведомления</h2>
      <div class="profile-page__notification-subscribe-container">
        Подписаться на уведомления
        <form>
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
                    toast.error('Не удалось изменить подписку, попробуйте позже');
                  });
                }}
              />
            )}
          />
        </form>
      </div>
    </section>
  );
}
