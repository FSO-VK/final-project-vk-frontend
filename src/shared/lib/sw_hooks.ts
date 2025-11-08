import { createStore } from 'solid-js/store';
import { useRegisterSW } from 'virtual:pwa-register/solid';

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

export const {
  needRefresh: [needRefresh, setNeedRefresh],
  offlineReady: [offlineReady, setOfflineReady],
  updateServiceWorker,
} = useRegisterSW({
  onRegisterError(error) {
    console.error('failed to register SW', error);
  },
  onRegisteredSW(_swScriptUrl, registration) {
    if (registration === undefined) {
      console.error('failed to register SW: registration is undefined');
      return null;
    }
    swStore.setRegistration(registration);
  },
});

export function useSwStore(): SWStore {
  return swStore;
}
