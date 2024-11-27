import React, { useState } from "react";
import "./App.css";
import { Navigate, useRoutes } from "react-router-dom";

// import CategoryContext from "./context/category";
import Admin from "./layout/admin";
import HomeAdmin from "./admin/homeadmin";
// import Addproduct from "./admin/addProduct";
// import Editproduct from "./admin/editProduct";
// import CategoryList from "./admin/categorylist";
// import AddCategory from "./admin/addCategory";
// import EditCategory from "./admin/EditCategory";

import Hotellist from "./admin/Hotels/Hotelslist";
import AddHotels from "./admin/Hotels/addHotel";
import HotelContext from "./context/hotel";
import ReviewContext from "./context/review";
import UserContext from "./context/user";
import EditHotels from "./admin/Hotels/editHotel";
import CitiesList from "./admin/cities/citiesList";
import AddCities from "./admin/cities/addCities";
import EditHotels from "./admin/Hotels/editHotel";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const handleLogin = (role: string, name: string) => { setIsLoggedIn(true); setUserRole(role); setUserName(name); };

  const handleLogout = async () => {
    try {
      await fetch(`${api}/api/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      setIsLoggedIn(false);
      setUserRole(null);
      setUserName(null);
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };
  const Route = useRoutes([
    {
      path: "dashboard",
      element: (
        <HotelContext>
          <CitiesContext>
            <Admin />
          </CitiesContext>
        </HotelContext>
      ),
  
      children: [
        { path: "", element: <HomeAdmin userName={userName} onLogout={handleLogout}/> },
        { path: "hotels", element: <Hotellist /> },
        { path: "hotels/add", element: <AddHotels /> },
        { path: "hotels/editHotel/:id", element: <EditHotels /> },
        { path: "cities", element: <CitiesList /> },
        { path: "cities/add", element: <AddCities /> },
        // { path: "list", element: <Productlist /> },
        // { path: "list/add", element: <Addproduct /> },
        // { path: "list/edit/:id", element: <Editproduct /> },
        // { path: "category", element: <CategoryList /> },
        // { path: "category/add", element: <AddCategory /> },
        // { path: "category/edit/:id", element: <EditCategory /> },
        { path: "account", element: <Account_Management /> },
        { path: "reviews", element: <Reviews /> },
        // { path: "bookings", element: <Bookings /> },
        { path: "dashboard", element: <Dashboard /> },
        
      ],
    },
   
  ]);
  return Route;
}

export default App;
