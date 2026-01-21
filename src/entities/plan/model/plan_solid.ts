import { planApi, type PlanApi } from '@/shared/api/endpoints/plan';
import { ReactiveMap } from '@solid-primitives/map';
import { createStore } from 'solid-js/store';
import type { Plan, PlanStore, IntakeRecord, Schedule } from './plan';

function createPlanStore(planApi: PlanApi): PlanStore {
  const planStore = new ReactiveMap<string, Plan>();
  const [schedule, setSchedule] = createStore<Schedule>([]);

  const addPlan = (p: Plan) => {
    planStore.set(p.id, p);
  };

  const allPlans = async () => {
    const allPlans = (await planApi.getAll()).allUserPlans;
    allPlans.forEach((p) => planStore.set(p.id, p));
    return allPlans;
  };

  const getSchedule = async (d: Date): Promise<Schedule> => {
    const start = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
    const end = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
    const response = await planApi.getSchedule({
      startDate: start,
      endDate: end,
    });

    const mapped = response.schedule.map((intakeRec) => {
      return {
        id: intakeRec.intakeRecordId,
        ...intakeRec,
      };
    });

    setSchedule(mapped);
    return mapped;
  };

  const currentSchedule = () => schedule;

  const takeMedication = (record: IntakeRecord) => {
    const idx = schedule.findIndex((r) => r.id === record.id);
    if (idx !== -1) {
      setSchedule((currentSchedule) => {
        const updated = [...currentSchedule];
        updated[idx] = { ...record, status: 'Принято', takenAt: new Date() };
        return updated;
      });
    }
  };

  const cancelMedicationIntake = (record: IntakeRecord) => {
    const idx = schedule.findIndex((r) => r.id === record.id);
    if (idx !== -1) {
      setSchedule((currentSchedule) => {
        const updated = [...currentSchedule];
        updated[idx] = { ...record, status: 'Запланировано', takenAt: undefined };
        return updated;
      });
    }
  };

  const result: PlanStore = {
    addPlan,
    allPlans,
    getSchedule,
    takeMedication,
    cancelMedicationIntake,
    currentSchedule,
  };

  return result;
}

export const planStore: PlanStore = createPlanStore(planApi);
