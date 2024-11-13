import React from "react";
import "./App.css";
import { useRoutes } from "react-router-dom";
import Client from "./layout/client";
import Homepage from "./layout/homepage";
import ProductDetail from "./layout/productDetail";
import Login from "./component/Login/Login";
import Register from "./component/Register/Register";
import Pay from "./component/Pay/Pay";
import Detailpay from "./component/Detailpay/Detailpay";
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

function App() {
  // test
  const Route = useRoutes([
    {
      path: "",
      Component: Client,
      children: [
        { path: "", Component: Homepage },
        { path: "products", Component: ProductDetail },
        {
          path: "pay",
          element: <Pay />,
        },
        {
          path: "detailpay",
          element: <Detailpay />,
        },
        {
          path: "end",
          element: <End />,
        },
        {
          path: "history",
          element: <History />,
        },
        { path: "Category", Component: Category },
        { path: "Favorites", Component: Love },
        { path: "About", Component: Introduce },
        { path: "Services", Component: Service },
        { path: "News", Component: News },
        { path: "Contact", Component: Contact },
      ],
    },
    {
      path: "login",
      element: <Login />,
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
  return Route;
}

export default App;
