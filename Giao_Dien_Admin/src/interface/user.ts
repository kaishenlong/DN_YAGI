import { UserStatus } from "./userStatus";

export interface IUser {
  email: string;
  name: string; 
  token: string;
}
export interface User{
    id: number; 
    address: string | null; 
    created_at: number;
    email: string;
    email_verified_at: string | null;
    identity_card: string | null;
    name: string; 
    phone: number;
    role: string; 
    status: UserStatus;
    updated_at: number;
}
