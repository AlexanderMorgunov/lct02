export enum Role {
  Admin = "Администратор",
  Dispatcher = "Диспетчер",
  Emergency = "Аварийная служба",
  Superadmin = "Суперадмин",
}
export interface IUser {
  id: number;
  fullName: string;
  password: string;
  role: 0 | 1 | 2;
  login: string;
}
