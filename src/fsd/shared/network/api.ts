import Auth from "./auth/auth";
import Districts from "./districts/Districts";
import LocationsEndPoint from "./locations/LocationsEndPoint/LocationsEndPoint";
import Regions from "./regions/Regions";
import Users from "@/fsd/shared/network/users/users";

export default class Api {
  static regions = Regions;
  static auth = Auth;
  static locations = LocationsEndPoint;
  static districts = Districts;
  static users = Users;
}

export const $api = Api;
