export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('token');
  if (to.meta.requiresAuth === true) {
    if (token.value) {
      if (to.name === 'auth') return navigateTo({ name: 'index' });
    } else {
      return navigateTo({ name: 'auth' });
    }
  }
});
