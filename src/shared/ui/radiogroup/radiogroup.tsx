import { For, Show } from 'solid-js';
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
}

export function RadioGroup(props: RadioGroupProps) {
  return (
    <fieldset class="radiogroup">
      <Show when={props.options}>
        <Divider />
      </Show>
      <For each={props.options}>
        {(opt, idx) => {
          let inputElement!: HTMLInputElement;
          return (
            <>
              <div
                class={`radiogroup__option ${idx() === props.selectedIdx ? 'radiogroup__option_active' : ''}`}
                onClick={() => inputElement.click()}
              >
                <input
                  ref={inputElement}
                  type="radio"
                  id={opt.value + idx()}
                  name={props.name}
                  class="radiogroup__input visually-hidden"
                  checked={idx() === props.selectedIdx}
                  onClick={() => props.onOptionSelected?.(opt, idx())}
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
