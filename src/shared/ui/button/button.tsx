import type { JSXElement } from 'solid-js';
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
}

export function Button(props: ButtonProps) {
  return (
    <button class={`button button_${props.type ?? ButtonType.brand} ${props.class ?? ''}`}>
      <Show when={props.children !== undefined}>{props.children as JSXElement}</Show>
    </button>
  );
}
