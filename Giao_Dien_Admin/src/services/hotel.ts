import api from "../config/axios"
import { FormData } from "../interface/hotel"

export const getallHotels = async ()=>{
    try {
        const {data} = await api.get('api/hotel')
        return data
    } catch (error) {
        throw new Error('Error')
    }
}
export const GetHotelByID = async (id:number|string)=>{
    try {
        const {data} = await api.get(`api/hotel/${id}`)
        return data
    } catch (error) {
        throw new Error('Lỗi')       
    }
}
export const ADDHotels = async (hotelsData: FormData)=>{
    try {
        const { data } = await api.post("api/hotel", hotelsData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          return data;
        } catch (error: any) {
            console.error("Error details:", error.response ? error.response.data : error.message);
            throw new Error("Lỗi khi thêm khách sạn");
        }
}
export const DeleteHotel = async (id: number | string) => {
    try {
        const { data } = await api.delete(`api/hotel/${id}`)
        return data
    } catch (error) {
        throw new Error('Lỗi')
    }
}
export const UpdateHotel = async (hotelData:FormData,id:number|string)=>{
    try {
        const {data} = await api.put(`api/hotel/${id} `,hotelData)
        return data
    } catch (error) {
        throw new Error('Lỗi')       
    }
}