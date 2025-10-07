import type { Medicine } from '../../dto/medicine';

export interface MedicineApi {
  getMedicinesList: () => Promise<Medicine[]>;
}
