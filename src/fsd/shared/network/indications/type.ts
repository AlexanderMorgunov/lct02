import { IIndication } from "@/fsd/entities/Indication/types/type";

export interface IGetIndicationsRequest {
  location_id: string;
  date_at?: string;
  date_end?: string;
  time_of_day?: string;
}

export interface IGetIndicationsResponse {
  status: string;
  //   data: IIndication[];
  data: {
    indications: IIndication[];
    status: string;
  };
}
