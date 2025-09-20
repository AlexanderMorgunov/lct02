'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoginPage } from "@/fsd/pages/LoginPage";
import { Spin } from "antd";
import { USER } from "@/fsd/shared/constants";
import { ROUTES } from "@/fsd/shared/config/routes";

export default function Page() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const userJSON = localStorage.getItem( USER );

    if (userJSON) {
      // если пользователь уже залогинен, редирект на /redirect
      router.replace(ROUTES.REDIRECT);
      return;
    }

    setChecking(false);
  }, [router]);

  if (checking) {
    return <Spin size="large" fullscreen />;
  }

  return <LoginPage />;
}
