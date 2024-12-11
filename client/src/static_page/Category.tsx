import React, { useContext, useEffect, useState } from "react";
import Header from "../component/header";
import { Outlet } from "react-router-dom";
import Footer from "../component/footer";
import Danhmucsp from "../component/CategoryHotel";
import CategoryHotel from "../component/CategoryHotel";
import { CitiesCT } from "../context/cityCT";
import { City } from "../interface/hotel";

type Props = {};

const Category = (props: Props) => {
  const { cities } = useContext(CitiesCT);
  return (
    <>
      <div className="w-full">
        <div className="relative h-[300px] w-full">
          <div
            style={{
              backgroundImage: 'url("src/upload/sangtrong.png")',
              backgroundSize: "cover",
              backgroundPosition: "0px",
            }}
            className="absolute w-full h-[399px] "
          >
            {cities.map((city: City) => (
              <p className="font-taviraj text-[61px]  italic font-extrabold  text-center mt-[150px] text-[#FFFFFF]">
                {city.name}
              </p>
            ))}
          </div>
        </div>
        <div className="content mt-[150px]">
          <div>
            <CategoryHotel />
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
