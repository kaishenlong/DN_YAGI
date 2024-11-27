export interface IProduct {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
  mota: string;
  isReviewed: boolean;
}
export interface IPCategory {
  id: number;
  image: string;
  name: string;
}
export interface IUser {
  user: {
    address: string | null; created_at: string;
    email: string;
    email_verified_at: string | null;
    id: number; identity_card: string | null;
    name: string; phone: string | null;
    role: string; status: string;
    updated_at: string;
  };
  token: string;
}
export type FormData = Pick<IProduct, 'name' | 'image' | 'price' | 'category' | 'mota'>
export type FormCategory = Pick<IPCategory, 'name' | 'image'>