"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
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

  useEffect(() => {
    if (user) {
      const roleRedirects: Record<string, string> = {
        admin: ROUTES.ADMIN,
        user: ROUTES.DISPATCHER,
        worker: ROUTES.WORKER,
      };

      const redirectPath = roleRedirects[user.role] ?? "/login";
      router.replace(redirectPath);
    }
  }, [user, router]);

  if (isLoading) {
    return <Spin size="large" />;
  }

  return <>{children}</>;
};
