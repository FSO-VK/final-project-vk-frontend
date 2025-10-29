import { useMeActions } from '@/entities/me';
import { Button, ButtonStyle } from '@/shared/ui';
import { useNavigate } from '@solidjs/router';
import './profile.css';

export function ProfilePage() {
  const meActions = useMeActions();
  const navigate = useNavigate();

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
      Сейчас тут пусто, но скоро что-то появится
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
