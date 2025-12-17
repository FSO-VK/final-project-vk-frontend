import { Amount as MedicationAmount } from '@/entities/medication/model/medication';
import { PlanApi } from '@/shared/api/endpoints/plan';

export enum PlanDayPeriod {
  EveryDay = 'everyday',
  EveryXDays = 'everyXdays',
}

export interface PlanDraft {
  medicationId: string;
  amount: MedicationAmount;
  condition: string;
  startDate: Date;
  endDate: Date;
  recurrenceRule: string[];
}

export type PlanStatus = 'draft' | 'active' | 'finished';

export interface Plan {
  id: string;
  medicationId: string;
  amount: MedicationAmount;
  condition: string;
  status: PlanStatus;
  startDate: Date;
  endDate: Date;
  recurrenceRule: string[];
}

export interface PlanStore {
  // Getters
  allPlans: () => Promise<Plan[]>;

  // Setters
  addPlan: (p: Plan) => void;
}

export class PlanActions {
  private planApi_: PlanApi;
  private planStore_: PlanStore;

  constructor(api: PlanApi, store: PlanStore) {
    this.planApi_ = api;
    this.planStore_ = store;
  }

  async addPlan(planDraft: PlanDraft) {
    const addedPlan = await this.planApi_.add(planDraft);
    this.planStore_.addPlan(addedPlan);
  }
}
