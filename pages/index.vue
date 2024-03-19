<template>
  <!-- <div>Index page</div>
  <NuxtLink :to="{ name: 'account' }">To account</NuxtLink>
  <button class="h-20 w-40 bg-black text-white" @click="abortRequests()">
    Abort
  </button>
  <button class="h-20 w-40 bg-black text-white" @click="getNotes()">
    Get notes
  </button> -->
  <section
    class="w-full h-full flex flex-col gap-6 items-center justify-center text-white text-center"
  >
    <h1 class="text-8xl font-black">Ozimiz</h1>
    <h3 class="text-lg font-medium">
      {{ $t('project.subtitle') }}
    </h3>
  </section>
</template>

<script setup lang="ts">
// Init
useHead({
  title: null,
});
</script>
