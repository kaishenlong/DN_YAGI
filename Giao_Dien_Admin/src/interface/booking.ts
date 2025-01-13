export interface IPayment {
    id: number,
    user_id:number,
    paymen_date:number,
    firstname:string,
    lastname:string,
    phone:number,
    method:string,
    total_amount:number,
    status_payment:number,
    status:StatusPayment,
    created_at:string,
    updated_at:string,
}
export interface Ibooking{
    id: number | string,
    user_id: number,
    detail_room_id: number,
    check_in: string,
    check_out: string,
    guests: number,
    adult: number,
    children: number,
    quantity: number,
    total_price: number,
    status: StatusBooking,
    created_at: string,
    updated_at: string
}
export interface PaymentDetail{
    id:number,
    payment_id:number,
    booking_id:number,
    user_id:number,
    payment:IPayment,
    booking:Ibooking
}
export enum StatusPayment {
    PENDING = "pending",
    COMPLETE = "complete",
    FAILED = "failed"
}
export enum StatusBooking{
    PENDING = "pending",
    CHECKIN = "checkin",
    CHECKOUT = "checkout"
}