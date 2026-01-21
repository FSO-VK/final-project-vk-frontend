import { backendClient } from '../../client';

export async function takeMedication(intakeRecordId: string): Promise<void> {
  await backendClient.post(`/planning/intake/${intakeRecordId}/take`);
}

export async function takeMedicationMock(_: string): Promise<void> {
  return await Promise.resolve();
}
