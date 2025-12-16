import { type MedicationApi } from '@/shared/api';
import { assertIfError } from '@/shared/lib';

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
  barCode?: string;
}

export interface Medication extends MedicationDraft {
  id: string;
}

export interface AssistantQuery {
  query: string;
  answer?: string;
}

export interface Instruction {
  medicationId: string;
  pharmInfluence: string;
  pharmKinetics: string;
  dosage: string;
  overDosage: string;
  interaction: string;
  lactation: string;
  sideEffects: string;
  usingIndication: string;
  usingCounterIndication: string;
  specialInstruction: string;
  renalInfluence: string;
  hepaticInfluence: string;
  elderlyUsage: string;
  childUsage: string;
}

export const INSTRUCTION_I11N: Record<string, string> = {
  pharmInfluence: 'Фармакологическое действие',
  pharmKinetics: 'Фармакокинетика',
  dosage: 'Режим дозирования',
  overDosage: 'Передозировка',
  interaction: 'Лекарственное взаимодействие',
  lactation: 'Применение при беременности и кормлении грудью',
  sideEffects: 'Побочное действие',
  usingIndication: 'Показания к применению',
  usingCounterIndication: 'Противопоказания к применению',
  renalInfluence: 'Применение при нарушениях функции почек',
  specialInstruction: 'Особые указания',
  hepaticInfluence: 'Применение при нарушениях функции печени',
  elderlyUsage: 'Применение у пожилых пациентов',
  childUsage: 'Применение у детей',
};

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
  medicationByScan: (dataCode: string) => Promise<MedicationDraft | null>;
  medicationsCount: () => number;
  fullAssistantLog: () => Map<string, AssistantQuery[]>;
  instructionByMedicationId: (id: string) => Promise<Instruction | null>;

  // Setters
  setMedications: (medications: Medication[]) => void;
  addMedication: (m: Medication) => void;
  updateMedication: (m: Medication) => void;
  removeMedication: (id: string) => void;
  clearMedications: () => void;
  appendAssistantLog: (id: string, query: AssistantQuery) => void;
  updateLastAssistantLog: (id: string, query: AssistantQuery) => void;
  setMedicationInstruction: (instruction: Instruction) => void;
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

  async askAssistant(id: string, query: string) {
    this.store_.appendAssistantLog(id, {
      query,
    });
    try {
      const response = await this.medicationApi_.askAssistant({ medicationId: id, query });
      this.store_.updateLastAssistantLog(id, { query, answer: response.llmAnswer });
    } catch (e: unknown) {
      assertIfError(e);
      this.store_.updateLastAssistantLog(id, { query, answer: '' });
      throw e;
    }
  }
}
