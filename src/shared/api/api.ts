import { makeHttpMedicineApi, MedicineHttpApiConfig } from './src/apis/medicine_api/http';
import { MedicineApi } from './src/apis/medicine_api/interface';
import { makeMockMedicineApi } from './src/apis/medicine_api/mock';

export interface BackendHttpApiConfig {
  backendOrigin: string;
  medicine: MedicineHttpApiConfig;
}

export interface BackendApi {
  medicine: MedicineApi;
}

export function makeHttpBackendApi(config: BackendHttpApiConfig): BackendApi {
  return {
    medicine: makeHttpMedicineApi(config.backendOrigin, config.medicine),
  };
}

export function makeMockBackendApi(): BackendApi {
  return {
    medicine: makeMockMedicineApi(),
  };
}
