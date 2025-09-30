import { IPagination } from "@/fsd/shared/network/type";

export type IAssignmentStatus = "Назначено" | "В работе" | "Выполнено";

export interface IAssignment {
  accident_id: number;
  user_id: number;
  date_at: string;
  task: string;
  id: number;
  created_at: string;
  updated_at: string;
  status: IAssignmentStatus;
  comment: string;
}

export type IGetAssignments = {
  assignments: IAssignment[];
  pagination: IPagination;
};

export interface IGetAssignmentsResponse {
  status: string;
  data: IGetAssignments;
}

export interface IGetAssignmentResponse {
  status: string;
  data: IAssignment;
}

export interface IGetAssignmentsRequestParams {
  page?: number;
  page_size?: number;
  accident_id?: number;
  user_id?: number;
  date_at?: string;
  status?: IAssignmentStatus;
}

export interface ICreateAssignmentRequestBody {
  accident_id: number;
  user_id: number;
  date_at: string;
  task: string;
}
