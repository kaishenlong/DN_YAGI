import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const CategoryService = (props: Props) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="font-taviraj italic grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {[
          { title: "Sang Trọng", image: "src/upload/sangtrong.png" },
          { title: "Tiện Nghi", image: "src/upload/tiennghi.png" },
          { title: "Lãng Mạn", image: "src/upload/langman.png" },
          { title: "Phong Cách", image: "src/upload/phongcach.png" },
          { title: "Thư Giãn", image: "src/upload/thugian.png" },
        ].map((item, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg shadow-lg group"
          >
            <div
              className="w-full h-64 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundImage: `url("${item.image}")` }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 transition-opacity duration-300 opacity-100 group-hover:opacity-80">
              <Link
                to={"/Category"}
                className="text-2xl font-bold text-white text-center"
              >
                {item.title}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryService;
