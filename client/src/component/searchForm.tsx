import React from "react";

const HotelSearchForm = () => {
  return (
    <div className="container mx-auto my-10">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-4">
        TÌM KHÁCH SẠN GIÁ TỐT
      </h1>
      <div className="flex justify-center">
        <div className="w-16 h-[2px] bg-orange-400 mb-4"></div>
      </div>

      {/* Form */}
      <form className="flex flex-col items-center gap-4">
        {/* Search Input */}
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder="Nhập địa điểm, tên khách sạn ..."
            className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <span className="absolute inset-y-0 left-2 flex items-center">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16h6M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </span>
        </div>

        {/* Date Inputs */}
        <div className="flex gap-4">
          <div className="relative">
            <input
              type="date"
              className="w-[180px] border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
           
          </div>
          <div className="relative">
            <input
              type="date"
              className="w-[180px] border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            
          </div>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="bg-orange-400 text-white font-bold py-2 px-6 rounded-lg hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          Tìm kiếm
        </button>
      </form>
    </div>
  );
};

export default HotelSearchForm;
