import { PlanDayPeriod } from '@/entities/plan';

export interface PlanFormDraft {
  medicationId: string;
  period: PlanDayPeriod;
  intakeStart: Date;
  intakeEnd: Date;
  intakeDaysInterval: number;
  dosage: number;
  timeOfIntake: string[];
}
