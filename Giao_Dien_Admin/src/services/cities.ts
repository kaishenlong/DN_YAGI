// import api from "../config/axios"
// import { FormCites} from "../interface/hotel"

// export const getallCitys = async ()=>{
//     try {
//         const {data} = await api.get('api/city')
//         return data
//     } catch (error) {
//         throw new Error('Error fetching cities')
//     }
// }
// export const GetCitiesByID = async (id: number | string) => {
//     try {
//         const { data } = await api.get(`api/city/${id}`)
//         return data
//     } catch (error) {
//         throw new Error('Lỗi')
//     }
// }
// export const ADDCity = async (citiesData: FormCites)=>{
//     try {
//         const {data} = await api.post('api/city/store',citiesData)
//         return data
//     } catch (error) {
//         throw new Error('Error adding city')
//     }
// }
// export const UpdateCities = async (CitiesData: FormCites, id: number | string) => {
//     try {
//         const { data } = await api.put(`api/city/update/${id}`, CitiesData)
//         return data
//     } catch (error) {
//         throw new Error('Lỗi')
//     }
// }
// export const DeleteCities = async (id: number | string) => {
//     try {
//         const { data } = await api.delete(`api/city/delete/${id}`)
//         return data
//     } catch (error) {
//         throw new Error('Lỗi')
//     }
// }