"use client";

import { ReactNode, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface Props {
  children: ReactNode;
}

const ClientProvider = ({ children }: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  const queryClient = new QueryClient();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  ) : null;
};

export { ClientProvider };
