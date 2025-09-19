import { IRegion } from "@/fsd/entities/Regions/types/type";
import { $reqApi } from "../../axios";
import { IGetRegionsResponse } from "./type";

export default class RegionsEndPoint {
  static getRegions = async (): Promise<IRegion[] | null> => {
    const { data } = await $reqApi.get<IGetRegionsResponse>("/api/regions");
    return data.status === "ok" ? data.data.regions : null;
  };
}
