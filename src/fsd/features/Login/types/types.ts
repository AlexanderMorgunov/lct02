export interface ILoginRequestData {
  login: string;
  password: string;
}

export interface ApiErrorLogin {
  status?: string;
  message?: string;
  data?: string;
}