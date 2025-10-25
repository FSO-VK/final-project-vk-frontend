export type Email = string;

export const MAX_EMAIL_LEN = 254;

export enum EmailError {
  Invalid,
}

export interface EmailValidator {
  validate: (email: Email) => EmailError | undefined;
}
