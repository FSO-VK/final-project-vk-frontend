import { backendClient } from '../../client';
import { BaseDTO } from './dto';
import * as z from 'zod/mini';

export const GetAllMedicationsDTO = z.object({
  medicationBox: z.array(BaseDTO),
});

export async function getAll(): Promise<z.infer<typeof GetAllMedicationsDTO>> {
  const body = await backendClient.get('/medication/medication/all', {
    useCredentials: true,
  });
  return GetAllMedicationsDTO.parse(body);
}

export async function getAllMock(): Promise<z.infer<typeof GetAllMedicationsDTO>> {
  return await Promise.resolve({
    medicationBox: [],
  });
}
