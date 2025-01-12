import api from "../config/axios"

export const getallHotels = async ()=>{
    try {
        const {data} = await api.get('api/hotel',{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
        })
        console.log(data);
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
export const searchHotels = async (name: string, city_id: number | null) => {
    try {
      const queryParams = new URLSearchParams();
      if (name) queryParams.append("name", name);
      if (city_id) queryParams.append("city_id", city_id.toString());
  
      const { data } = await api.get(`api/hotel/search?${queryParams.toString()}`);
      return data;
    } catch (error) {
      throw new Error("Error fetching search results");
    }
  };
  