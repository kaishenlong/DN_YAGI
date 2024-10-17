import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {FormData, IPCategory} from '../interface/product'
import { useParams } from 'react-router-dom'
import { GetProductByID } from '../services/product'
import { ProductCT } from '../context/product'
import api from '../config/axios'

const Editproduct = () => {
    const {onUpdate} = useContext(ProductCT)
    const [categoris,setCategory] = useState<IPCategory[]>([])
    const {register,handleSubmit,reset,formState:{errors}} = useForm<FormData>()
    const param = useParams()
    useEffect(()=>{
        (async ()=>{
            const product = await GetProductByID(param?.id as number|string)
            reset({
                name: product.name,
                image: product.image,
                price: product.price,
                category: product.category
            })
        })()
    },[])
    useEffect(()=> {
      (async() =>{
        try {
          const response = await api.get('/categorys');
          setCategory(response.data);
        } catch (error) {
          console.log(error);
          
        }
      })()
    },[])
    const onsubmit = (data:FormData)=>{
        onUpdate(data,param?.id as number|string)
    }
  return (
    <>
      <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Sửa sản phẩm</h1>
      <form onSubmit={handleSubmit(onsubmit)} className="flex gap-4 flex-col max-w-md mx-auto bg-gray-100 dark:bg-gray-700 text-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col">
          <input 
            type="text" 
            placeholder="Tên sản phẩm" 
            {...register('name', { required: true, minLength: 6 })} 
            className="border p-2 text-white whitespace-nowrap bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none  focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <span className="text-red-600 text-sm mt-1">Tên không để trống và lớn hơn 6 kí tự</span>}
        </div>
        
        <div className="flex flex-col">
          <input 
            type="text" 
            placeholder="Ảnh sản phẩm" 
            {...register('image')} 
            className="border p-2 text-white rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex flex-col">
          <input 
            type="text" 
            placeholder="Giá sản phẩm" 
            {...register('price', { required: true, minLength: 6})} 
            className="border p-2 text-white rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.price && <span className="text-red-600 text-sm mt-1">Giá là số không âm Và Dài hơn 6 kí tự</span>}
        </div>
        
        <div className="flex flex-col">
         
          <select  {...register('category', { required: true})}  className="border text-white p-2 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" >
            {
              categoris.map((category:IPCategory) =>(
                <option key={category.id} value={category.id}>{category.name}</option>
              ))
            }
          </select>
          {errors.category && <span className="text-red-600 text-sm mt-1">Danh mục không được để trống</span>}
        </div>   
        <button 
          type="submit" 
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Update
        </button>
      </form>
    </div>
    </>
  )
}

export default Editproduct