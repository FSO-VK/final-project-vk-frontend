import { type AnyFieldApi } from '@tanstack/solid-form';
import { type Accessor } from 'solid-js';
import { InputState } from '../input_field/input_field';

export const transformFieldState = (field: Accessor<AnyFieldApi>) => {
  if (!field().state.meta.isPristine) {
    return field().state.meta.isValid ? InputState.Success : InputState.Error;
  }
  return InputState.None;
};
