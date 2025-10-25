export type Password = string;

export enum PasswordError {
  TooShort = 'TOO_SHORT',
  NoUppercaseLetter = 'NO UPPERCASE LETTER',
  NoUndercaseLetter = 'NO UNDERCASE LETTER',
  NoNumbers = 'NO NUMBERS',
  UnexpectedRune = 'UNEXPECTED RUNE',
}

export const MIN_PASSWORD_LEN = 8;
export const MAX_PASSWORD_LEN = 254;

export interface PasswordValidator {
  validate: (email: Password) => PasswordError | undefined;
}
