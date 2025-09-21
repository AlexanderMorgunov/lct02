"use client";

import { useMutation } from "@tanstack/react-query";
import { $api } from "@/fsd/shared/network/api";
import {ApiErrorLogin, ILoginRequestData, ILoginResponseData} from "@/fsd/features/Login";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import {useAuthentication} from "@/fsd/shared/store/auth/authorization";

export const useLogin = () => {
  const router = useRouter();
  const { login } = useAuthentication();

  return useMutation<ILoginResponseData | null, AxiosError<ApiErrorLogin>, ILoginRequestData>({
    mutationFn: async (requestData) => $api.auth.AuthEndPoint.login(requestData),
    onSuccess: async (data) => {
      if (data) {
        await login(data.access_token);
        router.replace('/');
      }
    },
  });
};
