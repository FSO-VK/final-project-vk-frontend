export interface Config {
  backendOrigin: string;
}

let config: Config;

if (import.meta.env.MODE == 'development') {
  config = {
    backendOrigin: 'http://127.0.0.1:8001',
  };
} else if (import.meta.env.MODE == 'staging') {
  config = {
    backendOrigin: 'https://myhealthbox.ddns.net',
  };
} else if (import.meta.env.MODE == 'production') {
  config = {
    backendOrigin: 'https://myhealthbox.ddns.net',
  };
} else {
  throw new Error(`Unexpected environment ${import.meta.env.MODE}`);
}

export default config;
