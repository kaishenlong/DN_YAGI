import React, { useState, useEffect } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Admin from "./layout/admin";
import HomeAdmin from "./admin/homeadmin";
import Hotellist from "./admin/Hotels/Hotelslist";
import AddHotels from "./admin/Hotels/addHotel";
import EditHotels from "./admin/Hotels/editHotel";
import CitiesList from "./admin/cities/citiesList";
import AddCities from "./admin/cities/addCities";
import AdminLogin from "./admin/Login/AdminLogin";
import Dashboard from "./admin/dashboard";
import Account_Management from "./admin/Quanlytaikhoan";
import Reviews from "./admin/reviews";
import ProductContext from "./context/product";
import HotelContext from "./context/hotel";
import CitiesContext from "./context/cities";
import api from "./config/axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");
    const name = localStorage.getItem("userName");

    if (token && role === "admin") {
      setIsLoggedIn(true);
      setUserRole(role);
      setUserName(name);
    }
    setLoading(false); // Hoàn tất kiểm tra
  }, []);

  const handleLogin = (role: string, name: string, token: string) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUserName(name);
    localStorage.setItem("token", token);
    localStorage.setItem("userRole", role);
    localStorage.setItem("userName", name);
    toast.success(`Chào mừng ${name}, bạn đã đăng nhập thành công!`);
  };

  const handleLogout = async () => {
    try {
      await fetch(`${api}/api/logout`, {
        method: "POST",
        credentials: "include",
      });
      setIsLoggedIn(false);
      setUserRole(null);
      setUserName(null);
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userName");
      toast.info("Bạn đã đăng xuất thành công.");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi đăng xuất.");
      console.error("Failed to log out:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  const Route = useRoutes([
   
    { path: "/admin-login", element: <AdminLogin onLogin={handleLogin} /> },
    { path: "/", element: <Dashboard /> },
    {
      path: "/dashboard",
      element:
        isLoggedIn && userRole === "admin" ? (
          <ProductContext>
            <HotelContext>
              <CitiesContext>
                <Admin />
              </CitiesContext>
            </HotelContext>
          </ProductContext>
        ) : (
          <Navigate to="/admin-login" />
        ),
      children: [
        { path: "", element: <HomeAdmin userName={userName} onLogout={handleLogout} /> },
        { path: "hotels", element: <Hotellist /> },
        { path: "hotels/add", element: <AddHotels /> },
        { path: "hotels/editHotel/:id", element: <EditHotels /> },
        { path: "cities", element: <CitiesList /> },
        { path: "cities/add", element: <AddCities /> },
        { path: "account", element: <Account_Management /> },
        { path: "reviews", element: <Reviews /> },
      ],
    },
  ]);

  return  (
    <>
      {Route}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
