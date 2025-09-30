import { IAccident } from "@/fsd/entities/Accident/types/type";
import { $reqApi } from "../../axios";
import {
  IChangeAccidentStatusRequest,
  IChangeAccidentStatusResponse,
  IGetAccidentsRequest,
  IGetAccidentsResponse,
} from "../type";

export default class AccidentsEndPoint {
  static getAccidents = async (
    props: IGetAccidentsRequest
  ): Promise<IAccident[] | null> => {
    const { data } = await $reqApi.get<IGetAccidentsResponse>(
      "/pipe/accidents",
      {
        params: { ...props },
      }
    );
    return data.status === "ok" ? data.data.accidents : null;
  };

  static changeAccidentStatus = async ({
    id,
    status,
  }: IChangeAccidentStatusRequest): Promise<IChangeAccidentStatusResponse | null> => {
    const { data } = await $reqApi.put<IChangeAccidentStatusResponse>(
      `/pipe/accident/${id}`,
      { status }
    );
    return data;
    // return data.status === "ok" ? data : null;
  };
}
