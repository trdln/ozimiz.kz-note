<template>
  <section
    v-if="note"
    class="relative h-full flex flex-col gap-6 items-center text-white text-center"
  >
    <NuxtLink :to="{ name: 'notes' }" class="absolute left-[20%]">
      <v-btn icon="mdi-arrow-left" size="small" />
    </NuxtLink>
    <div class="w-[50%]">
      <v-text-field
        v-model="note.title"
        variant="underlined"
        class="w-full"
        :label="$t('toolNames.Heading')"
        :rules="[(v) => !!v || $t('errors.fillInput')]"
      />
      <div>
        <Editor
          v-if="noteId !== null && !!note && !loading"
          @saved="onSave"
          :data="note.content"
        />
        <Editor v-if="noteId === null" @saved="onSave" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const store = useStore();
const route = useRoute();
const router = useRouter();

const note = ref<Types.Note.Self>({
  id: '',
  title: '',
  content: '',
  userId: '',
  createdAt: '',
});
const noteId = computed(() =>
  String(route.params.id) === 'new' ? null : String(route.params.id),
);
const loading = ref<boolean>(false);
const vForm = ref<any>();

const onInit = async () => {
  try {
    if (noteId.value) {
      loading.value = true;
      const data = await store.api.getNoteById(noteId.value);
      if (data) {
        note.value.id = data.id;
        note.value.title = data.title;
        note.value.userId = data.userId;
        if (data.content) note.value.content = data.content;
      }
      loading.value = false;
    }
  } catch (err) {
    console.log(err);
  }
};

const onSave = async (data: any) => {
  if (note.value) {
    if (!note.value.title) {
      note.value.title = '';
      store.showToaster('error', t('errors.fillInput'));
      return;
    }
    note.value.content = data;
    if (noteId.value) {
      await store.api.updateNote({
        id: note.value.id,
        title: note.value.title,
        content: note.value.content,
        userId: store.user.id!,
      });
      store.showToaster('success', t('toaster.success'));
    } else {
      const newNote = await store.api.addNote({
        title: note.value.title,
        content: note.value.content,
        userId: store.user.id!,
      });
      store.showToaster('success', t('toaster.success'));
      if (newNote) router.replace({ params: { id: newNote.id } });
    }
  } else {
    store.showToaster('error', t('error.unknown'));
  }
};

onMounted(async () => {
  await onInit();
});
</script>
