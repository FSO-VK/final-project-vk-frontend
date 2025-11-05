import { type MedicationApi } from '@/shared/api';

export enum ValidationError {
  MustBePositive,
}

export interface Amount {
  value: number;
  unit: string;
}

export const validateAmountValue = (value: number): ValidationError | undefined => {
  if (value <= 0) {
    return ValidationError.MustBePositive;
  }
  return;
};

export const AMOUNT_UNITS = ['шт.', 'г.', 'мл.'];

export interface MedicationProducer {
  name: string;
  country: string;
}

export const MAX_PRODUCER_NAME_LEN = 100;

export interface ActiveSubstance {
  name: string;
  value: number;
  unit: string;
}

export const validateActiveSubstanceValue = (value: number): ValidationError | undefined => {
  if (value <= 0) {
    return ValidationError.MustBePositive;
  }
  return;
};

export const MAX_ACTIVE_SUBSTANCE_NAME_LEN = 200;
export const ACTIVE_SUBSTANCE_UNIT = 'мг';

export interface MedicationDraft {
  name: string;
  internationalName?: string;
  amount: Amount;
  releaseForm: string;
  group?: string[];
  producer?: MedicationProducer;
  activeSubstance?: ActiveSubstance[];
  expirationDate: Date;
  releaseDate?: Date;
  comment?: string;
}

export interface Medication extends MedicationDraft {
  id: string;
}

export const MAX_NAME_LEN = 100;
export const MAX_INTERNATIONAL_NAME_LEN = 100;
export const MAX_GROUP_NAME_LEN = 100;
export const MAX_GROUP_SIZE = 10;
export const MAX_RELEASE_FORM_LEN = 100;
export const MAX_ACTIVE_SUBSTANCE_SIZE = 10;
export const MAX_COMMENT_LEN = 1000;

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

export class MedicationActions {
  private medicationApi_: MedicationApi;
  private store_: MedicationStore;

  constructor(api: MedicationApi, store: MedicationStore) {
    this.medicationApi_ = api;
    this.store_ = store;
  }

  async addMedication(medDraft: MedicationDraft) {
    const addedMedication = await this.medicationApi_.add(medDraft);
    this.store_.addMedication(addedMedication);
  }

  async updateMedication(medication: Medication) {
    const updatedMedication = await this.medicationApi_.update(medication);
    this.store_.updateMedication(updatedMedication);
  }

  async removeMedication(id: string) {
    await this.medicationApi_.delete({ id });
    this.store_.removeMedication(id);
  }
}
