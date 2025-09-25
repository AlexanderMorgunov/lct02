import { useMutation } from "@tanstack/react-query";
import { IEditUserRequestBody, IUser } from "@/fsd/shared/network/users/types";
import { AxiosError } from "axios";
import { $api } from "@/fsd/shared/network/api";

type EditUserArgs = {
  userId: number;
  body: IEditUserRequestBody;
};

export const useEditUser = () => {
  return useMutation<IUser | null, AxiosError<unknown>, EditUserArgs>({
    mutationFn: async ({ userId, body }) => $api.users.UsersEndPoint.editUser(userId, body)
  });
};