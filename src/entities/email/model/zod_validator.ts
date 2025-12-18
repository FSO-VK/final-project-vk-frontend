import { type Email, type EmailValidator, EmailError } from './email';
import * as z from 'zod/mini';

const validate = (email: Email) => {
  const result = z.email().safeParse(email);
  if (!result.success) {
    return EmailError.Invalid;
  }
  return;
};

export const emailValidator = {
  validate,
} as EmailValidator;
