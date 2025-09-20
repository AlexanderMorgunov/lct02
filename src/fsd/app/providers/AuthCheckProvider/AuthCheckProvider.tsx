"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { ROUTES } from "@/fsd/shared/config/routes";
import { USER } from "@/fsd/shared/constants";
import { ICurrentUser } from "@/fsd/entities/Auth/types/types";
import { Spin } from "antd";

const roleRedirects: Record<string, string> = {
  admin: ROUTES.ADMIN,
  user: ROUTES.DISPATCHER,
  worker: ROUTES.WORKER,
};

export const AuthCheckProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useLayoutEffect(() => {
    const userJSON = localStorage.getItem(USER);
    const user: ICurrentUser | null = userJSON ? JSON.parse(userJSON) : null;

    if (!user) {
      router.replace(ROUTES.LOGIN);
      return;
    }

    const redirectPath = roleRedirects[user.role] ?? ROUTES.LOGIN;
    if (!pathname.startsWith(redirectPath)) {
      router.replace(redirectPath);
      return;
    }

    setIsAuthChecked(true);
  }, [router, pathname]);

  if (!isAuthChecked) {
    return <Spin size="large" fullscreen />;
  }

  return <>{children}</>;
};
