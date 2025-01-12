import api from "../config/axios"
import { StatusPayment } from "../interface/booking"
//payment
export const getallPayment = async ()=>{
    try {
        const {data} = await api.get('api/payment',{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        return data
    } catch (error) {
        throw new Error('Error')
    }
}
export const getPaymentbyId = async (id: number | string)=>{
    try {
        const {data} = await api.get(`api/payment/show/${id}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        return data
    } catch (error) {
        throw new Error('Error')
    }
}
// booking
export const getbookingbyId = async (id: number | string)=>{
    try {
        const {data} = await api.get(`api/booking/${id}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        return data.data
    } catch (error) {
        throw new Error('Error')
    }
}
//detailpayment
export const getDetailPaymentbyId = async (id: number | string)=>{
    try {
        const {data} = await api.get(`api/detailspayment/${id}/details`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        })
        return data
    } catch (error) {
        throw new Error('Error')
    }
}
export const UpdatestatusPayment = async (id: number | string, status: StatusPayment) => {
    try {
      const { data } = await api.put(
        `api/payment/update/${id}`,
        { status }, // Body của request
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Lỗi cập nhật trạng thái');       
    }
  };