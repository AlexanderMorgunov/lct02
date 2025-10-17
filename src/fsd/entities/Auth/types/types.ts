export type Role = "admin" | "user" | "worker" | 'superadmin';

export interface ICurrentUser {
  id: number;
  name: string;
  role: Role;
}
