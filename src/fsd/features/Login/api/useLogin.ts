"use client";

import { useMutation } from "@tanstack/react-query";
import { $api } from "@/fsd/shared/network/api";
import { ILoginRequestData } from "@/fsd/features/Login";
import {ICurrentUser} from "@/fsd/entities/Auth/types/types";
import { AxiosError } from "axios";
import { ROUTES } from "@/fsd/shared/config/routes";
import { useRouter } from "next/navigation";

const roleRedirects: Record<string, string> = {
  admin: ROUTES.ADMIN,
  user: ROUTES.DISPATCHER,
  worker: ROUTES.WORKER,
};

export const useLogin = () => {
  const router = useRouter();
  return useMutation<ICurrentUser | null, AxiosError, ILoginRequestData>({
    mutationFn: async (requestData) => $api.auth.AuthEndPoint.login(requestData),
    onSuccess: (data) => {
      if (data) {
        const redirectPath = roleRedirects[data.role];
        router.replace(redirectPath);
      }
    },
  });
};
