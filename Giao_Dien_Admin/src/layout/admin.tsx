import React from "react";
import { Outlet } from "react-router-dom";
import SlideBarAdmin from "../admin/SlideBarAdmin";

const Admin = () => {
  return (
    <>
      <div className="flex gap-10">
        {/* Sidebar */}
        <div className="w-72">
          <SlideBarAdmin />
        </div>

        {/* Main Content */}
        <div className="">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Admin;
