import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    solid(),
    VitePWA({
      registerType: 'prompt',
      injectRegister: false,

      manifest: {
        name: 'final-project-vk-frontend',
        short_name: 'final-project-vk-frontend',
        description: 'final-project-vk-frontend',
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
        enabled: false,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, './src/shared'),
    },
  },
  server: {
    host: '127.0.0.1'
  }
});
