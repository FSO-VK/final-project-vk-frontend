import type { JSXElement, JSX } from 'solid-js';
import { Show } from 'solid-js';
import './button.css';

export enum ButtonStyle {
  brand = 'brand',
  secondary = 'secondary',
}

export interface ButtonProps {
  children?: JSXElement;
  type?: 'button' | 'reset' | 'submit' | 'menu';
  colorStyle?: ButtonStyle;
  class?: string;
  onClick?: JSX.EventHandler<HTMLElement, MouseEvent>;
  isDisabled?: boolean;
}

export function Button(props: ButtonProps) {
  return (
    <button
      class={`${props.class ?? ''} button button_${props.colorStyle ?? ButtonStyle.brand} ${props.isDisabled ? 'button_disabled' : ''}`}
      onClick={(e) => props.onClick?.(e)}
      type={props.type}
      disabled={props.isDisabled ?? false}
    >
      <Show when={props.children !== undefined}>{props.children}</Show>
    </button>
  );
}
