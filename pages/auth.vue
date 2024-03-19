<template>
  <section
    class="mx-auto w-full max-w-[20%] h-full flex flex-col items-center justify-center gap-4 text-white text-center"
  >
    <h1 class="text-5xl font-black">{{ $t('PROJECTTITLE') }}</h1>
    <v-divider :thickness="2" class="w-full" />
    <GoogleSignInButton
      @success="handleLoginSuccess"
      @error="handleLoginError"
    />
  </section>
</template>

<script setup lang="ts">
import {
  GoogleSignInButton,
  type CredentialResponse,
} from 'vue3-google-signin';

// Init
useHead({
  title: () => t('ui.login'),
});

const store = useStore();

const handleLoginSuccess = (response: CredentialResponse) => {
  if (response) {
    if (response.clientId) {
      const clientId = useCookie('clientId');
      clientId.value = response.clientId;
      store.user.id = response.clientId;
    }
    if (response.credential) {
      const token = useCookie('token');
      token.value = response.credential;
      const decoded = decodeJwt(token.value);
      if (decoded) {
        store.user.name = decoded.name;
        store.user.email = decoded.email;
        store.user.picture = decoded.picture;
        store.user.given_name = decoded.given_name;
        store.user.family_name = decoded.family_name;
      }
    }
  }
  navigateTo({ name: 'notes' });
};

const handleLoginError = () => {
  console.error('Login failed');
};
</script>
