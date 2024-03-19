<template>
  <div class="bg-[#ffffff60]">
    <div :id="holder"></div>
  </div>
  <v-btn
    class="mt-4 px-10"
    :text="$t('ui.save')"
    variant="tonal"
    @click="onSave"
  />
</template>

<script setup lang="ts">
import EditorJS from '@editorjs/editorjs';
import type { OutputData } from '@editorjs/editorjs';
// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import List from '@editorjs/list';
// @ts-ignore
import CodeTool from '@editorjs/code';
// @ts-ignore
import Paragraph from '@editorjs/paragraph';
// @ts-ignore
import Table from '@editorjs/table';
// @ts-ignore
import Checklist from '@editorjs/checklist';
// @ts-ignore
import Marker from '@editorjs/marker';
// @ts-ignore
import Warning from '@editorjs/warning';
// @ts-ignore
import RawTool from '@editorjs/raw';
// @ts-ignore
import Quote from '@editorjs/quote';
// @ts-ignore
import InlineCode from '@editorjs/inline-code';
// @ts-ignore
import Delimiter from '@editorjs/delimiter';

const props = defineProps({
  holder: {
    type: String,
    default: 'vue-editor-js',
    require: false,
  },
  data: {
    type: String,
    require: false,
  },
});
const emit = defineEmits(['saved']);

const state = reactive<{ editor: EditorJS | null }>({ editor: null });

const initEditor = () => {
  console.log(props.data);
  destroyEditor();
  state.editor = new EditorJS({
    holder: props.holder || 'vue-editor-js',
    tools: {
      header: {
        class: Header,
        config: {
          levels: [1, 2, 3, 4, 5, 6],
          defaultLevel: 2,
        },
      },
      list: {
        class: List,
        inlineToolbar: true,
      },
      code: {
        class: CodeTool,
      },
      paragraph: {
        class: Paragraph,
      },
      table: {
        class: Table,
        inlineToolbar: true,
        config: {
          rows: 2,
          cols: 3,
        },
      },
      checklist: {
        class: Checklist,
      },
      Marker: {
        class: Marker,
        shortcut: 'CMD+SHIFT+M',
      },
      warning: {
        class: Warning,
        inlineToolbar: true,
        shortcut: 'CMD+SHIFT+W',
        config: {
          titlePlaceholder: 'Title',
          messagePlaceholder: 'Message',
        },
      },
      raw: RawTool,
      quote: {
        class: Quote,
        inlineToolbar: true,
        shortcut: 'CMD+SHIFT+O',
        config: {
          quotePlaceholder: 'Enter a quote',
          captionPlaceholder: "Quote's author",
        },
      },
      inlineCode: {
        class: InlineCode,
        shortcut: 'CMD+SHIFT+M',
      },
      delimiter: Delimiter,
    },
    i18n: {
      messages: {
        ui: {
          blockTunes: {
            toggler: {
              'Click to tune': 'Нажмите, чтобы настроить',
              'or drag to move': 'или перетащите',
            },
          },
          inlineToolbar: {
            converter: {
              'Convert to': 'Конвертировать в',
            },
          },
          toolbar: {
            toolbox: {
              Add: 'Добавить',
            },
          },
        },
        toolNames: {
          Text: 'Параграф',
          Heading: 'Заголовок',
          List: 'Список',
          Warning: 'Примечание',
          Checklist: 'Чеклист',
          Quote: 'Цитата',
          Code: 'Код',
          Delimiter: 'Разделитель',
          'Raw HTML': 'HTML-фрагмент',
          Table: 'Таблица',
          Link: 'Ссылка',
          Marker: 'Маркер',
          Bold: 'Полужирный',
          Italic: 'Курсив',
          InlineCode: 'Моноширинный',
        },
        tools: {
          warning: {
            Title: 'Название',
            Message: 'Сообщение',
          },
          link: {
            'Add a link': 'Вставьте ссылку',
          },
          stub: {
            'The block can not be displayed correctly.':
              'Блок не может быть отображен',
          },
        },
        blockTunes: {
          delete: {
            Delete: 'Удалить',
          },
          moveUp: {
            'Move up': 'Переместить вверх',
          },
          moveDown: {
            'Move down': 'Переместить вниз',
          },
        },
      },
    },
    data: props.data ? (props.data as any) : undefined,
  });
};

const destroyEditor = () => {
  if (state.editor) {
    state.editor.destroy();
    state.editor = null;
  }
};

const onSave = async () => {
  if (state.editor) {
    const data = await state.editor.save();
    emit('saved', data);
  }
};

onMounted(() => {
  initEditor();
});
</script>

<style>
.ce-block__content {
  p,
  ce-paragraph {
    @apply tracking-wider text-[12px] text-gray-500;
  }

  h1 {
    @apply text-[32px] leading-5 font-extrabold;
  }

  h2 {
    @apply text-[24px] leading-5 font-bold;
  }

  h3 {
    @apply text-[18px] leading-5 font-bold;
  }

  h4 {
    @apply text-[16px] leading-5 font-semibold;
  }

  h5 {
    @apply text-[14px] leading-5 font-semibold;
  }

  h6 {
    @apply text-[14px] leading-5 font-semibold;
  }
}
</style>
