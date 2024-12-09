import api from "../config/axios"

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