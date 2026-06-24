import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// Must match your GitHub repo name for project pages (user.github.io/REPO_NAME/)
const REPO_NAME = process.env.GITHUB_REPOSITORY_NAME ?? 'hidden-objects';
const isGhPages = process.env.GITHUB_PAGES === 'true';

export default defineConfig({
  base: isGhPages ? `/${REPO_NAME}/` : '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'The Lost Line',
        short_name: 'Lost Line',
        description: 'A cozy hidden-object mystery on the Meridian City subway.',
        theme_color: '#1a2a3a',
        background_color: '#0f1820',
        display: 'standalone',
        icons: [
          {
            src: 'favicon.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,svg,json,wasm}'],
        globIgnores: ['**/audio/**'],
        runtimeCaching: [
          {
            urlPattern: /\/adventures\/.*\.mp3$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'adventure-audio',
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 90 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /\/adventures\/.*\.(png|jpg|webp)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'adventure-assets',
              expiration: { maxEntries: 120, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@engine': '/src/engine',
      '@ui': '/src/ui',
      '@adventures': '/src/adventures',
    },
  },
});
