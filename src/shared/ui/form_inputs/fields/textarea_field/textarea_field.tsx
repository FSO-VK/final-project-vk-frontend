import { createMemo, Show, type JSX } from 'solid-js';

import './textarea_field.css';
import { FieldState } from '../field_state';

const stateToClass = {
  [FieldState.None]: 'textarea-field_brand',
  [FieldState.Error]: 'textarea-field_error',
  [FieldState.Success]: 'textarea-field_success',
};

export interface TextareaFieldProps extends JSX.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value?: string;
  state?: FieldState;
  hasCounter?: boolean;
}

export function TextareaField(props: TextareaFieldProps) {
  const count = createMemo(() => {
    const value = props.value?.length ?? 0;
    return props.maxlength ? `${value}/${props.maxlength}` : value.toString();
  });

  return (
    <div
      class={`textarea-field textarea-field_basic ${stateToClass[props.state ?? FieldState.None]} ${props.class ?? ''}`}
    >
      <textarea {...props} class="textarea-field__textarea">
        {props.value ?? ''}
      </textarea>
      <Show when={props.hasCounter}>
        <div class="textarea-field__counter">{count()}</div>
      </Show>
    </div>
  );
}
