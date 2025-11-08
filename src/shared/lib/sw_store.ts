import { createStore } from 'solid-js/store';

export interface SWStore {
  getRegistration: () => ServiceWorkerRegistration | null;
  setRegistration: (registration: ServiceWorkerRegistration) => void;
}

const [solidSwStore, setSolidSwStore] = createStore<{
  registration: ServiceWorkerRegistration | null;
}>({
  registration: null,
});

const swStore = {
  getRegistration: () => solidSwStore.registration,
  setRegistration: (r: ServiceWorkerRegistration) => setSolidSwStore('registration', r),
} as SWStore;

export function useSwStore(): SWStore {
  return swStore;
}
