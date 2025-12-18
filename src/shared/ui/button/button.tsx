import type { JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import './button.css';

export enum ButtonStyle {
  none = 'none',
  brand = 'brand',
  secondary = 'secondary',
  danger = 'danger',
}

export interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  colorStyle?: ButtonStyle;
  isDisabled?: boolean;
}

export function Button(props: ButtonProps) {
  const [buttonProps, otherProps] = splitProps(props, ['class', 'colorStyle', 'isDisabled']);

  return (
    <button
      class={`${buttonProps.class ?? ''} button button_${buttonProps.colorStyle ?? ButtonStyle.brand} ${buttonProps.isDisabled ? 'button_disabled' : ''}`}
      aria-disabled={buttonProps.isDisabled ?? false}
      disabled={buttonProps.isDisabled ?? false}
      {...otherProps}
    />
  );
}
