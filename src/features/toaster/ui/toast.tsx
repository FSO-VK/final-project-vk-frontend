import { ErrorIcon, IconStyle, SuccessIcon, WarningIcon } from '@/shared/ui';
import { Dynamic } from 'solid-js/web';
import './toast.css';

export enum ToastStyle {
  Success,
  Warning,
  Error,
}

export interface ToastProps {
  toastStyle: ToastStyle;
  message: string;
}

const toastStyleToIconStyle = {
  [ToastStyle.Success]: IconStyle.Success,
  [ToastStyle.Warning]: IconStyle.Warning,
  [ToastStyle.Error]: IconStyle.Danger,
};

const toastStyleToIcon = {
  [ToastStyle.Success]: SuccessIcon,
  [ToastStyle.Warning]: WarningIcon,
  [ToastStyle.Error]: ErrorIcon,
};

export function Toast(props: ToastProps) {
  return (
    <div class="toast toast_standard">
      <Dynamic
        component={toastStyleToIcon[props.toastStyle]}
        iconStyle={toastStyleToIconStyle[props.toastStyle]}
        elementClass="toast__icon"
      />
      <div class="toast__message">{props.message}</div>
    </div>
  );
}
