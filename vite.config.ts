import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    solid({ ssr: true }),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',

      injectRegister: null,
      registerType: 'autoUpdate',

      manifest: {
        name: 'Умная аптечка',
        short_name: 'Аптечка',
        description: 'Приложения для учета лекарств и их приема',
        theme_color: '#ffffff',

        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },

      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },

      devOptions: {
        enabled: true,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
