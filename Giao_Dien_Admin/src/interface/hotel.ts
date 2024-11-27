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
    created_at: string;
    updated_at: string;
}

export interface ICities {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export type FormData = Pick<IHotel, 'name' | 'address' | 'email' | 'phone' | 'image' | 'description' | 'map' | 'status' | 'city_id' | 'user_id' | 'rating'>;

export type FormCites = Pick<ICities, 'name'>;
