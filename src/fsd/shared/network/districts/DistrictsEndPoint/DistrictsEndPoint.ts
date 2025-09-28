import { $reqApi } from "../../axios";
import {
  IGetDistrictDetailResponse,
  IGetDistrictsRequest,
  IGetDistrictsResponse,
} from "./type";
import { IDistrict, IDistrictDetail } from "@/fsd/entities/District/types/type";

export default class DistrictsEndPoint {
  static getDistricts = async ({
    page,
    page_size,
    title,
  }: IGetDistrictsRequest): Promise<IDistrict[] | null> => {
    const { data } = await $reqApi.get<IGetDistrictsResponse>(
      "/pipe/districts",
      {
        params: {
          page,
          page_size,
          title,
        },
      }
    );
    return data.status === "ok" ? data.data.districts : null;
  };

  static getDistrictDetail = async (
    id: number
  ): Promise<IDistrictDetail | null> => {
    const { data } = await $reqApi.get<IGetDistrictDetailResponse>(
      `/pipe/district/${id}`
    );
    return data.status === "ok" ? data.data : null;
  };
}
