import React, { useState } from "react";
import Flatpickr from "react-flatpickr";
import { FaBath, FaHotel, FaUsers, FaWifi } from 'react-icons/fa';
import "flatpickr/dist/flatpickr.css";
import "./Pay.css";
import { FaChevronDown, FaPlus, FaMinus,FaBed } from "react-icons/fa";
const Pay = () => {
  const [date, setDate] = useState([new Date(), new Date()]);
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const [selectedCode, setSelectedCode] = useState("MAGIAMGIA9(10%)");
  const [isOpenCode, setIsOpenCode] = useState(false);
  const discountCodes = ["CODE1", "CODE2", "CODE3", "MAGIAMGIA9(10%)"];
  const totalGuests = adults + children;
  const increment = (setter: any) => setter((prev: any) => prev + 1);
  const decrement = (setter: any) =>
    setter((prev: any) => (prev > 0 ? prev - 1 : 0));
  return (
    <div className="w-sceen mx-[50px] p-4 ">
      <div className="flex flex-row items-center mt-[150px]">
        <a className="text-[#0460B1D6] flex items-center" href="http://">
          <i className="fa-solid fa-arrow-left-long text-[#0460B1D6] mr-2"></i>{" "}
          Quay lại
        </a>
        <div className="relative  ml-96">
          <h3 className="text-center  text-[36px]">Thông tin đặt phòng</h3>
          <hr className="absolute left-16 right-16 bottom-0 border-t-2 border-[#00396B96]" />
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="  flex flex-row  items-center ">
          {/* phong cua ban */}
          <div className=" w-2/5 flex   flex-col items-center  border-[#DCD1D1] border-[0.5px] mt-24  ">
            <div className="p-6">
              <p className="font-montserrat text-[20px] font-medium leading-[19.5px] text-center mb-10 ">
                PHÒNG CỦA BẠN 
              </p>
              <img src="src/assets/img/item/sapa/room1_960x760.jpeg" alt="" />
              <p className="font-montserrat text-[15px] font-semibold leading-[18.29px] text-center m-10 ">
                Tên phòng
              </p>
              <div className="grid grid-cols-2 gap-5 pl-8 ">
                <div className="">
                <FaHotel className="text-[15px] text-[#0460B196]" />
                  <span className="text-[15px] text-[#022747BD] ml-2">
                    15m2
                  </span>
                </div>
                <div className=" ">
                <FaBed className="text-[15px] text-[#0460B196]" />
                  <span className="text-[15px] text-[#022747BD] ml-2">
                    2 giường đơn
                  </span>
                </div>
                <div className="">
                <FaWifi className="text-[15px] text-[#0460B196]" />
                  <span className="text-[15px] text-[#022747BD] ml-2">
                    Wifi miễn phí
                  </span>
                </div>
                <div className="">
                <FaBath className="text-[15px] text-[#0460B196]" />
                  <span className="text-[15px] text-[#022747BD] ml-2">
                    Vòi sen và bồn tắm
                  </span>
                </div>
              </div>
            </div>

            <div className="m-5 py-4 w-full border-t border-b  border-solid border-[#D9D9D9]">
              <p className="font-montserrat text-[20px] font-semibold leading-[19.5px] text-center my-3 ">
                Check In-Out
              </p>
              <div className="flex gap-2">
                    <input
                      type="date"
                      placeholder="Check in"
                      className="p-2 border border-border rounded w-full text-sm"
                    />
                    <input
                      type="date"
                      placeholder="Check out"
                      className="p-2 border border-border rounded w-full text-sm"
                    />
                  </div>
            </div>
            <div className="border-b pb-4 w-full flex flex-col items-center justify-center  border-solid border-[#D9D9D9]">
              <div className=" w-full ">
                <p className="font-montserrat text-[20px] font-semibold leading-[19.5px] text-center my-3 ">
                  Số lượng phòng và người
                </p>
              </div>

              <div className="relative  ">
                <div
                  className="flex items-center justify-around rounded-lg w-60 p-2.5 cursor-pointer  font-montserrat text-[15px]  font-semibold"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {" "}
                  <FaUsers className="left-40 bottom-4 text-center text-[15px] text-[#0460B196]" />
                  <span>
                    {rooms} phòng - {totalGuests} khách
                  </span>
                  <FaChevronDown />
                </div>
                {isOpen && (
                  <div className="absolute bg-white border border-gray-300  w-full rounded-lg mt-2 p-5 shadow-lg z-10">
                    <div className="mb-6 flex flex-row ">
                      <label className="block text-[15px] font-medium text-gray-700 ">
                        Số phòng
                      </label>
                      <div className="flex items-center ml-10  ">
                        <button
                          onClick={() => decrement(setRooms)}
                          className="w-[22px] h-[22px] bg-white border  border-gray-300 text-gray-700 px-1 py-1 rounded-full"
                        >
                          <FaMinus className="text-[11px] text-gray-700 " />
                        </button>
                        <input
                          type="number"
                          value={rooms}
                          readOnly
                          className="w-12 text-center "
                        />
                        <button
                          onClick={() => increment(setRooms)}
                          className="w-[22px] h-[22px] bg-white border  border-gray-300 text-gray-700 px-1 py-1 rounded-full"
                        >
                          <FaPlus className="text-[11px] text-gray-700 " />
                        </button>
                      </div>
                    </div>
                    <div className="mb-6 flex flex-row">
                      <label className="block text-[15px] font-medium text-gray-700 mr-6">
                        Người lớn
                      </label>
                      <div className="flex items-center ml-3 ">
                        <button
                          onClick={() => decrement(setAdults)}
                          className="w-[22px] h-[22px] bg-white border  border-gray-300 text-gray-700 px-1 py-1 rounded-full"
                        >
                          <FaMinus className="text-[11px] text-gray-700 " />
                        </button>
                        <input
                          type="number"
                          value={adults}
                          readOnly
                          className="w-12 text-center "
                        />
                        <button
                          onClick={() => increment(setAdults)}
                          className="w-[22px] h-[22px] bg-white border  border-gray-300 text-gray-700 px-1 py-1 rounded-full"
                        >
                          <FaPlus className="text-[11px] text-gray-700 " />
                        </button>
                      </div>
                    </div>
                    <div className="mb-6 flex flex-row">
                      <label className="block text-[15px] font-medium text-gray-700 mr-6">
                        Trẻ em
                      </label>
                      <div className="flex items-center ml-9">
                        <button
                          onClick={() => decrement(setChildren)}
                          className="w-[22px] h-[22px] bg-white border  border-gray-300 text-gray-700 px-1 py-1 rounded-full"
                        >
                          <FaMinus className="text-[11px] text-gray-700 " />
                        </button>
                        <input
                          type="number"
                          value={children}
                          readOnly
                          className="w-12 text-center "
                        />
                        <button
                          onClick={() => increment(setChildren)}
                          className="w-[22px] h-[22px] bg-white border  border-gray-300 text-gray-700 px-1 py-1 rounded-full"
                        >
                          <FaPlus className="text-[11px] text-gray-700 " />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="mt-4 ml-10 bg-[#0460B196] ; text-white py-2 px-4 rounded"
                    >
                      Xác nhận
                    </button>
                  </div>
                )}
                <button className="mt-4 ml-4 items-center bg-[#0460B196] ; text-white py-2 px-16 text-[18px]  rounded">
                  Thay đổi
                </button>
              </div>
            </div>
            <div className="mt-6  h-[48px]  w-[384px] border border-[#0460B1D6] rounded-lg  grid grid-cols-2 ">
              <div className="bg-[#a3cbec74] flex items-center justify-center ">
                <span className=" font-montserrat  text-[18px] font-bold leading-[25px] jus">
                  GIÁ PHÒNG
                </span>
              </div>
              <div className=" font-montserrat  text-[20px] flex items-center justify-center">
                <strong>899.000Đ</strong>/đêm
              </div>
            </div>
            <div className="mt-6  h-[48px]  w-[384px]  grid grid-cols-3 ">
              <div className=" ">
                <span className=" font-montserrat  text-[16px] font-semibold leading-[25px] flex  justify-start mt-2  ">
                  MÃ GIẢM GIÁ
                </span>
              </div>
              <div className="relative">
                <div
                  className="w-60 flex items-center justify-between border border-[#0460B1D6]  text-gray-500 text-sm font-montserrat font-medium  rounded-sm p-2.5 cursor-pointer"
                  onClick={() => setIsOpenCode(!isOpenCode)}
                >
                  <span>{selectedCode}</span>
                  <FaChevronDown />
                </div>
                {isOpenCode && (
                  <div className="absolute bg-white  mt-2 p-4 shadow-lg z-10">
                    {discountCodes.map((code) => (
                      <div
                        key={code}
                        className="p-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          setSelectedCode(code);
                          setIsOpenCode(false);
                        }}
                      >
                        {code}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="bg-[#F5A52DBA] w-full h-[62px] flex items-center justify-center mt-6">
              <span className="font-montserrat text-2xl font-bold leading-[25px] text-justify text-white">
                TỔNG TIỀN : 810.000 Đ
              </span>
            </div>
          </div>
          {/* thanhtoan */}
          <div className=" w-3/5  flex flex-col   border-[#DCD1D1] border-[0.5px] ml-24 p-14 pt-2 pb-28">
            <div className=" flex items-center justify-center mt-4">
              <span className="text-[20px] font-montserrat font-medium ">
                THANH TOÁN
              </span>
            </div>
            <div className="mt-4">
              <span className="font-montserrat font-normal items-center  text-[16px] text-[#242222CC]">
                Nhập thông tin chi tiết
              </span>
              <div className="flex flex-row justify-start space-x-8 mt-4">
                <div className="flex flex-col items-start relative">
                  <label
                    htmlFor="lastName"
                    className="font-montserrat text-base font-medium leading-[19.5px] text-left mb-2"
                  >
                    Họ <span className="text-red-600">*</span>
                    
                  </label>
                  <input
                    id="lastName"
                    className="w-[212px] h-[27px] border border-[#B1A9A9] rounded-[3px] p-2"
                    type="text"
                  />
                </div>
                <div className="flex flex-col items-start relative">
                  <label
                    htmlFor="firstName"
                    className="font-montserrat text-base font-medium leading-[19.5px] text-left mb-2"
                  >
                    Tên <span className="text-red-600">*</span>
                   
                  </label>
                  <input
                    id="firstName"
                    className="w-[212px] h-[27px] border border-[#B1A9A9] rounded-[3px] p-2"
                    type="text"
                  />
                </div>
              </div>

              <div className="mt-4 mb-2 relative">
                <label
                  htmlFor=""
                  className="font-montserrat text-base font-medium leading-[19.5px] text-left"
                >
                  Email <span className="text-red-600">*</span>
                </label>
                
              </div>
              <input
                id="email"
                className="w-[212px] h-[27px] border border-[#B1A9A9] rounded-[3px]"
                type="email"
              />
              <div className="mt-4 mb-2 relative">
                <label
                  htmlFor=""
                  className="font-montserrat text-base font-medium leading-[19.5px] text-left"
                >
                  Số điện thoại <span className="text-red-600">*</span>
                </label>
               
              </div>
              <input
                id="number"
                className="w-[212px] h-[27px] border border-[#B1A9A9] rounded-[3px]"
                type="number"
              />
            </div>
            <div className="mt-7">
              <span className="font-montserrat font-normal items-center  text-[16px] text-[#242222CC]">
                Phương thức thanh toán
              </span>
              <div className="flex flex-col space-y-4 ml-10 mt-10">
                <div className="flex flex-col">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="option"
                      value="option1"
                      checked={selectedOption === "option1"}
                      onChange={() => setSelectedOption("option1")}
                      className="form-radio text-blue-600"
                    />
                    <span>Ví điện tử</span>
                  </label>

                  <div className="flex flex-row mt-4">
                    <div className="mx-4">
                      <img
                        className="w-[80px] h-[70px] "
                        src="src/assets/img/momo.png"
                        alt=""
                      />
                    </div>
                    <div className="mx-4">
                      <img
                        className="w-[90px] h-[70px]"
                        src="src/assets/img/vnpay.png"
                        alt=""
                      />
                    </div>
                    <div className="mx-4">
                      <img
                        className="w-[169px] h-[70px]"
                        src="src/assets/img/paypal.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="option"
                      value="option2"
                      checked={selectedOption === "option2"}
                      onChange={() => setSelectedOption("option2")}
                      className="form-radio text-blue-600"
                    />
                    <span>Chuyển khoản ngân hàng</span>
                  </label>
                  <div className="flex flex-row">
                    <div className="w-56 mt-4">
                      <img className="" src="src/assets/img/QR2.jpg" alt="" />
                    </div>
                    <div className="mt-4 pl-10 flex items-center ">
                      <p className="text-center">
                        Ngân hàng Vietcombank - CN Hải Hậu <br />
                        STK: 1022584075 <br />
                        CTK: PHAM THI THU LAN
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center  justify-center mt-10">
                <button
                  className=" ml-4 items-center bg-[#0460B196] ;
text-white py-2 px-16 text-[18px]  rounded "
                >
                  THANH TOÁN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pay;
