import type { ModuleOptions } from '@vite-pwa/nuxt';

const name = 'Ozimiz';

export const pwa: Partial<ModuleOptions> = {
  registerType: 'autoUpdate',
  writePlugin: true,
  registerWebManifestInRouteRules: true,
  manifest: {
    id: name,
    name: name,
    short_name: name,
    description: name,
    theme_color: '#FFF',
  },
  workbox: {
    globPatterns: ['**/*.{js,css,html,txt,png,ico,svg,json}'],
    navigateFallback: '/',
    cleanupOutdatedCaches: true,
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts.googleapis.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365,
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /^https:\/\/fonts.gstatic.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'gstatic-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365,
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /^https:\/\/cdn.jsdelivr.net\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'cdn-jsdelivr-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365,
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
};
