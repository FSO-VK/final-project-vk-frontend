import { P } from '@/shared/ui';
import './something_bad.css';
import Plantain from './plantain.svg';

export interface SomethingBadPageProps {
  reason?: string;
}

export function SomethingBadPage(props: SomethingBadPageProps) {
  return (
    <div class="something-bad-page">
      <main class="something-bad-page__info">
        <div class="something-bad-page__img-container">
          <img class="something-bad-page__img" src={Plantain} alt="Картинка подорожника" />
        </div>
        <h1 class="something-bad-page__info-header">Что-то сломалось</h1>
        <P>Мы уже приложили подорожник, чтобы это исправить</P>
        <div class="something-bad-page__reason">{`${props.reason ?? 'Причина неизвестна (HTTP 500)'}`}</div>
      </main>
    </div>
  );
}
