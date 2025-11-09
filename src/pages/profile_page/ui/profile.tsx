import { useMeActions } from '@/entities/me';
import { Button, ButtonStyle } from '@/shared/ui';
import { useNavigate } from '@solidjs/router';
import './profile.css';

import { Show } from 'solid-js';
import { ProfileNotificationSection } from './profile-notification-section';
import { useLayoutStore } from '@/widgets/layouts';

export function ProfilePage() {
  const meActions = useMeActions();
  const navigate = useNavigate();

  const layoutStore = useLayoutStore();

  layoutStore.setNavbarState({
    showBackButton: true,
    showDropdownMenu: false,
    dropdownMenuItems: [],
    title: 'Профиль',
  });

  const handleLogoutClick = () => {
    meActions.logout().then(
      () => {
        navigate('/');
      },
      () => {
        console.error('failed to log out');
      },
    );
  };

  return (
    <main class="profile-page">
      <Show when={!import.meta.env.SSR}>
        <ProfileNotificationSection />
      </Show>
      <section class="profile-page__logout-container">
        <Button
          colorStyle={ButtonStyle.danger}
          class="profile-page__logout-button"
          onClick={() => handleLogoutClick()}
        >
          Выйти из аккаунта
        </Button>
      </section>
    </main>
  );
}
