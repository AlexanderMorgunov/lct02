import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface IAuthentication {
  auth: boolean;
  setAuthStatus: (value: boolean) => void;
}

const useAuthStore = create<IAuthentication>()(
  immer((setState) => ({
    auth:
      typeof window !== 'undefined'
        ? !!localStorage.getItem('accessToken')
        : false,
    setAuthStatus: (value) =>
      setState((store) => {
        store.auth = value;
      }),
  })),
);

const useAuthentication = () => {
  const setAuthStatus = useAuthStore((store) => store.setAuthStatus);
  const authStatus = useAuthStore((store) => store.auth);

  const login = async (
    accessToken: string,
  ) => {
    localStorage.setItem('accessToken', accessToken);
    setAuthStatus(true);
  };
  const logout = async () => {
    localStorage.removeItem('accessToken');
    setAuthStatus(false);
  };

  return {
    isLoggedIn: authStatus,
    logout,
    login,
  };
};

export { useAuthStore, useAuthentication };