export type TUserRole = 'admin' | 'user' | 'worker' | 'superadmin';

export interface IUser {
  name: string;
  login: string;
  password: string;
  role: TUserRole;
  id: number;
  created_at: string;
  updated_at: string;
}

export interface IPagination {
  page: number;
  page_size: number;
  count: number;
}

export type IGetUsers = {
  users: IUser[];
  pagination: IPagination;
}

export interface IGetUsersResponse {
  status: string;
  data: IGetUsers;
}

export interface IGetUsersRequestParams {
  page?: number;
  page_size?: number;
  role?: TUserRole | '';
  role_sort?: boolean;
  login?: string;
  login_sort?: boolean;
  name?: string;
  name_sort?: boolean;
}

export interface ICreateUserRequestBody {
  name: string;
  login: string;
  password: string;
  role: TUserRole;
}

export interface ICreateUserResponse {
  status: string;
  data: IUser;
}

export interface IEditUserRequestBody extends Omit<ICreateUserRequestBody, 'password'> {
  password?: string;
}