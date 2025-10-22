/** @fileoverview A module describing medication API */

import { backendClient } from '../client';

export interface MedicationCategory {
  id: string;
  name: string;
}

export interface MedicationDTO {
  id: string;
  name: string;
  categories: MedicationCategory[];
  items: number;
  itemsUnit: string;
  expires: Date;
}

// Preserved for future use
export type Medication = MedicationDTO;

export function adaptMedicationDTO(d: MedicationDTO): Medication {
  return d;
}

async function getMedicationsList(): Promise<Medication[]> {
  const body = await backendClient.get('/medicine/all');
  return (body.medicineList as MedicationDTO[]).map(adaptMedicationDTO);
}

async function getMedicationsListMock(): Promise<Medication[]> {
  return new Promise(() => {
    return [
      {
        id: '1',
        name: 'Нурофен',
        items: 15,
        itemsUnit: 'шт.',
        expires: new Date(Date.now()),
        categories: [],
      },
    ] as Medication[];
  });
}

export interface MedicationApi {
  getMedicationsList: () => Promise<Medication[]>;
}

export let medicationApi: MedicationApi;

if (import.meta.env.MODE === 'development') {
  medicationApi = {
    getMedicationsList: getMedicationsListMock,
  };
} else {
  medicationApi = {
    getMedicationsList,
  };
}
