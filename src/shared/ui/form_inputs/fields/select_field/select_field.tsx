import { For, type JSX } from 'solid-js';
import './select_field.css';
import { DownArrowIcon, IconStyle } from '@/shared/ui';

export interface OptionSpec {
  value?: string;
  label?: string;
}

export interface SelectFieldProps extends JSX.SelectHTMLAttributes<HTMLSelectElement> {
  class?: string;
  options?: OptionSpec[];
}

export function SelectField(props: SelectFieldProps) {
  return (
    <div class={`select-field select-field_border select-field_brand ${props.class ?? ''}`}>
      <select
        class="select-field__select"
        {...props}
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
