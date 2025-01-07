import React, { useEffect, useState } from "react";
import "./App.css";
import { Navigate, useRoutes } from "react-router-dom";
import Client from "./layout/client";
import Homepage from "./layout/homepage";
import ProductDetail from "./layout/productDetail";
import Login from "./component/Login/Login";
import Register from "./component/Register/Register";
import End from "./component/End/End";
import History from "./component/History/History";
import Category from "./static_page/Category";
import Love from "./static_page/Love";
import Introduce from "./static_page/Introduce";
import Service from "./static_page/Service";
import News from "./static_page/News";
import Contact from "./static_page/Contact";
import ErrorPage from "./component/error/errorpage";
import ResetPassword from "./component/Register/Reset";
import NewPassword from "./component/Register/Newpassword";
import TokenAndPasswordReset from "./component/Register/Newpassword";
import AccountPopup from "./component/Login/Account";
import axios from "axios";
import api from "./component/config/axios";
import { logoutUser } from "./component/api/apiuser";
import UserProfile from "./component/Login/Userprofile";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CartPage from "./component/Cart/Cart";
import CheckoutPage from "./component/Pay/Pay";
import PaymentSuccessPage from "./component/Pay/Paysuccess";
import Pay from "./component/Pay/Pay";
import RoomDetail from "./component/Detailroom/Detairoom";
import { CartProvider } from "./context/cartCT";
import { PaymentProvider } from "./context/paymentCT";
import RoomContext from "./context/roomCT";

function App() {
  // test
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    const storedUserName = localStorage.getItem("userName");

    if (token && storedUser) {
      setIsLoggedIn(true);
      setUser(storedUser);
      setUserName(storedUserName);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      setIsLoggedIn(false);
      setUserName(null);
    }
  }, []);

  const handleLogin = (name: string) => {
    setIsLoggedIn(true);
    setUserName(name);
    localStorage.setItem("userName", name);
    toast.success(`Chào mừng ${name}, bạn đã đăng nhập thành công!`);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser({ name: "", email: "", phone: "", address: "" });
      setIsLoggedIn(false);
      setUserName(null);
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      localStorage.removeItem("userName");

      toast.info("Bạn đã đăng xuất thành công.");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi đăng xuất.");
      console.error("Failed to log out:", error);
    }
  };

  const Route = useRoutes([
    {
      path: "",
      element: (
        <CartProvider>
          <PaymentProvider>
            <RoomContext>
              <Client
                isLoggedIn={isLoggedIn}
                userName={userName}
                onLogout={handleLogout}
              />
            </RoomContext>
          </PaymentProvider>
        </CartProvider>
      ),
      children: [
        { path: "", Component: Homepage },

        // { path: "hotel/:id", Component: ProductDetail },
        {
          path: "pay",
          element: <Pay />,
        },
        {
          path: "room/:id",
          element: <RoomDetail />,
        },
        {
          path: "cart",
          element: <CartPage />,
        },

        {
          path: "paysuccess",
          element: <PaymentSuccessPage />,
        },
        {
          path: "end",
          element: <End />,
        },
        {
          path: "history",
          element: <History />,
        },
        { path: "CategoryCity/:id", Component: Category },
        { path: "Favorites", Component: Love },
        { path: "About", Component: Introduce },
        { path: "Services", Component: Service },
        { path: "News", Component: News },
        { path: "Contact", Component: Contact },
        { path: "/hotel/:id", element: <ProductDetail /> },
      ],
    },
    {
      path: "login",
      element: <Login onLogin={(name) => handleLogin(name)} />,
    },

    {
      path: "userProfile",
      element: <UserProfile user={user} onLogout={handleLogout} />,
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "reset",
      element: <ResetPassword />,
    },
    {
      path: "newpassword",
      element: <TokenAndPasswordReset />,
    },
    {
      path: "*",
      element: <ErrorPage />,
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
