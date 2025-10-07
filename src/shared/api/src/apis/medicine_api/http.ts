/** @fileoverview A module describing medicine API class */

import { fetchJsonCors, HttpMethod } from '@/shared/fetch_utils/fetch_utils';
import { unpackResponse } from '../../response_unpack';
import { UnmarshallError } from '@/shared/fetch_utils/errors';
import type { Medicine } from '../../dto/medicine';
import type { MedicineApi } from './interface';

export interface MedicineHttpApiConfig {
  getMedicinesRoute: string;
}

async function getMedicinesList(endpoint: URL): Promise<Medicine[]> {
  const response = await fetchJsonCors(new URL(endpoint), {
    method: HttpMethod.Get,
  });
  const body = await unpackResponse(response);
  if (!body.medicineList) {
    throw new UnmarshallError('expected medicineList field but not found');
  }
  return body.medicineList as Medicine[];
}

export function makeHttpMedicineApi(
  backendOrigin: string,
  config: MedicineHttpApiConfig,
): MedicineApi {
  return {
    getMedicinesList: () => getMedicinesList(new URL(backendOrigin + config.getMedicinesRoute)),
  };
}
