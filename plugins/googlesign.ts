import GoogleSignInPlugin from 'vue3-google-signin';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(GoogleSignInPlugin, {
    clientId:
      '984822526138-h1a8831pnl0n4htdobvkmjpm88u632lu.apps.googleusercontent.com',
  });
});
