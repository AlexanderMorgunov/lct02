import { IAccident } from "@/fsd/entities/Accident/types/type";

export interface IGetAccidentsResponse {
  status: string;
  data: { accidents: IAccident[] };
}

export interface IGetAccidentsRequest {
  location_id?: string;
  status: boolean;
}

export interface IChangeAccidentStatusRequest {
  id: number;
  status: boolean;
}

/* eslint-disable */
export interface IChangeAccidentStatusResponse
  extends Omit<IAccident, "location" | "indication"> {}
