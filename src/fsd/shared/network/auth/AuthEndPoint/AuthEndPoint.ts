import { ICurrentUser } from "@/fsd/entities/Auth/types/types";
import { $reqApi } from "../../axios";
import { IGetCurrentUserResponse } from "../type";
import { cache } from "react";

export default class AuthEndPoint {
  static getCurrentUser = cache(async (): Promise<ICurrentUser | null> => {
    const { data } = await $reqApi.get<IGetCurrentUserResponse>(
      "/auth/current"
    );
    return data.status === "ok" ? data.data : null;
  });
}
