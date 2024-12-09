import api from "../config/axios"

export const getallCitys = async ()=>{
  try {
      const {data} = await api.get('api/city')
      return data
  } catch (error) {
      throw new Error('Error fetching cities')
  }
}
export const GetCitiesByID = async (id: number | string) => {
  try {
      const { data } = await api.get(`api/city/${id}`)
      return data
  } catch (error) {
      throw new Error('Lỗi')
  }
}