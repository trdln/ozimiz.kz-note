import { useAxiosInstance } from './axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export class ApiClass {
  private async axiosCall<T>(config: AxiosRequestConfig): Promise<T> {
    const { data } = await useAxiosInstance(
      useStore().abortController.signal,
    ).request<T>(config);
    return data;
  }

  private axiosCallWithAbort<T>(config: AxiosRequestConfig): {
    call: () => Promise<AxiosResponse<T>>;
    abortController: AbortController;
  } {
    const abortController = new AbortController();
    return {
      call: async () =>
        await useAxiosInstance(abortController.signal).request<T>(config),
      abortController: abortController,
    };
  }

  getNotes() {
    return this.axiosCallWithAbort<Types.Note.Self[]>({
      url: `/notes${useStore().user.id ? `?userId=${useStore().user.id}` : ''}`,
      // url: `/notes`,
    });
  }

  getNoteById(id: string) {
    return this.axiosCall<Types.Note.Self>({ url: `/notes/${id}` });
  }

  addNote(data: Omit<Types.Note.Self, 'id' | 'createdAt'>) {
    return this.axiosCall<Types.Note.Self>({
      url: `/notes`,
      method: 'POST',
      data,
    });
  }

  updateNote(data: Omit<Types.Note.Self, 'createdAt'>) {
    return this.axiosCall<Types.Note.Self>({
      url: `/notes/${data.id}`,
      method: 'PUT',
      data,
    });
  }

  deleteNote(id: string) {
    return this.axiosCall<void>({ url: `/notes/${id}`, method: 'DELETE' });
  }
}
