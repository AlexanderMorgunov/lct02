import { IIndication } from "../../Indication/types/type";
import { ILocation } from "../../locations/types/type";

export interface IAccident {
  location_id: string;
  indication_id: number;
  title: string;
  ratio: number;
  status: boolean;
  id: number;
  created_at: string;
  updated_at: string;
  location: ILocation;
  indication: IIndication;
}
