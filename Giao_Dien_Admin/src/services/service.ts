import api from "../config/axios"
import { FormService } from "../interface/service"

export const getallService = async ()=>{
    try {
        const {data} = await api.get('api/service',{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
        })
        return data
    } catch (error) {
        throw new Error('Error fetching cities')
    }
}
export const GetServiceByIdPayment = async (id_payment: number | string) => {
    try {
        const { data } = await api.get(`api/service/${id_payment}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
        })
        return data 
    } catch (error) {
        throw new Error('Lỗi')
    }
}
export const ADDservice = async (serviceData: FormService)=>{
    try {
        const {data} = await api.post('api/service/store',serviceData,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        return data
    } catch (error) {
        throw new Error('Error adding service')
    }
}
export const UpdateService = async (serviceDataData: FormService, id: number | string) => {
    try {
        const { data } = await api.post(`api/service/update/${id}`, serviceDataData,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
        })
        return data
    } catch (error) {
        throw new Error('Lỗi')
    }
}