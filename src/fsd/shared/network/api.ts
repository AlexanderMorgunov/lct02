import Auth from "./auth/auth";
import Regions from "./regions/Regions";

export default class Api {
  static regions = Regions;
  static auth = Auth;
}

export const $api = Api;
