import './input.css';
import { InputField, InputFieldProps } from '../input_field/input_field';
import { Switch, Match } from 'solid-js';
import { HiddenInputField } from '../hidden_input_field/hidden_input_field';
import { FieldWrapper } from '../field_wrapper/field_wrapper';

export interface InputProps extends InputFieldProps {
  label?: string;
  isRequired?: boolean;
  feedbackMessage?: string;
}

export function Input(props: InputProps) {
  return (
    <FieldWrapper {...props} labelFor={props.name}>
      <Switch>
        <Match when={props.type !== 'password'}>
          <InputField {...props} />
        </Match>
        <Match when={props.type === 'password'}>
          <HiddenInputField {...props} />
        </Match>
      </Switch>
    </FieldWrapper>
  );
}
