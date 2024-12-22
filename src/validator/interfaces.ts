import { UserType } from '../config/db.config';
export interface ValidationError {
  field: string;
  message: string;
}

export interface UserInput {
  user_id: string;
  code: string;
  email: string;
  username: string;
  type: UserType;
  password: string;
}
export interface ClientInput {
  email: string;
  name: string;
  message: string;
  services: string[];
}
