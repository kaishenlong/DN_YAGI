import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Similar from "./similar";
import Products from "./products";

// Custom Arrow component for left button
const PreviousArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10 hover:bg-gray-100 transition-colors duration-200"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-800"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  );
};

// Custom Arrow component for right button
const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10 hover:bg-gray-100 transition-colors duration-200"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-800"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
};

const CardCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PreviousArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="mt-16 px-4 md:px-8 lg:px-16">
      <div className="text-center mb-10">
        <h3 className="text-3xl md:text-4xl font-bold text-gray-800">
          Khách Sạn Tương Tự
        </h3>
        <div className="w-24 h-1 bg-black mx-auto mt-4"></div>
      </div>
      <div className="relative">
        <Slider {...settings}>
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden max-w-sm mx-auto px-2"
            >
              <Products />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CardCarousel;
