import { fetchJsonCors, HttpMethod } from '../fetch_utils/fetch_utils';
import type { Medicine } from './src/dto/medicine';
import { unpackResponse } from './src/response_unpack';
import apiEndpoints from './api.json';

export async function getMedicinesList(): Promise<Medicine[]> {
  const response = await fetchJsonCors(
    new URL(apiEndpoints.backendRoot + apiEndpoints.getMedicines),
    {
      method: HttpMethod.Get,
    },
  );
  const body = await unpackResponse(response);
  if (!body.medicineList) {
    throw Error('expected medicineList field but not found');
  }
  return body.medicineList as Medicine[];
}
