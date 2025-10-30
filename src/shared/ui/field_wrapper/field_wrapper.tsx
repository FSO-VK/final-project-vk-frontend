import { type ParentProps, Show } from 'solid-js';
import './field_wrapper.css';

export interface FieldWrapperProps extends ParentProps {
  label?: string;
  labelFor?: string;
  isRequired?: boolean;
  feedbackMessage?: string;
}

export function FieldWrapper(props: FieldWrapperProps) {
  return (
    <div class="field-wrapper">
      <label class="field-wrapper__label" for={props.labelFor}>
        <Show when={props.isRequired}>
          <span class="input__required-sign">*</span>
        </Show>
        {props.label}
      </label>
      {props.children}
      <Show when={props.feedbackMessage}>
        <div class="field-wrapper__feedback field-wrapper__feedback_danger">
          {props.feedbackMessage}
        </div>
      </Show>
    </div>
  );
}
