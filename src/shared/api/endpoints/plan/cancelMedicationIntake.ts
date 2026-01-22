import { backendClient } from '../../client';

export async function cancelMedicationIntake(intakeRecordId: string): Promise<void> {
  await backendClient.delete(`/planning/intake/${intakeRecordId}/cancel`, {
    useCredentials: true,
  });
}

export async function cancelMedicationIntakeMock(_: string): Promise<void> {
  return await Promise.resolve();
}
