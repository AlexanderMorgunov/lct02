"use client";

import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import { ROUTES } from "@/fsd/shared/config/routes";
import { useAuthentication } from "@/fsd/shared/store/auth/authorization";
import { Spin } from "antd";

export const AuthCheckProvider = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuthentication();
  const router = useRouter();

  useLayoutEffect(() => {
    if (!isLoggedIn) {
      router.replace(ROUTES.LOGIN);
    }
  }, [isLoggedIn, router]);

  return isLoggedIn ? <>{children}</> : <Spin size="large" fullscreen />;
};
