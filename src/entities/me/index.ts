import { authApi } from '@/shared/api';
import { MeActions } from './models/me';
import { meStore } from './models/me_solid';

export type { Me, MeActions, MeStore } from './models/me';

export function useMeStore() {
  return meStore;
}

const meActions = new MeActions(meStore, authApi);

export function useMeActions() {
  return meActions;
}
