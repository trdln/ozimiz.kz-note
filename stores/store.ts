import { ApiClass } from '~/api/api';
import { User } from '~/composables';
import {
  Toast,
  ToastTypes,
  Positions,
  ToastOptions,
} from '~/composables/toast';

export const useStore = defineStore('store', () => {
  // Init
  const api = new ApiClass();

  // User
  const user = ref<User>(new User());

  const logout = () => {
    user.value = new User();
    const token = useCookie('token');
    token.value = undefined;
    const clientId = useCookie('clientId');
    clientId.value = undefined;
  };

  // Abort controller
  const abortController = ref(new AbortController());

  const abortAllRequests = () => {
    abortController.value.abort();
    abortController.value = new AbortController();
  };

  // Notes
  const notes = ref<Array<Types.Note.Self>>([]);

  // Toaster
  const toast = Toast;
  const showToaster = (
    type: 'success' | 'error' | 'warning' | 'info',
    msg: string,
    timeout?: number,
  ) =>
    Toast.useToast()(msg, {
      ...ToastOptions,
      type: ToastTypes[type.toUpperCase() as keyof typeof ToastTypes],
      timeout:
        type === 'error'
          ? 6000
          : typeof timeout === 'number'
          ? timeout
          : ToastOptions.timeout,
    });

  return {
    // Init
    api,

    // User
    user,
    logout,

    // Notes
    notes,

    // Abort controller
    abortController,
    abortAllRequests,

    // Toaster
    toast,
    showToaster,
  };
});
