import React, { useState } from 'react';
import {
  FaBath,
  FaHotel,
  FaUsers,
  FaWifi,
  FaChevronDown,
  FaPlus,
  FaMinus,
  FaBed,
  FaShoppingCart,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ServiceCard = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => (
  <div className="flex items-center p-3 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg shadow-md transition-transform hover:scale-105">
    <Icon className="text-[24px] text-blue-600" />
    <span className="text-[16px] text-blue-800 ml-3 font-medium">{label}</span>
  </div>
);

const RoomCounter = ({
  label,
  value,
  increment,
  decrement,
}: {
  label: string;
  value: number;
  increment: () => void;
  decrement: () => void;
}) => (
  <div className="flex flex-col items-center mb-6">
    <label className="block text-[16px] font-semibold text-gray-700 mb-2">{label}</label>
    <div className="flex items-center gap-2">
      <button
        onClick={decrement}
        className="w-8 h-8 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full flex items-center justify-center shadow-sm"
      >
        <FaMinus />
      </button>
      <input
        type="number"
        value={value}
        readOnly
        className="w-16 text-center border border-gray-300 rounded-md text-lg font-semibold"
      />
      <button
        onClick={increment}
        className="w-8 h-8 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full flex items-center justify-center shadow-sm"
      >
        <FaPlus />
      </button>
    </div>
  </div>
);

const RoomDetail = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCode, setIsOpenCode] = useState(false);
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [selectedCode, setSelectedCode] = useState("MAGIAMGIA9(10%)");
  const discountCodes = ["CODE1", "CODE2", "CODE3", "MAGIAMGIA9(10%)"];
  const totalGuests = adults + children * 0.5;

  const increment = (setter: React.Dispatch<React.SetStateAction<number>>) => setter((prev) => prev + 1);
  const decrement = (setter: React.Dispatch<React.SetStateAction<number>>) => setter((prev) => (prev > 0 ? prev - 1 : 0));

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex flex-col items-center py-[170px]">
      <div className="flex items-center justify-center w-full max-w-5xl px-6 py-4 bg-white shadow-md rounded-lg mb-6">
        <div className="absolute left-6">
          <Link className="text-blue-600 text-lg font-semibold hover:underline" to="/">
            Quay lại
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-blue-800 text-center">Thông tin chi tiết phòng</h1>
      </div>

      <main className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-center mb-4">Tên phòng</h2>
        {/* Room Gallery */}
        <section className="flex justify-center gap-4 mb-8">
          {[...Array(3)].map((_, idx) => (
            <img
              key={idx}
              src="src/assets/img/item/sapa/room1_960x760.jpeg"
              alt={`Room ${idx + 1}`}
              className="w-1/3 rounded-lg shadow-md hover:scale-105 transform transition-transform"
            />
          ))}
        </section>

        {/* Services */}
        <section>
          <h2 className="text-xl font-bold text-center mb-4">Dịch vụ</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            <ServiceCard icon={FaHotel} label="15m²" />
            <ServiceCard icon={FaBed} label="2 giường đơn" />
            <ServiceCard icon={FaWifi} label="Wifi miễn phí" />
            <ServiceCard icon={FaBath} label="Vòi sen và bồn tắm" />
            <ServiceCard icon={FaBath} label="Máy sấy" />
            <ServiceCard icon={FaBath} label="Đồ dùng vệ sinh cá nhân" />
          </div>
        </section>

        {/* Check-in/out */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-center mb-4">Check In-Out</h2>
          <div className="flex gap-4 justify-center">
            <input
              type="date"
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-blue-500 text-gray-700"
            />
            <input
              type="date"
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-blue-500 text-gray-700"
            />
          </div>
        </section>

        {/* Room and Guest Selector */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-center mb-4">Số lượng phòng và người</h2>
          <div className="relative w-64 mx-auto">
            <div
              className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span>{rooms} phòng - {totalGuests} khách</span>
              <FaChevronDown />
            </div>
            {isOpen && (
              <div className="absolute bg-white mt-2 p-4 rounded-lg shadow-lg z-10">
                <RoomCounter
                  label="Số phòng"
                  value={rooms}
                  increment={() => increment(setRooms)}
                  decrement={() => decrement(setRooms)}
                />
                <RoomCounter
                  label="Người lớn"
                  value={adults}
                  increment={() => increment(setAdults)}
                  decrement={() => decrement(setAdults)}
                />
                <RoomCounter
                  label="Trẻ em"
                  value={children}
                  increment={() => increment(setChildren)}
                  decrement={() => decrement(setChildren)}
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600"
                >
                  Xác nhận
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Price Summary */}
        <section className="mt-8">
          <div className="flex justify-between items-center p-4 bg-gray-200 rounded-lg shadow-md">
            <span className="font-bold text-gray-700">GIÁ PHÒNG:</span>
            <span className="text-lg font-bold text-blue-700">899,000 Đ/đêm</span>
          </div>
          <div className="mt-4 flex justify-between items-center bg-yellow-400 text-white p-4 rounded-lg shadow-md">
            <span className="text-lg font-bold">TỔNG TIỀN:</span>
            <span className="text-xl font-bold">{899000 * rooms} Đ</span>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8 justify-center">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg flex items-center gap-2 shadow-md hover:bg-blue-600">
            <FaShoppingCart />
            Thêm Vào Giỏ Hàng
          </button>
          <button className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600">
            Đặt ngay
          </button>
        </div>
      </main>
    </div>
  );
};

export default RoomDetail;
