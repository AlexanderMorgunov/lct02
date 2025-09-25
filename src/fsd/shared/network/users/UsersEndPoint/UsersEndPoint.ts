import {
  ICreateUserRequestBody, ICreateUserResponse, IEditUserRequestBody,
  IGetUsers,
  IGetUsersRequestParams,
  IGetUsersResponse, IUser
} from "@/fsd/shared/network/users/types";
import { $reqApi } from "@/fsd/shared/network/axios";

export default class UsersEndPoint {
  static getUsers = async (params?: IGetUsersRequestParams): Promise<IGetUsers | null> => {
    const { data } = await $reqApi.get<IGetUsersResponse>('/pipe/users', { params });
    return data.status === "ok" ? data.data : null;
  };

  static createUser = async (body: ICreateUserRequestBody): Promise<IUser | null> => {
    const { data } = await $reqApi.post<ICreateUserResponse>('/pipe/users', body);
    return data.status === "ok" ? data.data : null;
  };

  static deleteUser = async (userId: number): Promise<IUser | null> => {
    const { data } = await $reqApi.delete<ICreateUserResponse>(`/pipe/user/${userId}`);
    return data.status === "ok" ? data.data : null;
  };

  static editUser = async (userId: number, body: IEditUserRequestBody): Promise<IUser | null> => {
    const { data } = await $reqApi.put<ICreateUserResponse>(`/pipe/user/${userId}`, body);
    return data.status === "ok" ? data.data : null;
  }
}