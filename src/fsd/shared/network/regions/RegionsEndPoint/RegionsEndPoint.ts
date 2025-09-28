import { IRegion, IRegionDetail } from "@/fsd/entities/Regions/types/type";
import { $reqApi } from "../../axios";
import { IGetRegionDetailResponse, IGetRegionsResponse } from "./type";

export default class RegionsEndPoint {
  static getRegions = async (): Promise<IRegion[] | null> => {
    const { data } = await $reqApi.get<IGetRegionsResponse>("/pipe/regions");
    return data.status === "ok" ? data.data.regions : null;
  };
  static getRegion = async (id: number): Promise<IRegionDetail | null> => {
    const { data } = await $reqApi.get<IGetRegionDetailResponse>(
      `/pipe/region/${id}`
    );
    return data.status === "ok" ? data.data : null;
  };
}
