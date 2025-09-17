export type Role = "admin" | "user" | "worker";

export interface ICurrentUser {
  id: number;
  name: string;
  role: Role;
}
