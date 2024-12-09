import api from "../component/config/axios";

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