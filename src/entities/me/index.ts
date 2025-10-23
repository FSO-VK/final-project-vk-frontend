import { authApi } from '@/shared/api';
import { MeActions } from './model/me';
import { meStore } from './model/me_solid';

export type { Me, MeActions, MeStore } from './model/me';

export function useMeStore() {
  return meStore;
}

const meActions = new MeActions(meStore, authApi);

export function useMeActions() {
  return meActions;
}
