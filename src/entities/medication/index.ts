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
