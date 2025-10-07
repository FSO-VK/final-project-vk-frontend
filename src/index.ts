/** @fileoverview  Here lies common entry code for client and server*/

import './index.css';
import { BackendApi, makeHttpBackendApi, makeMockBackendApi } from './shared/api/api';
import config from './config/config';

export let Api: BackendApi;

// This is not in config because we need tree shaking
// to throw out mocks when building production
if (import.meta.env.MODE == 'development') {
  Api = makeMockBackendApi();
} else {
  Api = makeHttpBackendApi(config.backendConfig!);
}
