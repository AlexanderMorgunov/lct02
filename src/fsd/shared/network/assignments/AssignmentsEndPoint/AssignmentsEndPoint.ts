import { $reqApi } from "@/fsd/shared/network/axios";
import {
  IAssignment,
  ICreateAssignmentRequestBody,
  IGetAssignmentResponse,
  IGetAssignments,
  IGetAssignmentsRequestParams,
  IGetAssignmentsResponse,
} from "@/fsd/shared/network/assignments/types";

export default class AssignmentsEndPoint {
  static getAssignments = async (
    params?: IGetAssignmentsRequestParams
  ): Promise<IGetAssignments | null> => {
    const { data } = await $reqApi.get<IGetAssignmentsResponse>(
      "/pipe/assignments",
      { params }
    );
    return data.status === "ok" ? data.data : null;
  };
  static createNewAssignment = async (
    body: ICreateAssignmentRequestBody
  ): Promise<IAssignment | null> => {
    const { data } = await $reqApi.post<IGetAssignmentResponse>(
      "/pipe/assignments",
      body
    );
    return data.status === "ok" ? data.data : null;
  };
}
