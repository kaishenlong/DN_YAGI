export interface IHotel {
    id: number;
    name: string;
    city_id: number;
    address: string;
    email: string;
    phone: string;
    rating: number;
    description: string;
    map: string;
    image: string; 
    status: string;
    user_id: number;
    price?: string; // Giá gốc
    price_surcharge?: string; // Giá khuyến mãi
    created_at: string;
    updated_at: string;
}

export interface City {
    id: number;
    name: string;
    image: string | null;
    created_at: string | null;
    updated_at: string | null;
  }