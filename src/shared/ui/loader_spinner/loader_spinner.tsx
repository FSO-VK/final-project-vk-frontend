import { splitProps, type JSX } from 'solid-js';
import './loader_spinner.css';

export type LoaderSpinnerProps = JSX.HTMLAttributes<HTMLDivElement>;

export function LoaderSpinner(props: LoaderSpinnerProps) {
  const [selectedProps, otherProps] = splitProps(props, ['class']);
  return (
    <div
      class={`loader-spinner loader-spinner__outer-circle ${selectedProps.class ?? ''}`}
      {...otherProps}
    >
      <div class="loader-spinner__inner-circle" />
      <div class="loader-spinner__first-quadrant" />
      <div class="loader-spinner__second-quadrant" />
      <div class="loader-spinner__third-quadrant" />
    </div>
  );
}
