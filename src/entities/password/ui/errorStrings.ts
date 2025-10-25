import { PasswordError } from '../model/password';
import { MIN_PASSWORD_LEN } from '../model/password';

export const PASSWORD_ERROR_STRINGS = {
  [PasswordError.TooShort]: `Введите пароль длиной хотя бы ${MIN_PASSWORD_LEN} символов`,
  [PasswordError.NoUppercaseLetter]: 'Добавьте заглавную латинскую букву',
  [PasswordError.NoUndercaseLetter]: 'Добавьте строчную латинскую букву',
  [PasswordError.NoNumbers]: 'Добавьте цифру',
  [PasswordError.UnexpectedRune]: 'Нужно вводить только латинские буквы и цифры',
};
