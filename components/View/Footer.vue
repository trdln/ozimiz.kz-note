<template>
  <footer
    class="py-2 flex items-center justify-center relative text-white opacity-60"
  >
    <div>
      <span>by @trdln</span>
    </div>
    <v-select
      class="absolute right-8 bottom-2"
      v-model="$i18n.locale"
      :items="$i18n.availableLocales"
      bg-color="#333"
      variant="outlined"
      density="compact"
    />
  </footer>
</template>

<script setup lang="ts"></script>
