import React, { useEffect, useState } from "react";
import Header from "../component/header";
import { Outlet } from "react-router-dom";
import Footer from "../component/footer";
import Danhmucsp from "../component/danhmucsp";

type Props = {};

const Category = (props: Props) => {
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
            <p className="font-taviraj text-[61px]  italic font-extrabold  text-center mt-[150px] text-[#FFFFFF]">
              Sang Trọng
            </p>
          </div>
        </div>
        <div className="content mt-[150px]">
          <div>
            <Danhmucsp />
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
