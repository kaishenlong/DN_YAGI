export interface Iservice {
    id: number ;
    name:string;
    price:number;
    payment_id:string | number;
    hotel_id:string | number;
    created_at:string | number;
    updated_at: string | number;
}
export type FormService = Pick<Iservice, 'name' | "price">