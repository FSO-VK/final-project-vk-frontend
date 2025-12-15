import { medicationApi } from '@/shared/api';
import { medicationStoreFabric } from './model/medication_solid';
import { MedicationActions } from './model/medication';

export type { Medication, ShortMedication, MedicationStore } from './model/medication';

export function createMedicationStore() {
  return medicationStoreFabric.createMedicationStore(medicationApi);
}

const medicationStore = medicationStoreFabric.createMedicationStore(medicationApi);

export function useMedicationStore() {
  return medicationStore;
}

const medicationActions = new MedicationActions(medicationApi, medicationStore);

export function useMedicationActions() {
  return medicationActions;
}

export { MedicationCard } from './ui/medication_card/medication_card';
export { getGaugeState, INITIAL_GAUGE_POSITION } from './ui/getGaugeState';

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
  INSTRUCTION_I11N,
  ValidationError,
  type ActiveSubstance,
  type MedicationDraft,
} from './model/medication';
