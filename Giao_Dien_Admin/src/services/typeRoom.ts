import api from "../config/axios"
import { FormTypeRoom } from "../interface/rooms"

export const getallTypeRoom = async ()=>{
    try {
        const {data} = await api.get('api/room-type')
        return data
    } catch (error) {
        throw new Error('Error fetching cities')
    }
}
export const GetTypeRoomByID = async (id: number | string) => {
    try {
        const { data } = await api.get(`api/room-type/rooms/${id}`)
        return data
    } catch (error) {
        throw new Error('Lỗi')
    }
}
export const ADDTypeR = async (TypeRData: FormTypeRoom)=>{
    try {
        const {data} = await api.post('api/room-type/store',TypeRData)
        return data
    } catch (error) {
        throw new Error('Error adding city')
    }
}
export const DeleteTypeR = async (id: number | string) => {
    try {
        const { data } = await api.delete(`api/room-type/delete/${id}`)
        return data
    } catch (error) {
        throw new Error('Lỗi')
    }
}