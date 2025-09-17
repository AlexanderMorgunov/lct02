import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../fsd/app/styles/global.css";
import "@ant-design/v5-patch-for-react-19";
import { cookies, headers } from "next/headers";
import { Theme } from "@/fsd/shared/config/theme/theme";
import { AntdThemeProvider, ClientProvider } from "@/fsd/app/providers";
import { App as AntdApp } from "antd";
import { $reqApi } from "@/fsd/shared/network/axios";

const font = Montserrat({
  subsets: ["cyrillic", "latin"],
  variable: "--montserrat-font",
  display: "swap",
});

export const metadata: Metadata = {
  title: "lct02",
  description:
    "Рекомендательный сервис прогнозирования возникновения технологических ситуаций",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value ?? Theme.DARK;

  return (
    <html lang="ru" className={`${font.variable}`} data-theme={theme}>
      <body>
        <ClientProvider>
          <AntdThemeProvider>
            <AntdApp>{children}</AntdApp>
          </AntdThemeProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
