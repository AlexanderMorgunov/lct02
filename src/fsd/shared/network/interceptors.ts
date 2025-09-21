import { $reqApi } from "./axios";
import { useAuthStore } from "@/fsd/shared/store/auth/authorization";

export function setupAxiosInterceptors() {
  $reqApi.interceptors.request.use((config) => {
    const accessToken = window.localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  });

  $reqApi.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error.response?.status;

      if (status === 401 || status === 403) {
        localStorage.removeItem('accessToken');
        useAuthStore.getState().setAuthStatus(false);
      }

      return Promise.reject(error);
    }
  );
}
