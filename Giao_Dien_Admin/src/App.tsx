import React, { useState, useEffect } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Admin from "./layout/admin";
import HomeAdmin from "./admin/homeadmin";
import Hotellist from "./admin/Hotels/Hotelslist";
import AddHotels from "./admin/Hotels/addHotel";
import EditHotels from "./admin/Hotels/editHotel";
import CitiesList from "./admin/cities/citiesList";
import AddCities from "./admin/cities/addCities";
import TypeRoomList from "./admin/typeRooms/typeRoomsList";
import AddTypeRoom from "./admin/typeRooms/addTypeR";
import Roomlist from "./admin/Rooms/roomsList";
import AddRooms from "./admin/Rooms/addRoom";
import AdminLogin from "./admin/Login/AdminLogin";
import Dashboard from "./admin/dashboard";
import AccountManagement from "./admin/Quanlytaikhoan";
import Reviews from "./admin/reviews";
import HotelContext from "./context/hotel";
import CitiesContext from "./context/cities";
import TypeRoomContext from "./context/typeRoom";
import RoomContext from "./context/room";
import api from "./config/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateRooms from "./admin/Rooms/editRoom";
import UserContext from "./context/user";
import ReviewContext from "./context/review";
import CreateLocationForm from "./admin/Hotels/addtest";
import AuditList from "./admin/AuditList";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");
    const name = localStorage.getItem("userName");

    if (token && role) {
      setIsLoggedIn(true);
      setUserRole(role);
      setUserName(name);
    }
    setLoading(false);
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
    { path: "/", element: <Navigate to="/dashboard" /> },
    {
      path: "/dashboard",
      element:
        isLoggedIn && (userRole === "business" || userRole === "admin") ? (
          <HotelContext>
            <CitiesContext>
              <TypeRoomContext>
                <RoomContext>
                  <UserContext>
                    <ReviewContext>
                      <Admin />
                    </ReviewContext>
                  </UserContext>
                </RoomContext>
              </TypeRoomContext>
            </CitiesContext>
          </HotelContext>
        ) : (
          <Navigate to="/admin-login" />
        ),
      children: [
        {
          path: "",
          element: <HomeAdmin userName={userName} onLogout={handleLogout} />,
        },
        {
          path: "hotels",
          element:
            (isLoggedIn && userRole === "admin") || userRole === "business" ? (
              <Hotellist />
            ) : (
              <Navigate to="/admin-login" />
            ),
        },
        {
          path: "hotels/add",
          element:
            (isLoggedIn && userRole === "admin") || userRole === "business" ? (
              <AddHotels />
            ) : (
              <Navigate to="/admin-login" />
            ),
        },
        {
          path: "hotels/addtest",
          element:
            (isLoggedIn && userRole === "admin") || userRole === "business" ? (
              <CreateLocationForm />
            ) : (
              <Navigate to="/admin-login" />
            ),
        },
        {
          path: "hotels/editHotel/:id",
          element:
            (isLoggedIn && userRole === "admin") || userRole === "business" ? (
              <EditHotels />
            ) : (
              <Navigate to="/admin-login" />
            ),
        },
        {
          path: "cities",
          element:
            (isLoggedIn && userRole === "admin") || userRole === "city" ? (
              <CitiesList />
            ) : (
              <Navigate to="/admin-login" />
            ),
        },
        {
          path: "cities/add",
          element:
            (isLoggedIn && userRole === "admin") || userRole === "city" ? (
              <AddCities />
            ) : (
              <Navigate to="/admin-login" />
            ),
        },
        {
          path: "rooms",
          element:
            (isLoggedIn && userRole === "admin") || userRole === "business" ? (
              <Roomlist />
            ) : (
              <Navigate to="/admin-login" />
            ),
        },
        {
          path: "rooms/addRoom",
          element:
            (isLoggedIn && userRole === "admin") || userRole === "business" ? (
              <AddRooms />
            ) : (
              <Navigate to="/admin-login" />
            ),
        },
        {
          path: "rooms/editRoom/:id",
          element:
            (isLoggedIn && userRole === "admin") || userRole === "business" ? (
              <UpdateRooms />
            ) : (
              <Navigate to="/admin-login" />
            ),
        },
        {
          path: "rooms/typeroom",
          element:
            (isLoggedIn && userRole === "admin") || userRole === "typeroom" ? (
              <TypeRoomList />
            ) : (
              <Navigate to="/admin-login" />
            ),
        },
        {
          path: "rooms/typeroom/addtype",
          element:
            (isLoggedIn && userRole === "admin") || userRole === "typeroom" ? (
              <AddTypeRoom />
            ) : (
              <Navigate to="/admin-login" />
            ),
        },
        { path: "account", element: <AccountManagement /> },
        { path: "audit", element: <AuditList /> },
        { path: "reviews", element: <Reviews /> },
      ],
    },
  ]);

  return (
    <>
      {Route}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
