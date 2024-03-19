import { createI18n } from 'vue-i18n';

import ru from '../i18n/ru.json';
import kz from '../i18n/kz.json';
import en from '../i18n/en.json';

const instance = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'ru',
  messages: {
    ru,
    kz,
    en,
  },
});

export default instance;
export const i18n = instance.global;
