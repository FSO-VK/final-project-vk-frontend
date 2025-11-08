import { createMemo, createSignal } from 'solid-js';
import './switch.css';

export interface SwitchProps {
  id?: string;
  initialChecked?: boolean;
  onCheck?: () => void;
  onUncheck?: () => void;
}

export function SwitchButton(props: SwitchProps) {
  const [isChecked, setIsChecked] = createSignal(props.initialChecked ?? false);

  const classChecked = createMemo(() => {
    return isChecked() ? '_checked' : '_unchecked';
  });

  const handleClick = () => {
    setIsChecked(!isChecked());
    if (isChecked() && props.onCheck !== undefined) {
      props.onCheck();
    }
    if (!isChecked() && props.onUncheck !== undefined) {
      props.onUncheck();
    }
  };

  return (
    <div class="switch-container">
      <button type="button" class={`switch switch${classChecked()}`} onClick={() => handleClick()}>
        <div class={`switch__circle switch__circle${classChecked()}`} />
      </button>
    </div>
  );
}
