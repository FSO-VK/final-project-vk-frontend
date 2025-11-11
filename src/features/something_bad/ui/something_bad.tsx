import { P } from '@/shared/ui';
import Plantain from './plantain.svg';
import './something_bad.css';

export interface SomethingBadScreenProps {
  reason?: string;
}

export function SomethingBadScreen(props: SomethingBadScreenProps) {
  return (
    <div class="something-bad-screen">
      <div class="something-bad-screen__img-container">
        <img class="something-bad-screen__img" src={Plantain} alt="Картинка подорожника" />
      </div>
      <h1 class="something-bad-screen__header">Что-то сломалось</h1>
      <P>Мы уже приложили подорожник, чтобы это исправить</P>
      <div class="something-bad-screen__reason">{`${props.reason ?? 'Причина неизвестна (HTTP 500)'}`}</div>
    </div>
  );
}
