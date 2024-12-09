export interface IRoomsDetail {
    id: number;
    room_id: number ;
    hotel_id: number;
    price: number;
    price_surcharge: number;
    available: string;
    description: string;
    image: string;
    gallery_id:null;
    into_money: number;
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