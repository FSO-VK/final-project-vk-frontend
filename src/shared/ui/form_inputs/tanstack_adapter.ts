import { type AnyFieldApi } from '@tanstack/solid-form';
import { type Accessor } from 'solid-js';
import { FieldState } from './fields/field_state';

export const transformFieldState = (field: Accessor<AnyFieldApi>) => {
  if (!field().state.meta.isPristine) {
    return field().state.meta.isValid ? FieldState.Success : FieldState.Error;
  }
  return FieldState.None;
};

export const handleGracefulFieldChange = (
  field: Accessor<AnyFieldApi>,
  value: unknown,
  isValid: boolean,
) => {
  if (isValid || field().state.meta.isBlurred) {
    field().handleChange(value);
  }

  if (!field().state.meta.isPristine && field().state.meta.isBlurred) {
    field().handleChange(value);
  }
};
