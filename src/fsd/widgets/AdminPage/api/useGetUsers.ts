import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { $api } from "@/fsd/shared/network/api";
import { IGetUsers, IGetUsersRequestParams } from "@/fsd/shared/network/users/types";


export const useGetUsers = (qKeys: unknown[], params?: IGetUsersRequestParams) => {
  return useQuery<IGetUsers | null>({
    queryKey: qKeys,
    queryFn: async () => {
      return await $api.users.UsersEndPoint.getUsers(params);
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData
  });
}