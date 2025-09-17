import { ICurrentUser } from "@/fsd/entities/Auth/types/types";
import { $reqApi } from "../../axios";
import { IGetCurrentUserResponse } from "../type";

export default class AuthEndPoint {
  static getCurrentUser = async (): Promise<ICurrentUser | null> => {
    const { data } = await $reqApi.get<IGetCurrentUserResponse>(
      "/auth/current"
    );
    return data.status === "ok" ? data.data : null;
  };
}
