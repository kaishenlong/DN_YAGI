import React from "react";
import { Link } from "react-router-dom";
type Props = {};

const CategoryLocation = (props: Props) => {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-4 p-4 mb-8 border border-gray-300 rounded-lg">
        {[
          { name: "SAPA - SA PA", image: "src/upload/1.png" },
          { name: "HẠ LONG", image: "src/upload/2.png" },
          { name: "ĐÀ NẴNG", image: "src/upload/3.png" },
          { name: "HÀ NỘI", image: "src/upload/4.png" },
          { name: "MỘC CHÂU", image: "src/upload/5.png" },
          { name: "ĐÀ LẠT", image: "src/upload/6.png" },
          { name: "NHA TRANG", image: "src/upload/7.png" },
          { name: "PHÚ QUỐC", image: "src/upload/8.png" },
          { name: "HỘI AN", image: "src/upload/9.png" },
          { name: "QUY NHƠN", image: "src/upload/10.png" },
          { name: "CÁT BÀ", image: "src/upload/11.png" },
          { name: "HÒA BÌNH", image: "src/upload/12.png" },
          { name: "VŨNG TÀU", image: "src/upload/13.png" },
          { name: "CẦN THƠ", image: "src/upload/14.png" },
          { name: "TUY HÒA", image: "src/upload/15.png" },
        ].map((location, index) => (
          <div
            key={index}
            className="relative group shadow-lg transition-shadow duration-300 hover:shadow-2xl aspect-[2/1]"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${location.image})` }}
            ></div>
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            <Link
              to={"/Category"}
              className="absolute inset-0 flex items-center justify-center text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-bold transition-transform duration-300 group-hover:scale-110"
            >
              {location.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryLocation;
