import { useMutation } from "@tanstack/react-query";
import { IUser } from "@/fsd/shared/network/users/types";
import { AxiosError } from "axios";
import { $api } from "@/fsd/shared/network/api";


export const useDeleteUser = () => {
  return useMutation<IUser | null, AxiosError<unknown>, number>({
    mutationFn: async (userId: number) => $api.users.UsersEndPoint.deleteUser(userId)
  });
}