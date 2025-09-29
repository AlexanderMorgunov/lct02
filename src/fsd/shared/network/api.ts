import Accidents from "./accidents/Accidents";
import Auth from "./auth/auth";
import Districts from "./districts/Districts";
import Indications from "./indications/indications";
import LocationsEndPoint from "./locations/LocationsEndPoint/LocationsEndPoint";
import Regions from "./regions/Regions";
import Users from "@/fsd/shared/network/users/users";
import Assignments from "@/fsd/shared/network/assignments/assignments";

export default class Api {
  static regions = Regions;
  static auth = Auth;
  static locations = LocationsEndPoint;
  static districts = Districts;
  static users = Users;
  static indications = Indications;
  static accidents = Accidents;
  static assignments = Assignments;
}

export const $api = Api;
