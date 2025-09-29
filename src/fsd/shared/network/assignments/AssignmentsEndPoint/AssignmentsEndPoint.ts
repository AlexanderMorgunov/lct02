
import { $reqApi } from "@/fsd/shared/network/axios";
import {
  IGetAssignments,
  IGetAssignmentsRequestParams,
  IGetAssignmentsResponse
} from "@/fsd/shared/network/assignments/types";

export default class AssignmentsEndPoint {
  static getAssignments = async (params?: IGetAssignmentsRequestParams): Promise<IGetAssignments | null> => {
    const { data } = await $reqApi.get<IGetAssignmentsResponse>('/pipe/assignments', { params });
    return data.status === "ok" ? data.data : null;
  };
}