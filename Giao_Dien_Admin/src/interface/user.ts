export interface IUser {
  user: {
    id: number; 
    address: string | null; created_at: string;
    email: string;
    email_verified_at: string | null;
    identity_card: string | null;
    name: string; phone: string | null;
    role: string; status: string;
    updated_at: string;
  };
  token: string;
}
