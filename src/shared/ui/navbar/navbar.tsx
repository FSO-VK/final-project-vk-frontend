import './navbar.css';
import backIcon from './back-icon.svg';

import { A } from '@solidjs/router';

export interface NavbarProps {
  // url where go back button points
  backLocation: string;
  // BEM element class
  elementClass?: string;
  // Title
  title?: string;
}

export function Navbar({ backLocation, elementClass, title }: NavbarProps) {
  return (
    <nav class={`navbar navbar_brand ${elementClass}`}>
      <A href={backLocation} class="navbar__back-button">
        <img class="navbar__back-icon" alt="кнопка назад" src={backIcon} />
        <span class="navbar__back-text">Назад</span>
      </A>
      <div class="navbar__header">{title ?? ''}</div>
    </nav>
  );
}
