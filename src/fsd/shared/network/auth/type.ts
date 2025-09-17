import { ICurrentUser } from "@/fsd/entities/Auth/types/types";

export interface IGetCurrentUserResponse {
  status: string;
  data: ICurrentUser;
}
