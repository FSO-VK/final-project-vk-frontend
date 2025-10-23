import type { AuthApi, LoginOptions, RegisterOptions } from '@/shared/api';
import { assertIfError } from '@/shared/lib';

// me interface represents current user
export interface Me {
  isAuthorized: boolean;
  userId: string | null;
}

// meStore is a some reactive store with me inside
export interface MeStore {
  // Getters
  isAuthorized: () => boolean;
  userId: () => string | null;

  // Setters
  setUser: (userId: string | null) => void;
  setIsAuthorized: (isAuthorized: boolean) => void;
}

// meActions is a usecase interface/implementation
export class MeActions {
  private store: MeStore;
  private authApi: AuthApi;

  constructor(store: MeStore, api: AuthApi) {
    this.store = store;
    this.authApi = api;
  }

  async login(credentials: LoginOptions) {
    const dto = await this.authApi.login(credentials);
    this.store.setUser(dto.userId);
    this.store.setIsAuthorized(true);
  }

  async logout() {
    await this.authApi.logout();
    this.store.setIsAuthorized(false);
    this.store.setUser(null);
  }

  async register(credentials: RegisterOptions) {
    const dto = await this.authApi.register(credentials);
    this.store.setUser(dto.userId);
    this.store.setIsAuthorized(true);
  }

  async initializeStore() {
    try {
      const dto = await this.authApi.checkAuth();
      this.store.setUser(dto.userId);
      this.store.setIsAuthorized(true);
    } catch (e: unknown) {
      assertIfError(e);
      this.store.setUser(null);
      this.store.setIsAuthorized(false);
    }
  }
}
