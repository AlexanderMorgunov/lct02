'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginPage } from "@/fsd/pages/LoginPage";
import { useAuthentication} from "@/fsd/shared/store/auth/authorization";

export default function Page() {
  const router = useRouter();
  const { isLoggedIn } = useAuthentication();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/');
      return;
    }
  }, [isLoggedIn]);

  return !isLoggedIn ? <LoginPage /> : null;
}
