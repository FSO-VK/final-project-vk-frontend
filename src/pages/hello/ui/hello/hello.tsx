import logoSvg from '/favicon.svg';
import './hello.css';
import { Button, ButtonType, P } from '@/shared/ui';
import { createSignal } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { useNavigate } from '@solidjs/router';

const firstSubpage = () => (
  <>
    <section class="hello-page__subpage">
      <div class="hello-page__logo-container">
        <img class="hello-page__logo" src={logoSvg} />
      </div>
      <h1 class="hello-page__info-header">Привет!</h1>
      <P>
        Добро пожаловать в Умную аптечку. Наше приложение поможет вам вести учёт лекарств дома и
        планировать их прием.
      </P>
      <P>Сейчас мы проведём краткую экскурсию по основному функционалу. Нажмите "Дальше"</P>
    </section>
  </>
);

const lastSubpage = () => (
  <>
    <section class="hello-page__subpage">
      <div class="hello-page__logo-container">
        <img class="hello-page__logo" src={logoSvg} />
      </div>
      <h1 class="hello-page__info-header">Начало использования</h1>
      <P>
        На этом обзор основных функций закончен. Чтобы начать пользоваться, войдите в аккаунт или
        зарегистрируйтесь
      </P>
    </section>
  </>
);

// Will be removed as soon as login page is created
const LOGIN_ROUTE = '/login';

export function HelloPage() {
  const [currentPage, setCurrentPage] = createSignal(0);

  const navigate = useNavigate();

  const subpages = [firstSubpage, lastSubpage];

  const onNextButtonClick = () => {
    if (currentPage() + 1 == subpages.length) {
      navigate(LOGIN_ROUTE);
      return;
    }
    setCurrentPage(currentPage() + 1);
  };

  const onBackButtonClick = () => {
    if (currentPage() == 0) {
      navigate(LOGIN_ROUTE);
      return;
    }
    setCurrentPage(currentPage() - 1);
  };

  return (
    <div class="hello-page">
      <main class="hello-page__info">
        <Dynamic component={subpages[currentPage()]} />
      </main>
      <footer class="hello-page__button-container">
        <Button type={ButtonType.secondary} class="hello-page__button" onClick={onBackButtonClick}>
          {currentPage() == 0 ? 'Пропустить' : 'Назад'}
        </Button>
        <Button class="hello-page__button" onClick={onNextButtonClick}>
          {currentPage() < subpages.length - 1 ? 'Дальше' : 'Войти'}
        </Button>
      </footer>
    </div>
  );
}
