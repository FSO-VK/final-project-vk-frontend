import { Toaster, toast } from 'solid-toast';
import { Toast, ToastStyle } from './toast';
import './toaster.css';

export function LocalToaster() {
  return (
    <Toaster
      position="bottom-center"
      containerClassName="toaster"
      toastOptions={{
        className: 'toast__container',
      }}
    />
  );
}

export interface ToastOptions {
  duration: number;
  unmountDelay: number;
  id: string;
}

export type ToastHandler = (message: string, options?: ToastOptions) => string;

export interface ToastProvider {
  success: ToastHandler;
  warning: ToastHandler;
  error: ToastHandler;
}

export const localToast: ToastProvider = {
  success: (message: string, options?: ToastOptions) => {
    return toast.custom(() => <Toast message={message} toastStyle={ToastStyle.Success} />, options);
  },

  warning: (message: string, options?: ToastOptions) => {
    return toast.custom(() => <Toast message={message} toastStyle={ToastStyle.Warning} />, options);
  },

  error: (message: string, options?: ToastOptions) => {
    return toast.custom(() => <Toast message={message} toastStyle={ToastStyle.Error} />, options);
  },
};
