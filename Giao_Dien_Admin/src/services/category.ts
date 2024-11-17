// import api from "../config/axios";
// import { FormCategory } from "../interface/product";

// export const GetAllCategory = async () => {
//     try {
//         const { data } = await api.get("categorys")
//         return data
//     } catch (error) {
//         throw new Error('Lỗi')
//     }
// }
// export const GetCategoryByID = async (id: number | string) => {
//     try {
//         const { data } = await api.get(`categorys/${id}`)
//         return data
//     } catch (error) {
//         throw new Error('Lỗi')
//     }
// }
// export const addCategory = async (CategoryData: FormCategory) => {
//     try {
//         const { data } = await api.post(`categorys`, CategoryData)
//         return data
//     } catch (error) {
//         throw new Error('Lỗi')
//     }
// }
// export const UpdateCategory = async (productData: FormCategory, id: number | string) => {
//     try {
//         const { data } = await api.put(`categorys/${id}`, productData)
//         return data
//     } catch (error) {
//         throw new Error('Lỗi')
//     }
// }
// export const DeleteCategory = async (id: number | string) => {
//     try {
//         const { data } = await api.delete(`categorys/${id}`)
//         return data
//     } catch (error) {
//         throw new Error('Lỗi')
//     }
// }
// export const getCategoryBypr = async (id: number | string) => {
//     try {
//         const { data } = await api.get(`products?category=${id}`)
//         return data
//     } catch (error) {
//         throw new Error('Lỗi')
//     }
// }