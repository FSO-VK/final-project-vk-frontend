import { planApi, type PlanApi } from '@/shared/api/endpoints/plan';
import { ReactiveMap } from '@solid-primitives/map';
import type { Plan, PlanStore } from './plan';

function createPlanStore(planApi: PlanApi): PlanStore {
  const planStore = new ReactiveMap<string, Plan>();

  const addPlan = (p: Plan) => {
    planStore.set(p.id, p);
  };

  const allPlans = async () => {
    const allPlans = (await planApi.getAll()).allUserPlans;
    allPlans.forEach((p) => planStore.set(p.id, p));
    return allPlans;
  };

  const result: PlanStore = {
    addPlan,
    allPlans,
  };

  return result;
}

export const planStore: PlanStore = createPlanStore(planApi);
