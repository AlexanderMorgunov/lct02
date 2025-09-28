import { IAccident } from "@/fsd/entities/Accident/types/type";

export interface IGetAccidentsResponse {
  status: string;
  accidents: IAccident[];
}

export interface IGetAccidentsRequest {
  location_id?: string;
  status: boolean;
}
