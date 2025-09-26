import { ICurrentUser } from "@/fsd/entities/Auth/types/types";
import { $reqApi } from "../../axios";
import { IGetCurrentUserResponse } from "../type";
import {
  ILoginRequestData,
  ILoginResponse,
  ILoginResponseData,
} from "@/fsd/features/Login";
import { AxiosResponse } from "axios";
import { cache } from "react";

export default class AuthEndPoint {
  static getCurrentUser = cache(async (): Promise<ICurrentUser | null> => {
    const { data } = await $reqApi.get<IGetCurrentUserResponse>(
      "/pipe/auth/current"
    );
    return data.status === "ok" ? data.data : null;
  });

  static login = async (
    requestData: ILoginRequestData
  ): Promise<ILoginResponseData | null> => {
    const { data } = await $reqApi.post<
      ILoginResponse,
      AxiosResponse<ILoginResponse>,
      ILoginRequestData
    >("/pipe/auth/login", requestData);
    return data.status === "ok" ? data.data : null;
  };
}
