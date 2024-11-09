import React, { useState, useEffect } from "react";
import CategoryLocation from "../component/CategoryLocation";
import BannerBot from "../component/BannerBot";
import ContentBot from "../component/ContentBot";
import SearchForm from "../component/searchForm";
import CategoryService from "../component/categoryService";
import { Link, Route, Routes } from "react-router-dom";
import Header from "../component/header";

type Props = {};
const images = [
  "src/upload/banner1.png",
  "src/upload/banner2.png",
  "src/upload/banner3.png",
  "src/upload/banner4.png",
  "src/upload/banner5.png",
];

const Homepage = (props: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleImageClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <>
          <main className="relative h-screen" onClick={handleImageClick}>
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
              style={{
                backgroundImage: `url(${images[currentIndex]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="absolute inset-0 flex flex-col justify-between p-8">
              <div className="self-end mt-32">
                <div className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300">
                  <Link
                    className="hover:underline hover:text-yellow-400 mr-2"
                    to={"/register"}
                  >
                    Đăng ký
                  </Link>
                  /
                  <Link
                    className="hover:underline hover:text-yellow-400 ml-2"
                    to={"/login"}
                  >
                    Đăng nhập
                  </Link>
                </div>
              </div>
              <div className="bg-black bg-opacity-60 p-8 rounded-lg max-w-lg text-white self-start">
                <p className="font-taviraj text-yellow-300 mb-2 text-[27px]">
                  Từ ngày 01/10/2024-30/12/2024
                </p>
                <p className="font-taviraj  font-700 italic text-[27px] text-left">Ưu đãi mùa du lịch</p>
              <h1 className="font-taviraj italic text-[40px] font-bold">
                Hưởng ưu đãi từ 15% cho kỳ nghỉ tiếp theo
              </h1>
                <a
                  href="#"
                  className="inline-block px-6 py-3 bg-yellow-500 text-black font-bold rounded-full hover:bg-yellow-400 transition duration-300"
                >
                  Xem thêm →
                </a>
              </div>
            </div>
          </main>
          <div className="w-full mx-auto px-4 py-12 space-y-12">
            <CategoryService />
            <SearchForm />
            <CategoryLocation />
            <BannerBot />
            <ContentBot />
          </div>
        </>
      </div>
    </div>
  );
};

export default Homepage;
