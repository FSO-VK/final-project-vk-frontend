import { JSX, JSXElement, Match, Show, Switch } from 'solid-js';
import './input_field.css';

import CheckMarkSvg from './check.svg';
import CrossMarkSvg from './cross.svg';
import { FieldState } from '../field_state';

const stateToClass = {
  [FieldState.None]: 'input-field_brand',
  [FieldState.Error]: 'input-field_error',
  [FieldState.Success]: 'input-field_success',
};

export interface InputFieldProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  state?: FieldState;
  class?: string;
  afterElements?: JSXElement;
}

export function InputField(props: InputFieldProps) {
  return (
    <div
      class={`input-field ${props.state ? stateToClass[props.state] : stateToClass[FieldState.None]} input-field_border`}
    >
      <input {...props} class="input-field__input" />
      <Show when={props.afterElements && props.state !== FieldState.None}>
        <div class="input-field__after-elements">
          <Show when={props.afterElements !== undefined}>{props.afterElements}</Show>
          <Switch>
            <Match when={props.state === FieldState.Success}>
              <img alt="Галочка" src={CheckMarkSvg} class="input-field__state-icon" />
            </Match>
            <Match when={props.state === FieldState.Error}>
              <img alt="Крестик" src={CrossMarkSvg} class="input-field__state-icon" />
            </Match>
          </Switch>
        </div>
      </Show>
    </div>
  );
}
