import { createStore } from 'solid-js/store';
import { type MedicationStore, type Medication, type MedicationStoreFabric } from './medication';
import { type MedicationApi } from '@/shared/api';

function createMedicationStore(medicationApi: MedicationApi): MedicationStore {
  const [medicationStore, setMedicationStore] = createStore({
    medications: [] as Medication[],
  });

  const addMedication = (m: Medication) => {
    setMedicationStore('medications', (currentMedications) => [...currentMedications, m]);
  };

  const updateMedication = (m: Medication) => {
    const idx = medicationStore.medications.findIndex((medication) => m.id === medication.id);
    if (idx === -1) {
      return;
    }
    setMedicationStore('medications', (currentMedications) => {
      currentMedications[idx] = m;
      return currentMedications;
    });
  };

  const removeMedication = (id: string) => {
    const idx = medicationStore.medications.findIndex((m) => m.id === id);
    if (idx === -1) {
      return;
    }
    setMedicationStore('medications', (currentMedications: Medication[]) => {
      currentMedications.splice(idx, 1);
      return currentMedications;
    });
  };

  const clearMedications = () => {
    setMedicationStore('medications', () => []);
  };

  const setMedications = (medications: Medication[]) => {
    setMedicationStore('medications', medications);
  };

  const allMedications = async () => {
    const meds = await medicationApi.getAll();
    setMedicationStore('medications', meds.medicationBox);
    return medicationStore.medications;
  };

  const medicationById = async (id: string) => {
    const med = await medicationApi.get({ id });
    addMedication(med);
    return medicationStore.medications.find((m) => m.id === id);
  };

  const medicationsCount = () => medicationStore.medications.length;

  return {
    allMedications,
    medicationById,
    medicationsCount,
    addMedication,
    updateMedication,
    removeMedication,
    clearMedications,
    setMedications,
  } as MedicationStore;
}

export const medicationStoreFabric: MedicationStoreFabric = { createMedicationStore };
