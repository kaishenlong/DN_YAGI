import React from "react";
import { Outlet } from "react-router-dom";
import SlideBarAdmin from "../admin/SlideBarAdmin";

const Admin = () => {
  return (
    <>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-72">
          <SlideBarAdmin />
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-72 p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Admin;
