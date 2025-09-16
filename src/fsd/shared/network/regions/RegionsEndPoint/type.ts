import { IRegion } from "@/fsd/entities/Regions/types/type";

export interface IGetRegionsResponse {
  status: string;
  data: { regions: IRegion[] };
}
