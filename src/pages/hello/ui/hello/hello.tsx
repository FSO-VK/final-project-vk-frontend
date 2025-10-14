import logoSvg from '/favicon.svg';
import './hello.css';
import { Button, ButtonType, P } from '@/shared/ui';
import { createSignal } from 'solid-js';

export function HelloPage() {
  const [currentPage, setCurrentPage] = createSignal(0);

  const firstSubpage = (
    <>
      <section>
        <h1 class="hello-page__info-header">Привет!</h1>
        <P>
          Добро пожаловать в Умную аптечку. Наше приложение поможет вам вести учёт лекарств дома и
          планировать их прием.
        </P>
        <P>Сейчас мы проведём краткую экскурсию по основному функционалу. Нажмите "Дальше"</P>
      </section>
    </>
  );

  const lastSubpage = (
    <>
      <section>
        <h1 class="hello-page__info-header">Начало использования</h1>
        <P>
          На этом обзор основных функций закончен. Чтобы начать пользоваться, войдите в аккаунт или
          зарегистрируйтесь
        </P>
      </section>
    </>
  );

  const subpages = [firstSubpage, lastSubpage];

  const onNextButtonClick = () => {
    if (currentPage() + 1 == subpages.length) {
      return;
    }
    setCurrentPage(currentPage() + 1);
  };

  return (
    <div class="hello-page">
      <div class="hello-page__logo-container">
        <img class="hello-page__logo" src={logoSvg} />
      </div>
      <main class="hello-page__info">{subpages[currentPage()]}</main>
      <div class="hello-page__button-container">
        <Button type={ButtonType.secondary} class="hello-page__button">
          Пропустить
        </Button>
        <Button class="hello-page__button" onClick={onNextButtonClick}>
          Дальше
        </Button>
      </div>
    </div>
  );
}
