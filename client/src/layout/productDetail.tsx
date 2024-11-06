import React from "react";
import ProductDT from "../component/productDT";
type Props = {};
const ProductDetail = (props: Props) => {
  return (
    <>
      <div className="w-full">
        <div className="relative h-52 md:h-72 lg:h-96 flex-grow">
          <div
            style={{
              backgroundImage: 'url("src/upload/banner2.png")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out w-full"
          >
            <p className="italic text-2xl md:text-3xl lg:text-4xl text-center mt-12 md:mt-24 lg:mt-36 text-white">
              Sang Trọng
            </p>
          </div>
        </div>
        <div className="content mt-12 md:mt-24 lg:mt-36">
          <div>
            <ProductDT />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
