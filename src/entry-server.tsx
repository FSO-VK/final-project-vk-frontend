import { renderToStringAsync } from 'solid-js/web';
import { App } from './app';
import { useMeStore } from './entities/me';

export async function render(url: string, sessionid: string) {
  if (sessionid !== '') {
    // We believe user if he sends session id
    // Anyway he wont be able to load data
    const meStore = useMeStore();
    meStore.setIsAuthorized(true);
    return renderToStringAsync(() => <App initialUrl={url} />);
  }

  const html = await renderToStringAsync(() => <App initialUrl={url} />);
  return { html };
}
