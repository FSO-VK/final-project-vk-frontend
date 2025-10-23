/* @refresh reload */
import { render } from 'solid-js/web';
import { App } from './app';

import { useMeActions, useMeStore } from '@/entities/me';

const root = document.getElementById('root');
root!.innerHTML = '';

const initMe = async () => {
  const meActions = useMeActions();
  // TODO: add suspence (FSO-143)
  await meActions.initializeStore();

  if (import.meta.env.DEV) {
    const meStore = useMeStore();
    console.info(`meStore {isAuthorized: ${meStore.isAuthorized()}, userId: ${meStore.userId()}}`);
  }
};

await initMe();

render(() => <App />, root!);
