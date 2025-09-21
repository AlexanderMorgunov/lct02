"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLayoutEffect, useState} from "react";
import { ROUTES } from "@/fsd/shared/config/routes";
import { Spin } from "antd";
import { useCurrentUser } from "@/fsd/entities/Auth/api/useCurrentUser";

const roleRedirects: Record<string, string> = {
  admin: ROUTES.ADMIN,
  user: ROUTES.DISPATCHER,
  worker: ROUTES.WORKER,
};

export const RoleCheckProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCorrectedRole, setIsCorrectedRole] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { data: user, isLoading } = useCurrentUser();

  useLayoutEffect(() => {
    if (user) {
      const redirectPath = roleRedirects[user.role];
      if (!pathname.startsWith(redirectPath)) {
        router.replace(redirectPath);
      } else {
        setIsCorrectedRole(true);
      }
    }
  }, [user, router, pathname]);

  if (isLoading) return <Spin size="large" fullscreen />;

  return user && isCorrectedRole ? <>{children}</> : null;
};
