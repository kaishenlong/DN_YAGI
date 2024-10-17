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
export interface IUser{
  id?: number|string;
  name?: string;
  email: string;
  password: string;
}
export type FormData = Pick<IProduct, 'name' | 'image' | 'price' | 'category'| 'mota'>
export type FormCategory = Pick<IPCategory, 'name'| 'image' >