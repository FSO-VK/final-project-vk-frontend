import type { AddOptions, AddDTO as _AddDTO } from './add';
import type { UpdateOptions, UpdateDTO as _UpdateDTO } from './update';
import type { DeleteOptions } from './delete';
import type { GetOptions, GetDTO as _GetDTO } from './get';
import { add, addMock } from './add';
import { update, updateMock } from './update';
import { del, delMock } from './delete';
import { get, getMock } from './get';

import * as z from 'zod/mini';

export { AddOptions, UpdateOptions, DeleteOptions, GetOptions };

// Hiding zod from importer
export type GetDTO = z.infer<typeof _GetDTO>;
export type AddDTO = z.infer<typeof _AddDTO>;
export type UpdateDTO = z.infer<typeof _UpdateDTO>;

export interface MedicationApi {
  get: (o: GetOptions) => Promise<GetDTO>;
  add: (o: AddOptions) => Promise<AddDTO>;
  update: (o: UpdateOptions) => Promise<UpdateDTO>;
  delete: (o: DeleteOptions) => Promise<void>;
}

export let medicationApi: MedicationApi;

if (import.meta.env.MODE === 'development') {
  medicationApi = {
    get: getMock,
    add: addMock,
    update: updateMock,
    delete: delMock,
  };
} else {
  medicationApi = {
    get: get,
    add: add,
    update: update,
    delete: del,
  };
}
