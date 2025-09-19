"use client";

import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import { useCurrentUser } from "@/fsd/entities/Auth/api/useCurrentUser";
import { ROUTES } from "@/fsd/shared/config/routes";
import { Spin } from "antd";

export const AuthCheckProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const { data: user, isLoading } = useCurrentUser();

  useLayoutEffect(() => {
    if (user) {
      const roleRedirects: Record<string, string> = {
        admin: ROUTES.ADMIN,
        user: ROUTES.DISPATCHER,
        worker: ROUTES.WORKER,
      };

      const redirectPath = roleRedirects[user.role] ?? ROUTES.LOGIN;
      router.replace(redirectPath);
    } else {
      if (!isLoading) {
        router.replace(ROUTES.LOGIN);
      }
    }
  }, [user, router, isLoading]);

  if (isLoading) {
    return <Spin size="large" fullscreen />;
  }

  if (user && !isLoading) {
    return <>{children}</>;
  }

  return <>{children}</>;
};
