import { $reqApi } from "./axios";

export function setupAxiosInterceptors() {
  $reqApi.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error.response?.status;

      if (status === 401 || status === 403) {
        window.location.href = "/login";
      }

      return Promise.reject(error);
    }
  );
}
