import { $reqApi } from "../../axios";
import { ILocation } from "@/fsd/entities/locations/types/type";
import { IGetLocationsRequest, IGetLocationsResponse } from "./type";

export default class LocationsEndPoint {
  static getObjects = async ({
    page,
    page_size,
    title,
  }: IGetLocationsRequest): Promise<ILocation[] | null> => {
    const { data } = await $reqApi.get<IGetLocationsResponse>(
      "/api/locations",
      {
        params: {
          page,
          page_size,
          title,
        },
      }
    );
    return data.status === "ok" ? data.data.locations : null;
  };
}
