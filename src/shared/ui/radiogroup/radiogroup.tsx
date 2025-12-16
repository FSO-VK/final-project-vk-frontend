import { For, Show, splitProps } from 'solid-js';
import './radiogroup.css';
import { Divider } from '../divider/divider';

export interface RadioGroupOption {
  value: string;
  label: string;
}

export interface RadioGroupProps {
  options: RadioGroupOption[];
  selectedIdx?: number;
  onOptionSelected?: (opt: RadioGroupOption, idx: number) => void;
  name: string;
  class?: string;
}

export function RadioGroup(props: RadioGroupProps) {
  const [classProp, otherProps] = splitProps(props, ['class']);
  return (
    <fieldset class={`radiogroup ${classProp.class ?? ''}`}>
      <Show when={otherProps.options}>
        <Divider />
      </Show>
      <For each={otherProps.options}>
        {(opt, idx) => {
          let inputElement!: HTMLInputElement;
          return (
            <>
              <div
                class={`radiogroup__option ${idx() === otherProps.selectedIdx ? 'radiogroup__option_active' : ''}`}
                onClick={() => inputElement.click()}
              >
                <input
                  ref={inputElement}
                  type="radio"
                  id={opt.value + idx()}
                  name={otherProps.name}
                  class="radiogroup__input visually-hidden"
                  checked={idx() === otherProps.selectedIdx}
                  onClick={() => otherProps.onOptionSelected?.(opt, idx())}
                />
                {opt.label}
              </div>
              <Divider />
            </>
          );
        }}
      </For>
    </fieldset>
  );
}
