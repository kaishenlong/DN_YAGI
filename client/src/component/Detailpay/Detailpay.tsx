import React, { useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";

import { FaChevronDown, FaPlus, FaMinus, FaUsers, FaBath, FaWifi, FaBed, FaHotel } from "react-icons/fa";
const Detailpay = () => {
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
          <h3 className="text-center  text-[36px]">Chi tiết phòng đã đặt</h3>
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
              <div className="relative flex flex-row ">
                <i className="fa-regular fa-calendar-days absolute left-32 bottom-3 text-center"></i>
                <span className="font-montserrat text-[15px] text-center font-semibold leading-[18.29px] rounded-lg w-full pl-10 p-2.5">
                  26/09/2024 to 28/09/2024
                </span>
              </div>
            </div>
            <div className="border-b pb-4 w-full flex flex-col items-center justify-center  border-solid border-[#D9D9D9]">
              <div className=" w-full ">
                <p className="font-montserrat text-[20px] font-semibold leading-[19.5px] text-center my-3 ">
                  Số lượng phòng và người
                </p>
              </div>

              <div className="relative  ">
                <div className="flex items-center justify-around rounded-lg w-60 p-2.5 font-montserrat text-[15px]  font-semibold">
                  {" "}
                  <FaUsers className="left-40 bottom-4 text-center text-[15px] text-[#0460B196]" />
                  <span>
                    {rooms} phòng - {totalGuests} khách
                  </span>
                </div>
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
                <div className="w-60 flex items-center justify-between border border-[#0460B1D6]  text-gray-500 text-sm font-montserrat font-medium  rounded-sm p-2.5 ">
                  <span>{selectedCode}</span>
                </div>
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
                    Họ
                    <span className="text-red-600">*</span>
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
                    Tên
                    <span className="text-red-600">*</span>
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
                  Email
                </label>
                <span className="text-red-600">*</span>
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
                  Số điện thoại
                </label>
                <span className="text-red-600">*</span>
              </div>
              <input
                id="number"
                className="w-[212px] h-[27px] border border-[#B1A9A9] rounded-[3px]"
                type="number"
              />
            </div>
            <div className="mt-7">
              <span className="font-montserrat font-normal items-center  text-[16px] text-[#242222CC]">
                Phương thức thanh toán đã chọn
              </span>
              <div className="flex flex-row ml-10 mt-4">
                <div className="w-[15px] h-[15px] border border-white rounded-full bg-[#0460B1D6] mr-4 mt-1"></div>
                <span> Ví điện tử</span>
              </div>
            </div>
            <div className="mt-4 ">
              <p className="mb-1 font-montserrat font-bold">
                Các thủ tục trước khi nhận phòng tại khách sạn:
              </p>{" "}
              <br />
              <ol className="list-decimal list-inside">
                <li>
                  <span className="font-montserrat text-[#0460B1D6]">
                    Xác nhận đặt phòng:
                  </span>
                  <ul className="list-disc list-inside ml-4">
                    <li>
                      Nếu bạn đã đặt phòng trước, hãy cung cấp thông tin đặt
                      phòng cho nhân viên lễ tân. Điều này có thể bao gồm mã đặt
                      phòng, tên người đặt phòng, và các chi tiết liên quan
                      khác.
                    </li>
                  </ul>
                </li>
                <li>
                  <span className="font-montserrat text-[#0460B1D6]">
                    {" "}
                    Xuất trình giấy tờ tùy thân:
                  </span>
                  <ul className="list-disc list-inside ml-4">
                    <li>
                      Bạn cần xuất trình giấy tờ tùy thân như chứng minh nhân
                      dân (CMND), căn cước công dân (CCCD), hoặc hộ chiếu để
                      nhân viên lễ tân xác minh thông tin cá nhân của bạn.
                    </li>
                  </ul>
                </li>
                <li>
                  <span className="font-montserrat text-[#0460B1D6]">
                    {" "}
                    Điền thông tin đăng ký:
                  </span>
                  <ul className="list-disc list-inside ml-4">
                    <li>
                      Bạn sẽ cần điền vào mẫu đăng ký lưu trú của khách sạn. Mẫu
                      này thường yêu cầu các thông tin cơ bản như tên, địa chỉ,
                      số điện thoại, và thời gian lưu trú.
                    </li>
                  </ul>
                </li>
                <li>
                  <span className="font-montserrat text-[#0460B1D6]">
                    {" "}
                    Nhận chìa khóa hoặc thẻ phòng:
                  </span>
                  <ul className="list-disc list-inside ml-4">
                    <li>
                      Sau khi hoàn tất các thủ tục trên, bạn sẽ nhận được chìa
                      khóa hoặc thẻ phòng từ nhân viên lễ tân. Họ cũng sẽ hướng
                      dẫn bạn cách sử dụng các tiện ích trong phòng và các dịch
                      vụ của khách sạn.
                    </li>
                  </ul>
                </li>
                <li>
                  <span className="font-montserrat text-[#0460B1D6]">
                    {" "}
                    Hướng dẫn lên phòng:
                  </span>
                  <ul className="list-disc list-inside ml-4">
                    <li>
                      Nhân viên lễ tân hoặc nhân viên hỗ trợ sẽ hướng dẫn bạn
                      lên phòng và giúp bạn mang hành lý nếu cần.{" "}
                    </li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detailpay;
