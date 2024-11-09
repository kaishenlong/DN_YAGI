import React, { useEffect, useState } from "react";
import Header from "../component/header";
import { Outlet } from "react-router-dom";
import Footer from "../component/footer";
import Danhmucsp from "../component/CategoryHotel";
import YeuThichsp from "../component/Favorite_hotel";
import Favorite_hotel from "../component/Favorite_hotel";

type Props = {};

const Love = (props: Props) => {
  return (
    <>
      <div className="w-full">
        <div className="relative h-72 w-full">
          <div
            style={{
              backgroundImage: 'url("src/upload/bfBot.png")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <p className="font-taviraj text-[61px]  italic font-extrabold  text-center mt-[150px] text-[#FFFFFF]">
              Tận hưởng không gian thư giãn
            </p>
          </div>
        </div>
        <div className="content mt-12 w-full">
          <div className="bg-white p-6 shadow-md">
            <Favorite_hotel />
          </div>
        </div>
      </div>
    </>
  );
};

export default Love;
