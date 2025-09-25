export interface Iindication {
  location_id: number;
  date_at: string;
  time_of_day: number;
  hot_water_in: number;
  hot_water_out: number;
  hot_consumption: number;
  temp_hot_water_in: number;
  temp_hot_water_out: number;
  cold_water_in: number;
  cold_consumption: number;
  id: number;
  created_at: string;
  updated_at: string;
  ratio: number;
  status: boolean;
}

export interface IGetIndicationResponse {
  indications: Iindication[];
}
