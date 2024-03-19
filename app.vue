<template>
  <v-app>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </v-app>
</template>

<script setup lang="ts">
// Init
useHead({
  titleTemplate: (title) => {
    return title ? `Ozimiz | ${title}` : 'Ozimiz';
  },
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&display=swap',
    },
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/@mdi/font@7.4.47/css/materialdesignicons.min.css',
    },
  ],
});

const store = useStore();

// Get user data on update
const onCreated = () => {
  const token = useCookie('token');
  const clientId = useCookie('clientId');
  if (store.user.id === null && clientId.value) store.user.id = clientId.value;
  if (token.value) {
    const decoded = decodeJwt(token.value);
    if (decoded) {
      store.user.name = decoded.name;
      store.user.email = decoded.email;
      store.user.picture = decoded.picture;
      store.user.given_name = decoded.given_name;
      store.user.family_name = decoded.family_name;
    }
  }
};
onCreated();
</script>

<style>
* {
  font-family: 'Montserrat';
}
</style>
