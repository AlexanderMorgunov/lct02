import { IIndication } from "@/fsd/entities/Indication/types/type";
import { $reqApi } from "../../axios";
import { IGetIndicationsRequest, IGetIndicationsResponse } from "../type";

export default class IndicationsEndPoint {
  static getIndications = async (
    params: IGetIndicationsRequest
  ): Promise<IIndication[] | null> => {
    const { data } = await $reqApi.get<IGetIndicationsResponse>(
      "/pipe/indications",
      {
        params: { ...params },
      }
    );
    return data.status === "ok" ? data.data.indications : null;
  };
}
