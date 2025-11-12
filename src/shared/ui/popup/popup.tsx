import { JSXElement } from 'solid-js';
import { Portal } from 'solid-js/web';
import './popup.css';

export interface PopupProps {
  children?: JSXElement;
}

export function Popup(props: PopupProps) {
  return (
    <Portal>
      <div class="popup popup_shadowed">
        <div class="popup__content popup__content_centered">{props.children}</div>
      </div>
    </Portal>
  );
}
