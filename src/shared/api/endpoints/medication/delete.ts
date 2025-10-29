import { backendClient } from '../../client';

export interface DeleteMedicationOptions {
  id: string;
}

export async function del(options: DeleteMedicationOptions): Promise<void> {
  await backendClient.delete('/medication/medication', { body: options, useCredentials: true });
}

export async function delMock(_options: DeleteMedicationOptions): Promise<void> {
  return await Promise.resolve();
}
