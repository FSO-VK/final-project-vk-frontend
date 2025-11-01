import { type ParentProps, Show } from 'solid-js';
import './labels_wrapper.css';

export interface LabelsWrapperProps extends ParentProps {
  label?: string;
  labelFor?: string;
  required?: boolean;
  feedbackMessage?: string;
}

export function LabelsWrapper(props: LabelsWrapperProps) {
  return (
    <div class="labels-wrapper">
      <label class="labels-wrapper__label" for={props.labelFor}>
        <Show when={props.required}>
          <span class="labels-wrapper__required-sign">*</span>
        </Show>
        {props.label}
      </label>
      {props.children}
      <Show when={props.feedbackMessage}>
        <div class="labels-wrapper__feedback labels-wrapper__feedback_danger">
          {props.feedbackMessage}
        </div>
      </Show>
    </div>
  );
}
