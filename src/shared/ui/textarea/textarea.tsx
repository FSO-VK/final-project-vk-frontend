import { Show } from 'solid-js';
import { TextareaField, TextareaFieldProps } from '../textarea_field/textarea_field';
import './textarea.css';

export interface TextareaProps extends TextareaFieldProps {
  label?: string;
  isRequired?: boolean;
  feedbackMessage?: string;
}

export function Textarea(props: TextareaProps) {
  return (
    <div class="textarea">
      <div>
        <Show when={props.isRequired}>
          <span class="textarea__required-sign">*</span>
        </Show>
        <label for={props.id} class="textarea__label">
          {props.label}
        </label>
      </div>
      <TextareaField {...props} />
      <Show when={props.feedbackMessage}>
        <div class="textarea__feedback textarea__feedback_danger">{props.feedbackMessage}</div>
      </Show>
    </div>
  );
}
