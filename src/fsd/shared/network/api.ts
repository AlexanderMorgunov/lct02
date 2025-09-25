import Auth from "./auth/auth";
import Regions from "./regions/Regions";
import Users from "@/fsd/shared/network/users/users";

export default class Api {
  static regions = Regions;
  static auth = Auth;
  static users = Users;
}

export const $api = Api;
