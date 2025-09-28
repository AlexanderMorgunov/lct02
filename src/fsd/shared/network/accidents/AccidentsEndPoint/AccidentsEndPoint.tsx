import { IAccident } from "@/fsd/entities/Accident/types/type";
import { $reqApi } from "../../axios";
import { IGetAccidentsRequest, IGetAccidentsResponse } from "../type";

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
    return data.status === "ok" ? data.accidents : null;
  };
}
