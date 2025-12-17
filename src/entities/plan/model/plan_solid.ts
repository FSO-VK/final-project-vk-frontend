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

  const getSchedule = async (d: Date) => {
    const start = new Date(d.getFullYear(), d.getMonth(), d.getDay(), 0, 0, 0, 0);
    const end = new Date(d.getFullYear(), d.getMonth(), d.getDay(), 23, 59, 59, 999);
    const schedule = await planApi.getSchedule({
      startDate: start,
      endDate: end,
    });
    return schedule.schedule.map((intakeRec) => {
      return {
        id: intakeRec.intakeRecordId,
        ...intakeRec,
      };
    });
  };

  const result: PlanStore = {
    addPlan,
    allPlans,
    getSchedule,
  };

  return result;
}

export const planStore: PlanStore = createPlanStore(planApi);
