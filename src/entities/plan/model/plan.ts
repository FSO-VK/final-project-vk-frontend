import { Amount as MedicationAmount } from '@/entities/medication/model/medication';

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
