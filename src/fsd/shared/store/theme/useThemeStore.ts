"use client";

import { create } from "zustand";
import { Theme } from "../../config/theme/theme";

// утилита для чтения куки
const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null; // SSR-safe
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
};

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
}

export const useThemeStore = create<ThemeState>((set) => {
  // читаем тему из куки при создании стора
  const cookieTheme = getCookie("theme") as Theme | null;
  const initialTheme = cookieTheme || Theme.DARK;

  return {
    theme: initialTheme,
    setTheme: (t: Theme) => {
      set({ theme: t });
      document.cookie = `theme=${t}; path=/; max-age=31536000`;
    },
    toggleTheme: () => {
      set((state) => {
        const newTheme = state.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
        document.cookie = `theme=${newTheme}; path=/; max-age=31536000`;
        document.documentElement.setAttribute("data-theme", newTheme);
        return { theme: newTheme };
      });
    },
  };
});
