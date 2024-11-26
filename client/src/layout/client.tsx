import React from "react";
import Header from "../component/header";
import { Outlet } from "react-router-dom";
import Footer from "../component/footer";
type Props = {
  isLoggedIn: boolean;
  userName: string | null;
  onLogout: () => void;
};
const Client = ({isLoggedIn,userName,onLogout}: Props) => {

  return (
    <>
      <Header isLoggedIn={isLoggedIn} userName={userName} onLogout={onLogout} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Client;
