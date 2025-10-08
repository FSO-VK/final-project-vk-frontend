import fs from 'node:fs/promises';
import express from 'express';
import { generateHydrationScript } from 'solid-js/web';

async function makeConfig() {
  // base url on which frontend is served
  const baseUrl = process.env.BASE || '/';

  const host = process.env.HOST || '0.0.0.0';
  const port = process.env.PORT || 5173;

  // Server mode. Can be ether "development", "production" or "staging"
  const mode = process.env.MODE || 'development';

  const isDevelopment = process.env.NODE_ENV === 'development';
  const templateHtml = isDevelopment
    ? ''
    : await fs.readFile(`./dist/${mode}/client/index.html`, 'utf-8');

  return {
    isDevelopment,
    host,
    templateHtml,
    baseUrl,
    port,
    mode,
  };
}

const serverConfig = await makeConfig();

async function createAppServer(serverConfig) {
  const app = express();

  /** @type {import('vite').ViteDevServer | undefined} */
  let vite;
  if (serverConfig.isDevelopment) {
    const { createServer } = await import('vite');
    vite = await createServer({
      server: { middlewareMode: true },
      appType: 'custom',
      base: serverConfig.baseUrl,
    });
    app.use(vite.middlewares);
  } else {
    const compression = (await import('compression')).default;
    const sirv = (await import('sirv')).default;
    app.use(compression());
    app.use(serverConfig.baseUrl, sirv(`./dist/${serverConfig.mode}/client`, { extensions: [] }));
  }

  app.use('*all', async (req, resp) => {
    console.info(`${new Date(Date.now()).toISOString()} ${req.method} ${req.url}`);

    try {
      const url = req.originalUrl.replace(serverConfig.baseUrl, '');

      let template;
      let render;

      if (serverConfig.isDevelopment) {
        template = await fs.readFile('./index.html', 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
      } else {
        template = serverConfig.templateHtml;
        render = (await import(`./dist/${serverConfig.mode}/server/entry-server.js`)).render;
      }

      const rendered = await render(url);

      const head = (rendered.head ?? '') + generateHydrationScript();

      const html = template
        .replace('<!--app-head-->', head)
        .replace('<!--app-html-->', rendered.html ?? '');

      resp.status(200).set({ 'Content-Type': 'text/html' }).send(html);
    } catch (e) {
      vite?.ssrFixStacktrace(e);
      console.log(e.stack);
      resp.status(500).end(e.stack);
    }
  });

  app.listen(serverConfig.port, serverConfig.host, () => {
    console.log(`Server started at http://${serverConfig.host}:${serverConfig.port}`);
  });
}

createAppServer(serverConfig);
