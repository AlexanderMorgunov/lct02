import { IDistrict, IDistrictDetail } from "@/fsd/entities/District/types/type";
import { IPagination } from "../../type";

export interface IGetDistrictsRequest {
  page?: number;
  page_size?: number;
  title?: string;
}

export interface IGetDistrictsResponse {
  status: string;
  data: {
    districts: IDistrict[];
    pagination: IPagination;
  };
}

export interface IGetDistrictDetailResponse {
  status: string;
  data: IDistrictDetail;
}
