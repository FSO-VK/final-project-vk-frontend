/* Api exports */
export { medicationApi, type MedicationApi } from './endpoints/medication';
export { authApi, type AuthApi } from './endpoints/auth';

/* Type exports */
export type {
  GetMedicationOptions,
  GetMedicationDTO,
  AddMedicationOptions,
  AddMedicationDTO,
  UpdateMedicationOptions,
  UpdateMedicationDTO,
  DeleteMedicationOptions,
  ScanMedicationDTO,
} from './endpoints/medication';

export type {
  CheckAuthDTO,
  LoginOptions,
  LoginDTO,
  RegisterOptions,
  RegisterDTO,
} from './endpoints/auth';
