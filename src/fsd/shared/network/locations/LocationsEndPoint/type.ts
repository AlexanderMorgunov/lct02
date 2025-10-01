import { ILocation } from "@/fsd/entities/locations/types/type";
import { IPagination } from "../../type";

export interface IGetLocationsResponse {
  status: string;
  locations: ILocation[];
  data: {
    locations: ILocation[];
    pagination: IPagination;
  };
}

export interface IGetLocationResponse {
  status: string;
  data: ILocation;
}

export interface IGetLocationsRequest {
  page?: number;
  page_size?: number;
  title?: string;
}
