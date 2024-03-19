import i18n from '~/configs/i18n';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(i18n);
  nuxtApp.vueApp.use(useStore().toast.default, {
    transition: 'Vue-Toastification__fade',
    maxToasts: 5,
    newestOnTop: true,
  });
});
