import { backendClient } from '../../client';

import * as z from 'zod/mini';

export const GetVapidDTO = z.object({
  vapidPublicKey: z.string(),
});

export async function getVapid() {
  const body = await backendClient.get('/notification/vapidPublicKey', {
    useCredentials: true,
  });
  return GetVapidDTO.parse(body);
}

export async function getVapidMock() {
  return await Promise.resolve({
    vapidPublicKey:
      'BLrSHtvuvFP6W-53ltZjlDFXvtzgACKP_Tk9HRtq5isHeDBlV2fWWuzKPFFPM0OI9ZHwpo6Y9HAUzPDjffNfOtQ',
  });
}
