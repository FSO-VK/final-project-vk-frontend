import './input.css';
import { InputField, InputFieldProps, InputState } from '../input_field/input_field';
import { Show, Switch, Match } from 'solid-js';
import { HiddenInputField } from '../hidden_input_field/hidden_input_field';

export interface InputProps extends InputFieldProps {
  label?: string;
  isRequired?: boolean;
  feedbackMessage?: string;
}

export function Input(props: InputProps) {
  return (
    <div class="input">
      <label class="input__label">
        <Show when={props.isRequired}>
          <span class="input__required-sign">*</span>
        </Show>
        {props.label}
      </label>
      <Switch>
        <Match when={props.type !== 'password'}>
          <InputField {...props} />
        </Match>
        <Match when={props.type === 'password'}>
          <HiddenInputField {...props} />
        </Match>
      </Switch>
      <Show when={props.state === InputState.Error && props.feedbackMessage}>
        <div class="input__feedback input__feedback_danger">{props.feedbackMessage}</div>
      </Show>
    </div>
  );
}
