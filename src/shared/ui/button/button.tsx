import type { JSXElement, JSX } from 'solid-js';
import { Show } from 'solid-js';
import './button.css';

export enum ButtonType {
  brand = 'brand',
  secondary = 'secondary',
}

export interface ButtonProps {
  children?: JSXElement;
  type?: ButtonType;
  class?: string;
  onClick?: JSX.EventHandler<HTMLElement, MouseEvent>;
}

export function Button(props: ButtonProps) {
  return (
    <button
      class={`${props.class ?? ''} button button_${props.type ?? ButtonType.brand}`}
      onClick={(e) => props.onClick?.(e)}
    >
      <Show when={props.children !== undefined}>{props.children}</Show>
    </button>
  );
}
