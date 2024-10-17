import React from "react";
import "./App.css";
import { useRoutes } from "react-router-dom";

import ProductContext from "./context/product";
import CategoryContext from "./context/category";
import Admin from "./layout/admin";
import HomeAdmin from "./admin/homeadmin";
import Addproduct from "./admin/addProduct";
import Editproduct from "./admin/editProduct";
import CategoryList from "./admin/categorylist";
import AddCategory from "./admin/addCategory";
import EditCategory from "./admin/EditCategory";
import Quanlytaikhoan from "./admin/Quanlytaikhoan";
import Reviews from "./admin/reviews";
import Bookings from "./admin/booKings";
import Productlist from "./admin/productlist";
import Dashboard from "./admin/dashboard";
function App() {
  const Route = useRoutes([
   
    {
      path: "dashboard",
      element: (
        
          <ProductContext>
            <CategoryContext>
            {/* <Privaterouterr> */}
            <Admin />
            {/* </Privaterouterr> */}
             
              </CategoryContext>
          </ProductContext>
      ),
      children: [
        {path:'', element:<HomeAdmin/>},
        { path: "list", element:  <Productlist /> },
        { path: "list/add", element: <Addproduct /> },
        { path: "list/edit/:id", element: <Editproduct /> },
        { path: "category", element: <CategoryList /> },
        { path: "category/add", element: <AddCategory /> },
        { path: "category/edit/:id", element: <EditCategory /> },
        { path: "taikhoan", element: <Quanlytaikhoan /> },
        { path: "reviews", element: <Reviews/> },
        { path: "bookings", element: <Bookings/> },
        { path: "dashboard", element: <Dashboard/> },
        
      ],
    },
  ]);
  return Route;
}

export default App;
