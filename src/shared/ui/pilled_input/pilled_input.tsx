import './pilled_input.css';
import { InputField, InputFieldProps } from '../input_field/input_field';
import { FieldWrapper } from '../field_wrapper/field_wrapper';
import { createMemo, createSignal, For, Show } from 'solid-js';
import { JSX } from 'solid-js/h/jsx-runtime';

export interface PilledInputProps extends InputFieldProps {
  label?: string;
  isRequired?: boolean;
  feedbackMessage?: string;
  pills?: string[];
}

export function PilledInput(props: PilledInputProps) {
  const [chosenPill, setChosenPill] = createSignal('');

  const value = createMemo(() => {
    if (chosenPill() !== '') {
      return chosenPill();
    }
    return props.value;
  });

  const handlePillClick = (pill: string) => {
    setChosenPill(pill);
  };

  const handleInput: JSX.EventHandler<HTMLElement, InputEvent> = (e) => {
    setChosenPill('');
    props.onInput?.(e);
  };

  return (
    <FieldWrapper {...props} labelFor={props.name}>
      <div class="pilled-input">
        <Show when={props.pills}>
          <div class="pilled-input__autosuggestions">
            <For each={props.pills}>
              {(pill) => {
                return (
                  <span
                    class="pilled-input__pill pilled-input__pill_brand"
                    onClick={() => handlePillClick(pill)}
                  >
                    {pill}
                  </span>
                );
              }}
            </For>
          </div>
        </Show>
        <InputField {...props} value={value()} onInput={(e) => handleInput(e)} />
      </div>
    </FieldWrapper>
  );
}
