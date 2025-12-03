import { createStore } from 'solid-js/store';
import {
  type MedicationStore,
  type Medication,
  type MedicationStoreFabric,
  type AssistantQuery,
} from './medication';
import { type MedicationApi } from '@/shared/api';
import { ReactiveMap } from '@solid-primitives/map';

function createMedicationStore(medicationApi: MedicationApi): MedicationStore {
  const [medicationStore, setMedicationStore] = createStore({
    medications: [] as Medication[],
    assistantLogs: new Map() as Map<string, AssistantQuery[]>,
  });

  const assistantLogs = new ReactiveMap<string, AssistantQuery[]>();

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
    return medicationStore.medications.find((m) => m.id === id) ?? null;
  };

  const medicationByScan = async (dataCode: string) => {
    const med = await medicationApi.scan({ dataMatrixCode: dataCode });
    return { ...med };
  };

  const fullAssistantLog = () => {
    return assistantLogs;
  };

  const appendAssistantLog = (id: string, query: AssistantQuery) => {
    const oldArray = assistantLogs.get(id) ?? [];
    assistantLogs.set(id, [...oldArray, query]);
  };

  const updateLastAssistantLog = (id: string, query: AssistantQuery) => {
    const oldArray = assistantLogs.get(id) ?? [];
    if (oldArray.length < 1) {
      return;
    }
    oldArray[oldArray.length - 1] = query;
    // without full cleaning the store is not updated
    assistantLogs.set(id, []);
    assistantLogs.set(id, oldArray);
  };

  const medicationsCount = () => medicationStore.medications.length;

  const result: MedicationStore = {
    allMedications,
    medicationById,
    medicationsCount,
    addMedication,
    updateMedication,
    removeMedication,
    clearMedications,
    setMedications,
    medicationByScan,
    fullAssistantLog,
    appendAssistantLog,
    updateLastAssistantLog,
  };

  return result;
}

export const medicationStoreFabric: MedicationStoreFabric = { createMedicationStore };
