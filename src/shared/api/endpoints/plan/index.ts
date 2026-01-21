import type { AddPlanOptions, AddPlanDTO as _AddDTO } from './add';
import type { GetAllPlansDTO as _GetAllPlansDTO } from './getAll';
import type { GetScheduleOptions, GetScheduleDTO as _GetScheduleDTO } from './getSchedule';

import { add, addMock } from './add';
import { getAll, getAllMock } from './getAll';
import { getSchedule, getScheduleMock } from './getSchedule';
import { takeMedication, takeMedicationMock } from './takeMedication';
import { cancelMedicationIntake, cancelMedicationIntakeMock } from './cancelMedicationIntake';

import * as z from 'zod/mini';

export { AddPlanOptions };
export { GetScheduleOptions };

export type AddPlanDTO = z.infer<typeof _AddDTO>;
export type GetAllPlansDTO = z.infer<typeof _GetAllPlansDTO>;
export type GetScheduleDTO = z.infer<typeof _GetScheduleDTO>;

export interface PlanApi {
  add: (o: AddPlanOptions) => Promise<AddPlanDTO>;
  getAll: () => Promise<GetAllPlansDTO>;
  getSchedule: (o: GetScheduleOptions) => Promise<GetScheduleDTO>;
  takeMedication: (intakeRecordId: string) => Promise<void>;
  cancelMedicationIntake: (intakeRecordId: string) => Promise<void>;
}

export let planApi: PlanApi;

if (import.meta.env.MODE === 'development') {
  planApi = {
    add: addMock,
    getAll: getAllMock,
    getSchedule: getScheduleMock,
    takeMedication: takeMedicationMock,
    cancelMedicationIntake: cancelMedicationIntakeMock,
  };
} else {
  planApi = {
    add,
    getAll,
    getSchedule,
    takeMedication,
    cancelMedicationIntake,
  };
}
