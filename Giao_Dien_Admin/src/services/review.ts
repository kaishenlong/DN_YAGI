
import api from "../config/axios";
import { IUser } from "../interface/user";

export const GetAllReview = async ()=>{
    try {
        const {data} = await api.get("/api/reviews");
        return data;
    } catch (error) {
        throw new Error('Lỗi')     
    }
}

export const GetReviewByID = async (id:number|string)=>{
    try {
        const {data} = await api.get(`/api/reviews/${id}`)
        return data
    } catch (error) {
        throw new Error('Lỗi')       
    }
}


export const UpdateUser = async (UserData:FormData,id:number|string)=>{
    try {
        const {data} = await api.put(`/api/reviews/${id}`,UserData)
        return data
    } catch (error) {
        throw new Error('Lỗi')       
    }
}