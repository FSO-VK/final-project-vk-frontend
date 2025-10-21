import { renderToStringAsync } from 'solid-js/web';
import { App } from './app';

export async function render() {
  const html = await renderToStringAsync(() => <App />);
  return { html };
}
