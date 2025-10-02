import { IAccident } from "@/fsd/entities/Accident/types/type";
import { IPagination } from "../type";

export interface IAccidentWithPagination {
  accidents: IAccident[];
  pagination: IPagination;
}

export interface IGetAccidentsResponse {
  status: string;
  data: IAccidentWithPagination;
}

export interface IGetAccidentsRequest {
  page?: number;
  page_size?: number;
  location_id?: string;
  status: boolean;
  is_task?: boolean;
}

export interface IChangeAccidentStatusRequest {
  id: number;
  status: boolean;
}

/* eslint-disable */
export interface IChangeAccidentStatusResponse
  extends Omit<IAccident, "location" | "indication"> {}
