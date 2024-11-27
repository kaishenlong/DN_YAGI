import { Gauge } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

type Props = {};

const SlideBarAdmin = (props: Props) => {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleButtonClick = (buttonId: string) => {
    setActiveButton(buttonId);
  };

  return (
    <div>
      <aside className="bg-gradient-to-br from-gray-800 to-gray-900 -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
        <div className="relative border-b border-white/20">
          <a className="flex items-center gap-4 py-6 px-8" href="#/">
            <Link to={"/"}>
              <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
                Đặt Phòng YAGI
              </h6>
            </Link>
          </a>
          <button
            className="middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-white hover:bg-white/10 active:bg-white/30 absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
            type="button"
          >
            <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="currentColor"
                aria-hidden="true"
                className="h-5 w-5 text-white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </span>
          </button>
        </div>
        <div className="m-4">
          <ul className="mb-4 flex flex-col gap-1">
            <li>
              <button
                onClick={() => handleButtonClick("hotel")}
                className={`middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg ${
                  activeButton === "hotel"
                    ? "bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20"
                    : "text-white hover:bg-white/10 active:bg-white/30"
                } w-full flex items-center gap-4 px-4 capitalize`}
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="w-5 h-5 text-inherit"
                >
                  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"></path>
                  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"></path>
                </svg>
                <Link to={"/dashboard/hotels"}>
                  <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                    Quản Khách Sạn
                  </p>
                </Link>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleButtonClick("room")}
                className={`middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg ${
                  activeButton === "room"
                    ? "bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20"
                    : "text-white hover:bg-white/10 active:bg-white/30"
                } w-full flex items-center gap-4 px-4 capitalize`}
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="w-5 h-5 text-inherit"
                >
                  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"></path>
                  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"></path>
                </svg>
                <Link to={"/dashboard/rooms"}>
                  <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                    Quản Lý Phòng
                  </p>
                </Link>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleButtonClick("manageAccount")}
                className={`middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg ${
                  activeButton === "manageAccount"
                    ? "bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20"
                    : "text-white hover:bg-white/10 active:bg-white/30"
                } w-full flex items-center gap-4 px-4 capitalize`}
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="w-5 h-5 text-inherit"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <Link to={"/dashboard/taikhoan"}>
                  <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                    Quản lý Tài Khoản
                  </p>
                </Link>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleButtonClick("manageReviews")}
                className={`middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg ${
                  activeButton === "manageReviews"
                    ? "bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20"
                    : "text-white hover:bg-white/10 active:bg-white/30"
                } w-full flex items-center gap-4 px-4 capitalize`}
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="w-5 h-5 text-inherit"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 18.375V5.625zM21 9.375A.375.375 0 0020.625 9h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zM3.375 21h17.25c1.035 0 1.875-.84 1.875-1.875v-6.075l-7.75-7.75H3.375A1.875 1.875 0 001.5 6.75v12.75c0 1.035.84 1.875 1.875 1.875z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <Link to={"/dashboard/reviews"}>
                  <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                    Quản lý Đánh Giá
                  </p>
                </Link>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleButtonClick("manageBookings")}
                className={`middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg ${
                  activeButton === "manageBookings"
                    ? "bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20"
                    : "text-white hover:bg-white/10 active:bg-white/30"
                } w-full flex items-center gap-4 px-4 capitalize`}
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="w-5 h-5 text-inherit"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2.25 3.75C2.25 2.784 3.034 2 4.125 2h15.75C20.966 2 21.75 2.784 21.75 3.75v16.5C21.75 22.216 20.966 23 19.875 23H4.125C3.034 23 2.25 22.216 2.25 21.25V3.75zM3.75 5.25v1.5h16.5v-1.5H3.75zM3.75 8.25v1.5h16.5v-1.5H3.75zM3.75 11.25v1.5h16.5v-1.5H3.75zM3.75 14.25v1.5h16.5v-1.5H3.75zM3.75 17.25v1.5h16.5v-1.5H3.75zM3.75 20.25v1.5h16.5v-1.5H3.75z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <Link to={"/dashboard/bookings"}>
                  <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                    Quản lý Đơn Đặt Phòng
                  </p>
                </Link>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleButtonClick("manageDashboard")}
                className={`middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg ${
                  activeButton === "manageDashboard"
                    ? "bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20"
                    : "text-white hover:bg-white/10 active:bg-white/30"
                } w-full flex items-center gap-4 px-4 capitalize`}
                type="button"
              >
                <Gauge color="#ffffff" />
                <Link to={"/dashboard/dashboard"}>
                  <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                    Biểu đồ
                  </p>
                </Link>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default SlideBarAdmin;
