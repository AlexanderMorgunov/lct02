"use client";
import React, { useEffect, useState } from "react";
import { ConfigProvider } from "antd";
import locale from "antd/locale/ru_RU";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { useThemeStore } from "@/fsd/shared/store/theme/useThemeStore";
import {
  type FormConfig,
  type ThemeConfig,
} from "antd/es/config-provider/context";
import { Theme } from "@/fsd/shared/config/theme/theme";
import { darkTheme, lightTheme } from "@/fsd/app/theme/theme";

dayjs.locale("ru");

const theme: Record<Theme, ThemeConfig> = {
  light: lightTheme,
  dark: darkTheme,
};

const formConfig: FormConfig = {
  validateMessages: {
    whitespace: "Поле не может содержать только пробелы",
  },
};

export function AntdThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const currentTheme = useThemeStore((store) => store.theme);

  // useLayoutEffect(() => {
  //   document.documentElement.setAttribute("data-theme", currentTheme);
  //   return () => {
  //     document.documentElement.removeAttribute("data-theme");
  //   };
  // }, [currentTheme]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ConfigProvider
      locale={locale}
      theme={theme[currentTheme]}
      form={formConfig}
    >
      {children}
    </ConfigProvider>
  );
}
