import { MIN_PASSWORD_LEN, type Password, PasswordError, type PasswordValidator } from './password';

import * as z from 'zod/mini';

const validate = (password: Password) => {
  const result = z
    .string()
    .check(z.regex(/^[A-za-z0-9]*$/, PasswordError.UnexpectedRune))
    .check(z.minLength(MIN_PASSWORD_LEN, PasswordError.TooShort))
    .check(z.regex(/[a-z]/, PasswordError.NoUndercaseLetter))
    .check(z.regex(/[A-Z]/, PasswordError.NoUppercaseLetter))
    .check(z.regex(/[0-9]/, PasswordError.NoNumbers))
    .safeParse(password);
  if (result.success) {
    return;
  }

  const error = z.flattenError(result.error).formErrors[0];
  return error as PasswordError;
};

export const passwordValidator = { validate } as PasswordValidator;
