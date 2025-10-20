import { JSX, JSXElement, Match, Show, Switch } from 'solid-js';
import './input_field.css';

import CheckMarkSvg from './check.svg';
import CrossMarkSvg from './cross.svg';

export enum InputState {
  None,
  Error,
  Success,
}

const stateToClass = {
  [InputState.None]: 'input-field_brand',
  [InputState.Error]: 'input-field_error',
  [InputState.Success]: 'input-field_success',
};

export interface InputFieldProps {
  type?: string;
  name?: string;
  id?: string;
  placeholder?: string;
  maxlength?: number;
  state?: InputState;
  elementClass?: string;
  onInput?: JSX.EventHandler<HTMLElement, InputEvent>;
  onFocusOut?: JSX.EventHandler<HTMLElement, FocusEvent>;
  afterElements?: JSXElement;
}

export function InputField(props: InputFieldProps) {
  return (
    <div
      class={`input-field ${props.state ? stateToClass[props.state] : stateToClass[InputState.None]} input-field_border`}
    >
      <input
        type={props.type}
        class={`input-field__input ${props.elementClass}`}
        name={props.name}
        id={props.id}
        placeholder={props.placeholder}
        maxlength={props.maxlength}
        onFocusOut={props.onFocusOut}
        onInput={props.onInput}
      />
      <div class="input-field__after-elements">
        <Show when={props.afterElements !== undefined}>{props.afterElements}</Show>
        <Switch>
          <Match when={props.state === InputState.Success}>
            <img alt="Галочка" src={CheckMarkSvg} class="input-field__state-icon" />
          </Match>
          <Match when={props.state === InputState.Error}>
            <img alt="Крестик" src={CrossMarkSvg} class="input-field__state-icon" />
          </Match>
        </Switch>
      </div>
    </div>
  );
}
