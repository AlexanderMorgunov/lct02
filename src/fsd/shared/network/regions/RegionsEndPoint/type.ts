import { IRegion, IRegionDetail } from "@/fsd/entities/Regions/types/type";

export interface IGetRegionsResponse {
  status: string;
  data: { regions: IRegion[] };
}

export interface IGetRegionDetailResponse {
  status: string;
  data: IRegionDetail;
}
