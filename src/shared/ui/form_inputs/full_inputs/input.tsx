import { Match, Switch } from 'solid-js';
import {
  LabelsWrapper,
  type LabelsWrapperProps,
} from '../field_wrappers/labels_wrapper/labels_wrapper';
import { InputField, type InputFieldProps } from '../fields/input_field/input_field';
import { HiddenInputField } from '../fields';

export type InputProps = LabelsWrapperProps & InputFieldProps;

export function Input(props: InputProps) {
  return (
    <LabelsWrapper {...props}>
      <Switch>
        <Match when={props.type === 'password'}>
          <HiddenInputField {...props} />
        </Match>
        <Match when={props.type !== 'password'}>
          <InputField {...props} />
        </Match>
      </Switch>
    </LabelsWrapper>
  );
}
