"use client";

import { ReactNode, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setupAxiosInterceptors } from "@/fsd/shared/network/interceptors";

interface Props {
  children: ReactNode;
}

const ClientProvider = ({ children }: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  const queryClient = new QueryClient();

  useEffect(() => {
    setIsMounted(true);
    // Подключаем интерцепторы один раз при маунте клиента
    setupAxiosInterceptors();
  }, []);

  return isMounted ? (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  ) : null;
};

export { ClientProvider };
