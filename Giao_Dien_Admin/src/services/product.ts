import { useParams } from "react-router-dom";
import api from "../config/axios";
import { FormData, IUser } from "../interface/product";

export const GetAllProducts = async ()=>{
    try {
        const {data} = await api.get("products")
        return data
    } catch (error) {
        throw new Error('Lỗi')     
    }
}
export const GetProductByID = async (id:number|string)=>{
    try {
        const {data} = await api.get(`products/${id}`)
        return data
    } catch (error) {
        throw new Error('Lỗi')       
    }
}
export const GetDetailProductByID = async (id:any)=>{
    try {
        const {data} = await api.get(`products/detail/${id}`)
        return data
    } catch (error) {
        throw new Error('Lỗi')       
    }
}

export const AddProduct = async (productData:FormData)=>{
    try {
        const {data} = await api.post(`products`,productData)
        return data
    } catch (error) {
        throw new Error('Lỗi')       
    }
}
export const AddUser = async (productData:IUser)=>{
    try {
        const {data} = await api.post(`register`,productData)
        return data
    } catch (error) {
        throw new Error('Lỗi')       
    }
}
export const LoginUser = async (productData:IUser)=>{
    try {
        const {data} = await api.post(`login`,productData)
        return data
    } catch (error) {
        throw new Error('Lỗi')       
    }
}
export const UpdateProduct = async (productData:FormData,id:number|string)=>{
    try {
        const {data} = await api.put(`products/${id}`,productData)
        return data
    } catch (error) {
        throw new Error('Lỗi')       
    }
}
export const DeleteProduct = async (id:number|string)=>{
    try {
        const {data} = await api.delete(`products/${id}`)
        return data
    } catch (error) {
        throw new Error('Lỗi')       
    }
}