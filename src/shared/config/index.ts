interface SharedConfig {
  backendOrigin: string;
}

export const sharedConfig: SharedConfig = {
  backendOrigin: 'https://myhealthbox.ddns.net/api/v1',
};

if (import.meta.env.DEV) {
  console.info('Current config is:');
  console.info(JSON.stringify(sharedConfig));
}
