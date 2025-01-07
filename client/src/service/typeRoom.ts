import api from "../config/axios"

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