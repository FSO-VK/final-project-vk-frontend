import { Medicine } from '../../dto/medicine';
import { MedicineApi } from './interface';

async function getMedicinesList(): Promise<Medicine[]> {
  return [
    {
      id: '1',
      name: 'Нурофен',
      items: 15,
      itemsUnit: 'шт.',
      expires: new Date(Date.now()),
      categories: [],
    },
  ];
}

export function makeMockMedicineApi(): MedicineApi {
  const api: MedicineApi = {
    getMedicinesList,
  };
  return api;
}
