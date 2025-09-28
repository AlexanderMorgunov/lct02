import { IRegion } from "../../Regions";

export interface IDistrict {
  title: string;
  lat: number;
  long: number;
  id: number;
  created_at: string;
  updated_at: string;
}

export interface IDistrictDetail extends IDistrict {
  regions: IRegion[];
}
