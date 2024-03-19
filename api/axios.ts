import axios from 'axios';

export const useAxiosInstance = (signal: AbortSignal) => {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    signal: signal,
  });
  return axiosInstance;
};
