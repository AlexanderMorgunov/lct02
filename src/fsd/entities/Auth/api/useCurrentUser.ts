"use client";

import { useQuery } from "@tanstack/react-query";
import { ICurrentUser } from "../types/types";
import { $api } from "@/fsd/shared/network/api";

export const useCurrentUser = () => {
  return useQuery<ICurrentUser | null>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const user = await $api.auth.AuthEndPoint.getCurrentUser();
      return user;
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
