import { type JSX, type JSXElement, type ParentProps } from 'solid-js';
import './icon.css';

export enum IconStyle {
  Inactive = 'icon_inactive',
  Active = 'icon_active',
  Danger = 'icon_danger',
  Secondary = 'icon_secondary',
  ActiveWhite = 'icon_active-white',
}

export interface IconProps extends JSX.SvgSVGAttributes<SVGSVGElement> {
  iconStyle?: IconStyle;
  elementClass?: string;
}

export type IconComponent = (props: IconProps) => JSXElement;

export function Icon(props: IconProps & ParentProps) {
  return (
    <svg
      viewBox={props.viewBox ?? '0 0 24 24'}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      class={`icon ${props.iconStyle ?? ''} ${props.elementClass ?? ''}`}
      {...props}
    >
      {props.children}
    </svg>
  );
}
