import logoSvg from '/favicon.svg';
import './hello.css';
import { Button, ButtonType, P } from '@/shared/ui';

export function HelloPage() {
  return (
    <div class="hello-page">
      <div class="hello-page__logo-container">
        <img class="hello-page__logo" src={logoSvg} />
      </div>
      <main class="hello-page__info">
        <h1 class="hello-page__info-header">Привет!</h1>
        <P text="Добро пожаловать в Умную аптечку. Наше приложение поможет вам вести учёт лекарств дома и планировать их прием." />
        <P text='Сейчас мы проведём краткую экскурсию по основному функционалу. Нажмите "Дальше"' />
      </main>
      <div class="hello-page__button-container">
        <Button type={ButtonType.secondary} class="hello-page__button">
          Пропустить
        </Button>
        <Button class="hello-page__button">Дальше</Button>
      </div>
    </div>
  );
}
