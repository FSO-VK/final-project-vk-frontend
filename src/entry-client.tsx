/* @refresh reload */
import { render } from 'solid-js/web';
import { App } from './app';

import { useMeActions, useMeStore } from '@/entities/me';

const root = document.getElementById('root');
root!.innerHTML = '';

const initMe = async () => {
  const meActions = useMeActions();
  await meActions.initializeStore();

  if (import.meta.env.MODE === 'development') {
    const meStore = useMeStore();
    console.info(`meStore {isAuthorized: ${meStore.isAuthorized()}, userId: ${meStore.userId()}}`);
  }
};

render(() => <App initialJob={initMe} />, root!);
