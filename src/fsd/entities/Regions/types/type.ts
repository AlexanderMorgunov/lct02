import { ILocation } from "../../locations/types/type";

export interface IRegion {
  title: string;
  lat: number;
  long: number;
  district_id: number;
  id: number;
}

export interface IRegionDetail extends IRegion {
  locations: ILocation[];
}
