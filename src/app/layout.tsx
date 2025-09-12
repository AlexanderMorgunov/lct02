import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

const geistMono = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "lct02",
  description:
    "Рекомендательный сервис прогнозирования возникновения технологических ситуаций",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
