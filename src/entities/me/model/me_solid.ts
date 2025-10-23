import { createStore } from 'solid-js/store';
import { MeStore, Me } from './me';

function createMeStore(): MeStore {
  const [meStore, setMeStore] = createStore<Me>({
    isAuthorized: false,
    userId: null,
  });

  const isAuthorized = () => {
    return meStore.isAuthorized;
  };

  const userId = () => {
    return meStore.userId;
  };

  const setUser = (userId: string | null) => {
    setMeStore('userId', userId);
  };

  const setIsAuthorized = (isAuthorized: boolean) => {
    setMeStore('isAuthorized', isAuthorized);
  };

  return {
    isAuthorized,
    userId,
    setUser,
    setIsAuthorized,
  };
}

export const meStore = createMeStore();
