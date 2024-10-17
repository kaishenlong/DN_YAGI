import React from 'react'
import { Outlet } from 'react-router-dom'
import SlideBarAdmin from '../admin/SlideBarAdmin' 


const Admin = () => {
  return (
    <>
        <SlideBarAdmin/>
        <Outlet/>
        
    </>
  )
}

export default Admin