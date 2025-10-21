/* Api exports */
export { medicationApi } from './endpoints/medication';
export { authApi } from './endpoints/auth';

/* Type exports */
export type { Medication } from './endpoints/medication';

export type {
  CheckAuthDTO,
  LoginOptions,
  LoginDTO,
  RegisterOptions,
  RegisterDTO,
} from './endpoints/auth';
