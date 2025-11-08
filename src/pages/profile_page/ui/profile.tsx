import { useMeActions } from '@/entities/me';
import { Button, ButtonStyle, Switch } from '@/shared/ui';
import { createSignal } from 'solid-js';
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

  const [isClicked, setIsClicked] = createSignal(false);

  const handleClick = () => {
    const clicked = isClicked();
    setIsClicked(!clicked);
  };

  return (
    <main class="profile-page">
      Сейчас тут пусто, но скоро что-то появится
      <section>
        <Switch onClick={handleClick} isChecked={isClicked()} />
      </section>
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
