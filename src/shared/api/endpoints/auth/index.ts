import type { CheckAuthDTO as _CheckAuthDTO } from './check_auth';
import type { LoginOptions, LoginDTO as _LoginDTO } from './login';
import type { RegisterOptions, RegisterDTO as _RegisterDTO } from './register';
import { checkAuth, checkAuthMock } from './check_auth';
import { login, loginMock } from './login';
import { logout, logoutMock } from './logout';
import { register, registerMock } from './register';

import * as z from 'zod/mini';

export type { LoginOptions, RegisterOptions };

// Hiding zod from importer
export type CheckAuthDTO = z.infer<typeof _CheckAuthDTO>;
export type LoginDTO = z.infer<typeof _LoginDTO>;
export type RegisterDTO = z.infer<typeof _RegisterDTO>;

export interface AuthApi {
  checkAuth: () => Promise<CheckAuthDTO>;
  login: (o: LoginOptions) => Promise<LoginDTO>;
  logout: () => Promise<void>;
  register: (o: RegisterOptions) => Promise<RegisterDTO>;
}

export let authApi: AuthApi;

if (import.meta.env.MODE === 'development') {
  authApi = {
    checkAuth: checkAuthMock,
    login: loginMock,
    logout: logoutMock,
    register: registerMock,
  };
} else {
  authApi = {
    checkAuth,
    login,
    logout,
    register,
  };
}
