import { createMemo, splitProps, JSX } from 'solid-js';
import './switch.css';

export function SwitchButton(props: JSX.InputHTMLAttributes<HTMLInputElement>) {
  // exclude class and type.
  const [, otherProps] = splitProps(props, ['class', 'type']);
  const classChecked = createMemo(() => {
    return (props?.checked ?? false) ? '_checked' : '_unchecked';
  });

  return (
    <label class="switch-container">
      <input type="checkbox" class="switch-container__input" {...otherProps} />
      <div aria-hidden="true" class={`switch switch${classChecked()}`}>
        <div class={`switch__circle switch__circle${classChecked()}`} />
      </div>
    </label>
  );
}
