import { createMemo, Show, type JSX } from 'solid-js';

import './textarea_field.css';

const enum TextareaState {
  Primary,
  Error,
  Success,
}

const stateToClass = {
  [TextareaState.Primary]: 'textarea-field_brand',
  [TextareaState.Error]: 'textarea-field_error',
  [TextareaState.Success]: 'textarea-field_success',
};

export interface TextareaFieldProps {
  id?: string;
  name?: string;
  placeholder?: string;
  maxLength?: number;
  value?: string;
  state?: TextareaState;
  isDisabled?: boolean;
  hasCounter?: boolean;
  onInput?: JSX.EventHandler<HTMLElement, InputEvent>;
  onFocusOut?: JSX.EventHandler<HTMLElement, FocusEvent>;
  autocomplete?: JSX.HTMLAutocomplete;
}

export function TextareaField(props: TextareaFieldProps) {
  const count = createMemo(() => {
    const value = props.value?.length ?? 0;
    return props.maxLength ? `${value}/${props.maxLength}` : value.toString();
  });

  return (
    <div class={`textarea-field ${stateToClass[props.state ?? TextareaState.Primary]}`}>
      <textarea
        autocomplete={props.autocomplete}
        class="textarea-field__textarea"
        name={props.name}
        id={props.id}
        placeholder={props.placeholder}
        maxLength={props.maxLength}
        disabled={props.isDisabled}
        onInput={(e) => props.onInput?.(e)}
        onFocusOut={(e) => props.onFocusOut?.(e)}
      >
        {props.value ?? ''}
      </textarea>
      <Show when={props.hasCounter}>
        <div class="textarea-field__counter">{count()}</div>
      </Show>
    </div>
  );
}
