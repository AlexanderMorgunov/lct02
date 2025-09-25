import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { $api } from "@/fsd/shared/network/api";
import {ICreateUserRequestBody, IUser} from "@/fsd/shared/network/users/types";

export const useCreateUser = () => {
  return useMutation<IUser | null, AxiosError<unknown>, ICreateUserRequestBody>({
    mutationFn: async (body) => $api.users.UsersEndPoint.createUser(body)
  });
};