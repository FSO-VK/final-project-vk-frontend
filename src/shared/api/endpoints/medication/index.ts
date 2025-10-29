import type { AddMedicationOptions, AddMedicationDTO as _AddDTO } from './add';
import type { UpdateMedicationOptions, UpdateMedicationDTO as _UpdateDTO } from './update';
import type { DeleteMedicationOptions } from './delete';
import type { GetMedicationOptions, GetMedicationDTO as _GetDTO } from './get';
import type { ScanMedicationOptions, ScanMedicationDTO as _ScanDTO } from './scan';
import type { GetAllMedicationsDTO as _GetListDTO } from './getAll';
import { add, addMock } from './add';
import { update, updateMock } from './update';
import { del, delMock } from './delete';
import { get, getMock } from './get';
import { scan, scanMock } from './scan';
import { getAll, getAllMock } from './getAll';

import * as z from 'zod/mini';

export {
  AddMedicationOptions,
  UpdateMedicationOptions,
  DeleteMedicationOptions,
  GetMedicationOptions,
};

// Hiding zod from importer
export type GetMedicationDTO = z.infer<typeof _GetDTO>;
export type GetMedicationsListDTO = z.infer<typeof _GetListDTO>;
export type AddMedicationDTO = z.infer<typeof _AddDTO>;
export type UpdateMedicationDTO = z.infer<typeof _UpdateDTO>;
export type ScanMedicationDTO = z.infer<typeof _ScanDTO>;

export interface MedicationApi {
  get: (o: GetMedicationOptions) => Promise<GetMedicationDTO>;
  getAll: () => Promise<GetMedicationsListDTO>;
  add: (o: AddMedicationOptions) => Promise<AddMedicationDTO>;
  update: (o: UpdateMedicationOptions) => Promise<UpdateMedicationDTO>;
  delete: (o: DeleteMedicationOptions) => Promise<void>;
  scan: (o: ScanMedicationOptions) => Promise<ScanMedicationDTO>;
}

export let medicationApi: MedicationApi;

if (import.meta.env.MODE === 'development') {
  medicationApi = {
    get: getMock,
    getAll: getAllMock,
    add: addMock,
    update: updateMock,
    delete: delMock,
    scan: scanMock,
  };
} else {
  medicationApi = {
    get: get,
    getAll: getAll,
    add: add,
    update: update,
    delete: del,
    scan: scan,
  };
}
