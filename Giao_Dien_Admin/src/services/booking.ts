import api from "../config/axios"
import { Ibooking, StatusBooking, StatusPayment } from "../interface/booking"
//payment
export const getallPayment = async ()=>{
    try {
        const {data} = await api.get('api/payment',{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
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
export const getbookingbyId = async (id: number|string)=>{
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

export const getallBooking = async ()=>{
    try {
        const {data} = await api.get('api/booking',{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        return data
    } catch (error) {
        throw new Error('Error')
    }
}

// export const updateServiceBooking = async (id: string | number, payload: { status: string; services: (string | number)[] })=>{
//     try {
//         const {data} = await api.put(`api/booking/${id}/update`,payload,{

//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//         })
//         return data
//     } catch (error) {
//         throw new Error('Error')
//     }
// }
//detailpayment
export const getDetailPaymentbyId = async (payment_id: number | string)=>{
    try {
        const {data} = await api.get(`api/detailspayment/${payment_id}/details`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        return data
    } catch (error) {
        throw new Error('Error')
    }
}

export const getDetailbookingbyId = async (booking_id: number | string)=>{
    try {
        const {data} = await api.get(`api/detailspayment/${booking_id}/show`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
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
  export const UpdatestatusBooking = async (id: number | string,  payload: { status: StatusBooking; services: ( number)[] }) => {
    
    try {
      const { data } = await api.put(
        `api/booking/${id}/update`,
        payload , // Body của request
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