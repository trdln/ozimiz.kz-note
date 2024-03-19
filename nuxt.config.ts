import path from 'path';
import { NuxtPage } from 'nuxt/schema';
import { noAuthPages, pwa } from './configs';
import vuetify from 'vite-plugin-vuetify';
import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n';

export default defineNuxtConfig({
  pwa: pwa,
  ssr: false,
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@vite-pwa/nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
  ],

  components: [{ path: './components', pathPrefix: false }],

  future: {
    typescriptBundlerResolution: false,
  },

  build: {
    transpile: [
      'vuetify',
      'vue-i18n',
      'jwt-decode',
      '@editorjs/editorjs',
      '@editorjs/header',
      '@editorjs/list',
      '@editorjs/cde',
      '@editorjs/paragraph',
      '@editorjs/table',
      '@editorjs/checklist',
      '@editorjs/marker',
      '@editorjs/warning',
      '@editorjs/code',
      '@editorjs/paragraph',
      '@editorjs/table',
      '@editorjs/checklist',
      '@editorjs/marker',
      '@editorjs/warning',
      '@editorjs/raw',
      '@editorjs/quote',
      '@editorjs/inline-code',
      '@editorjs/delimiter',
    ],
  },

  vite: {
    plugins: [
      VueI18nVitePlugin.vite({
        include: [path.resolve(__dirname, './i18n/**')],
      }),
    ],
  },

  nitro: {
    compressPublicAssets: true,
  },

  hooks: {
    'pages:extend'(pages) {
      const setMiddleware = (pages: NuxtPage[]) => {
        for (const page of pages) {
          if (noAuthPages.includes(String(page.name)) === false) {
            page.meta ||= {};
            page.meta.requiresAuth = true;
          }
          if (page.children) setMiddleware(page.children);
        }
      };
      setMiddleware(pages);
    },
  },
});
