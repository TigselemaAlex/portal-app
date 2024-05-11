import { RoleResponse } from '../role/role-response.model';

export interface UserResponse {
  id: number;
  dni: string;
  email: string;
  names: string;
  surnames: string;
  phone: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  roles: RoleResponse[];
}
