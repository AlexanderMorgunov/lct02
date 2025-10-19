export interface ILoginResponseData {
  access_token: string;
}

export interface ILoginResponse {
  status: string;
  data: ILoginResponseData;
}

export interface ILoginRequestData {
  login: string;
  password: string;
}

export interface ApiErrorLogin {
  status?: string;
  message?: string;
  data?: string;
}