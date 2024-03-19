import { Note } from '#build/components';
<template>
  <aside
    class="border-[1px] !border-[#808080] rounded-xl px-8 py-6 flex justify-between text-start"
  >
    <p class="text-xl font-medium">{{ note.title }}</p>
    <!-- {{ note }} -->
    <div class="flex gap-3">
      <NuxtLink :to="{ name: 'notes-id', params: { id: note.id } }">
        <v-btn icon="mdi-book-open-blank-variant-outline" size="small" />
      </NuxtLink>
      <v-btn
        icon="mdi-window-close"
        size="small"
        class="opacity-70 hover:opacity-100"
        @click="emit('delete', note.id)"
      />
    </div>
  </aside>
</template>

<script setup lang="ts">
const props = defineProps({
  note: {
    type: Object as PropType<Types.Note.Self>,
    required: true,
  },
});
const emit = defineEmits(['delete']);
</script>
