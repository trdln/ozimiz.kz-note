<template>
  <section
    class="h-full flex flex-col gap-6 items-center text-white text-center"
  >
    <h3 class="text-3xl font-medium">
      {{ $t('ui.myNotes') }}
    </h3>
    <div class="w-[30%]">
      <aside
        class="border-[1px] !border-[#808080] rounded-xl px-8 py-6 flex justify-between text-start mb-4"
      >
        <p class="text-xl font-medium">{{ $t('ui.createNote') }}</p>
        <NuxtLink :to="{ name: 'notes-id', params: { id: 'new' } }">
          <v-btn icon="mdi-plus" size="small" />
        </NuxtLink>
      </aside>
      <div
        v-for="(note, index) of store.notes"
        :key="index"
        class="flex flex-col mb-4"
      >
        <Note :note="note" @delete="onDelete" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Init
useHead({
  title: () => t('ui.notes'),
});

const store = useStore();

// Notes
const { call: getNotesCall, abortController } = store.api.getNotes();

const abortRequests = () => {
  abortController.abort();
  store.abortAllRequests();
};

const getNotes = async () => {
  try {
    const { data: notes } = await getNotesCall();
    if (Array.isArray(notes)) {
      store.notes = notes;
    }
  } catch (err) {
    console.log(err);
  }
};

const onDelete = async (noteId: string) => {
  console.log(noteId);
  try {
    await store.api.deleteNote(noteId);
    await getNotes();
  } catch (err) {
    console.log(err);
  }
};

// Hooks
onMounted(async () => {
  await getNotes();
});
onBeforeUnmount(() => abortRequests);
</script>
