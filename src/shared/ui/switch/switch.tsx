import { type JSX, createMemo } from 'solid-js';
import './switch.css';

export interface SwitchProps {
  id?: string;
  name?: string;
  value?: string;
  isChecked?: boolean;
  isDisabled?: boolean;
  onClick?: JSX.EventHandler<HTMLElement, MouseEvent>;
}

export function Switch(props: SwitchProps) {
  const classChecked = createMemo(() => {
    const isChecked = props.isChecked ?? false;
    return isChecked ? '_checked' : '';
  });
  return (
    <div class={`switch__container${classChecked()}`}>
      <input
        class="switch__input"
        type="checkbox"
        id={props.id}
        name={props.name}
        value={props.value}
        disabled={props.isDisabled}
        checked={props.isChecked}
        onClick={(e) => {
          props.onClick?.(e);
        }}
      />
      <span class={classChecked()} />
    </div>
  );
}
