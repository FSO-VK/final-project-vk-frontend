import { BackendHttpApiConfig } from '@/shared/api/api';

export interface Config {
  backendConfig?: BackendHttpApiConfig;
}

let config: Config;

if (import.meta.env.MODE == 'development') {
  config = {};
} else if (import.meta.env.MODE == 'staging') {
  config = {
    backendConfig: {
      backendOrigin: 'https://myhealthbox.ddns.net/api/v1',
      medicine: {
        getMedicinesRoute: '/medicines',
      },
    },
  };
} else if (import.meta.env.MODE == 'production') {
  config = {
    backendConfig: {
      backendOrigin: 'https://myhealthbox.ddns.net/api/v1',
      medicine: {
        getMedicinesRoute: '/medicines',
      },
    },
  };
} else {
  throw new Error(`Unexpected environment ${import.meta.env.MODE}`);
}

export default config;
