export { PlanDayPeriod } from './model/plan';
export type { PlanDraft, Plan, PlanStore } from './model/plan';

import { planStore } from './model/plan_solid';
import { PlanActions, type PlanStore } from './model/plan';
import { planApi } from '@/shared/api/endpoints/plan';

export function usePlanStore(): PlanStore {
  return planStore;
}

const planActions = new PlanActions(planApi, planStore);

export function usePlanActions() {
  return planActions;
}

export { IntakeRecordCard } from './ui/intake_record';
export { PlanCard } from './ui/plan';
