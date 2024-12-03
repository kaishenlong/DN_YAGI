import api from "../config/axios"
import { FormRoom } from "../interface/rooms"

export const getallRoom = async ()=>{
    try {
        const {data} = await api.get('api/room/rooms')
        return data
    } catch (error) {
        throw new Error('Error fetching cities')
    }
}
export const getRoomById = async (id: string | number) => {
    try {
      const { data } = await api.get(`/api/room/rooms/${id}`);
      return data.data;
    } catch (error) {
      throw new Error("Không thể lấy dữ liệu phòng.");
    }
  };
  
export const addRoom = async (RoomData: FormRoom)=>{
    try {
        const {data} = await api.post('api/room/rooms',RoomData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
    })
        return data;
    } catch (error) {
        throw new Error('Error adding city')
    }
}
export const deleteRoom = async (id: number | string) => {
    try {
        const { data } = await api.delete(`api/room/rooms/${id}`)
        return data
    } catch (error) {
        throw new Error('Lỗi')
    }
}
export const UpdateRoom = async (RoomData:FormRoom,id:number|string)=>{
    try {
        const {data} = await api.put(`api/room/rooms/${id} `,RoomData,{
            headers: {
              "Content-Type": "multipart/form-data",
            },
    })
        return data
    } catch (error) {
        throw new Error('Lỗi')       
    }
}