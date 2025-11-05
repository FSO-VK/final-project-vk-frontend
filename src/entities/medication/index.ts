import { medicationApi } from '@/shared/api';
import { medicationStoreFabric } from './model/medication_solid';

export type { Medication, MedicationStore } from './model/medication';

export function createMedicationStore() {
  return medicationStoreFabric.createMedicationStore(medicationApi);
}

const medicationStore = medicationStoreFabric.createMedicationStore(medicationApi);

export function useMedicationStore() {
  return medicationStore;
}

export { MedicationCard } from './ui/medication_card/medication_card';

export {
  validateAmountValue,
  AMOUNT_UNITS,
  MAX_PRODUCER_NAME_LEN,
  MAX_ACTIVE_SUBSTANCE_NAME_LEN,
  ACTIVE_SUBSTANCE_UNIT,
  MAX_NAME_LEN,
  MAX_INTERNATIONAL_NAME_LEN,
  MAX_GROUP_NAME_LEN,
  MAX_GROUP_SIZE,
  MAX_RELEASE_FORM_LEN,
  MAX_COMMENT_LEN,
  ValidationError,
  type ActiveSubstance,
  type MedicationDraft,
} from './model/medication';
