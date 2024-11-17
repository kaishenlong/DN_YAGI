export interface IRoomsDetail {
  id: number;
  room_id: number;
  hotel_id: number;
  price: number;
  price_surcharge: number;
  available: string;
  description: string;
  image: string;
  gallery_id: number;
  into_money: any;
  created_at: string;
  updated_at: string;
}
export interface Igalleries {
  id: number;
  detail_room_id: number;
  image: string;
  created_at: string;
  updated_at: string;
}
export interface IType_Room {
  id: number;
  type_room: string;
  bed: number;
  created_at: string;
  updated_at: string;
}
export type FormTypeRoom = Pick<IType_Room, 'type_room' | 'bed'>