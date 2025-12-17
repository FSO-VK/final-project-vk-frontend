import type { AddPlanOptions, AddPlanDTO as _AddDTO } from './add';
import type { GetAllPlansDTO as _GetAllPlansDTO } from './getAll';

import { add, addMock } from './add';
import { getAll, getAllMock } from './getAll';

import * as z from 'zod/mini';

export { AddPlanOptions };

export type AddPlanDTO = z.infer<typeof _AddDTO>;
export type GetAllPlansDTO = z.infer<typeof _GetAllPlansDTO>;

export interface PlanApi {
  add: (o: AddPlanOptions) => Promise<AddPlanDTO>;
  getAll: () => Promise<GetAllPlansDTO>;
}

export let planApi: PlanApi;

if (import.meta.env.MODE === 'development') {
  planApi = {
    add: addMock,
    getAll: getAllMock,
  };
} else {
  planApi = {
    add,
    getAll,
  };
}
