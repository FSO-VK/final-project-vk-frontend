import { type MedicationApi } from '@/shared/api';

export interface Amount {
  value: number;
  unit: string;
}

export interface MedicationProducer {
  name: string;
  country: string;
}

export interface ActiveSubstance {
  name: string;
  value: number;
  unit: string;
}

export interface Medication {
  id: string;
  name: string;
  internationalName?: string;
  amount: Amount;
  releaseForm: string;
  group?: string;
  producer?: MedicationProducer;
  activeSubstance?: ActiveSubstance;
  expirationDate: Date;
  releaseDate?: Date;
}

export interface MedicationStore {
  // Getters
  allMedications: () => Promise<Medication[]>;
  medicationById: (id: string) => Promise<Medication | null>;
  medicationsCount: () => number;

  // Setters
  setMedications: (medications: Medication[]) => void;
  addMedication: (m: Medication) => void;
  updateMedication: (m: Medication) => void;
  removeMedication: (id: string) => void;
  clearMedications: () => void;
}

export interface MedicationStoreFabric {
  createMedicationStore: (medicationApi: MedicationApi) => MedicationStore;
}
