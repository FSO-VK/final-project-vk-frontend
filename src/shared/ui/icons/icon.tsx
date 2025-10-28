import { JSXElement, type ParentProps } from 'solid-js';
import './icon.css';

export enum IconStyle {
  Inactive = 'icon_inactive',
  Active = 'icon_active',
}

export interface IconProps {
  iconStyle?: IconStyle;
  elementClass?: string;
}

export type IconComponent = (props: IconProps) => JSXElement;

export function Icon(props: IconProps & ParentProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      class={`icon ${props.iconStyle ?? ''} ${props.elementClass ?? ''}`}
    >
      {props.children}
    </svg>
  );
}
