<template>
  <header class="w-full px-8 fixed flex items-center justify-between py-3">
    <NuxtLink :to="{ name: 'index' }" class="flex gap-x-4 items-center">
      <img alt="logo" src="/logo.svg" width="60" />
      <div class="text-xl font-bold text-white">{{ $t('PROJECTTITLE') }}</div>
    </NuxtLink>
    <NuxtLink :to="{ name: 'notes' }" class="text-white">
      <div class="hover:text-blue-600 text-lg font-bold transition-all">
        {{ $t('ui.notes') }}
      </div>
    </NuxtLink>
    <NuxtLink v-if="store.user.id === null" :to="{ name: 'auth' }">
      <v-btn
        class="!bg-blue-800 flex transition-all hover:bg-blue-900 rounded-xl !font-bold text-white py-2 px-6"
      >
        {{ $t('ui.login') }}
      </v-btn>
    </NuxtLink>
    <div v-if="store.user.id !== null" class="flex gap-3">
      <v-btn
        class="!bg-blue-800 !h-auto flex justify-between items-center transition-all hover:bg-blue-900 rounded-xl !font-bold text-white"
      >
        <div class="flex justify-between items-center gap-2 py-2">
          <img
            v-if="store.user.picture"
            :src="store.user.picture"
            class="rounded-full h-8"
          />
          <span v-if="store.user.name">{{ store.user.name }}</span>
        </div>
      </v-btn>
      <v-btn
        class="text-white opacity-70 hover:opacity-95"
        icon="mdi-logout-variant"
        color="grey"
        @click="logout()"
      >
      </v-btn>
    </div>
  </header>
</template>

<script setup lang="ts">
const store = useStore();
const logout = () => {
  store.logout();
  navigateTo({ name: 'index' });
};
</script>
