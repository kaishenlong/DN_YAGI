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
  is_active:any;
  available_rooms:number;
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
  export interface Room { id: number; name: string; dates: string; guests: string; price: number; image: string; }
  export interface PaymentContextProps { bookedRooms: Room[]; totalPrice: number; addRoom: (room: Room) => void;}