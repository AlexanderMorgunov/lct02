
import { $reqApi } from "@/fsd/shared/network/axios";
import {
  IAssignment,
  IGetAssignments,
  IGetAssignmentsRequestParams,
  IGetAssignmentsResponse, IUpdateAssignmentRequestBody, IUpdateAssignmentResponse
} from "@/fsd/shared/network/assignments/types";

export default class AssignmentsEndPoint {
  static getAssignments = async (params?: IGetAssignmentsRequestParams): Promise<IGetAssignments | null> => {
    const { data } = await $reqApi.get<IGetAssignmentsResponse>('/pipe/assignments', { params });
    return data.status === "ok" ? data.data : null;
  };
  static updateAssignment = async (id: number, body: IUpdateAssignmentRequestBody): Promise<IAssignment | null> => {
    const { data } = await $reqApi.put<IUpdateAssignmentResponse>(`/pipe/assignment/${id}`, body);
    return data.status === "ok" ? data.data : null;
  }
}