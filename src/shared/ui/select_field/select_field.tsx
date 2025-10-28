import { For, type JSX } from 'solid-js';
import './select_field.css';
import { DownArrowIcon } from '../icons/down_arrow';
import { IconStyle } from '../icons/icon';

export interface OptionSpec {
  value?: string;
  label?: string;
}

export interface SelectFieldProps {
  elementClass?: string;
  name?: string;
  id?: string;
  value?: string;
  options?: OptionSpec[];
  onInput?: JSX.EventHandler<HTMLElement, InputEvent>;
  onFocusOut?: JSX.EventHandler<HTMLElement, FocusEvent>;
}

export function SelectField(props: SelectFieldProps) {
  return (
    <div class={'select-field select-field_border select-field_brand'}>
      <select
        class={`select-field__select ${props.elementClass ?? ''}`}
        name={props.name}
        id={props.id}
        onFocusOut={(e) => props.onFocusOut?.(e)}
        onInput={(e) => props.onInput?.(e)}
        aria-disabled={props.options === undefined || props.options?.length === 0}
      >
        <For each={props.options}>
          {(opt) => (
            <option value={opt.value} selected={props.value === opt.value}>
              {opt.label}
            </option>
          )}
        </For>
      </select>
      <DownArrowIcon elementClass="select-field__icon" iconStyle={IconStyle.Active} />
    </div>
  );
}
