/* @refresh reload */
import { render } from 'solid-js/web';
import { App } from './app';

import { useMeActions, useMeStore } from '@/entities/me';
import { useSwStore } from './shared/lib';

const root = document.getElementById('root');
root!.innerHTML = '';

import('virtual:pwa-register/solid').then(
  ({ useRegisterSW }) => {
    useRegisterSW({
      onRegisterError(error) {
        console.error('failed to register SW', error);
      },
      onRegisteredSW(_swScriptUrl, registration) {
        if (registration === undefined) {
          console.error('failed to register SW: registration is undefined');
          return null;
        }
        const swStore = useSwStore();
        swStore.setRegistration(registration);
      },
    });
  },
  () => {
    console.error('failed to register SW');
  },
);

const initMe = async () => {
  const meActions = useMeActions();
  await meActions.initializeStore();

  if (import.meta.env.MODE === 'development') {
    const meStore = useMeStore();
    console.info(`meStore {isAuthorized: ${meStore.isAuthorized()}, userId: ${meStore.userId()}}`);
  }
};

render(() => <App initialJob={initMe} />, root!);
