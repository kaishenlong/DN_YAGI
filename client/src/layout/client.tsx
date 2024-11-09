import React from "react";
import Header from "../component/header";
import { Outlet } from "react-router-dom";
import Footer from "../component/footer";
type Props = {};
const Client = (props: Props) => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Client;
