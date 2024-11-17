// import React, { createContext, useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { FormCategory, IPCategory } from '../interface/product'
// import { addCategory, DeleteCategory, GetAllCategory, getCategoryBypr, UpdateCategory } from '../services/category'

// type Props = {
//     children: React.ReactNode
// }
// export const CategoryCT = createContext({} as any)
// const CategoryContext = ({children}: Props) => {
//     const [Categorys,setCategory] = useState<IPCategory[]>([])
//     const navigate = useNavigate()
//     useEffect(()=>{
//       (async()=>{
//           const data = await GetAllCategory()
//           setCategory(data)
//       })()
//     },[])
//     const onDelete =async (id:number|string)=>{
//       if(confirm('Bạn chắc chứ?')){
//       try {
//           const category =await DeleteCategory(id)
//           alert('Xóa thành công')
//           const newCategorys = Categorys.filter(Categorys=>Categorys.id!==id)
//           setCategory(newCategorys)
//       } catch (error) {

//       }
//     }
//     }
//     const onAdd = async (data:FormCategory)=>{
//       try {
//           const category = await addCategory(data)
//           alert('Thêm mới thành công')
//           setCategory([...Categorys,category])
//           navigate('category')
//       } catch (error) {

//       }
//     }
//     const onUpdate = async (data:FormCategory,name:number|string)=>{
//       try {
//           const resdata = await UpdateCategory(data,name)
//           alert('Cập nhật thành công')
//           const newpCategory = Categorys.map(Categorys=>(Categorys.name==name)?resdata:Categorys)
//           setCategory(newpCategory)
//           navigate('category')
//       } catch (error) {

//       }
//     }

//   return (
//     <CategoryCT.Provider value={{Categorys,onDelete,onAdd,onUpdate}}>{children}</CategoryCT.Provider>
//   )
// }

// export default CategoryContext
