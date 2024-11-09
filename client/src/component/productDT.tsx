import {
  Armchair,
  Bath,
  Bed,
  Coffee,
  Dumbbell,
  HandPlatter,
  LayoutGrid,
  MapPin,
  Martini,
  Snowflake,
  WashingMachine,
  Wifi,
  X,
} from "lucide-react";
import React, { useState } from "react";
import Evaluate from "./Evaluate";
import AllEvaluate from "./allEvaluate";
import FormComponent from "./formCmt";
import FormCmt from "./formCmt";
import Similar from "./similar";
import CardCarousel from "./CardCarousel ";
import { FaChevronDown, FaMinus, FaPlus } from "react-icons/fa";

const ProductDT = () => {
  // Image sources for the slideshow
  const images = [
    "src/upload/dt1.png",
    "src/upload/dt2.png",
    "src/upload/dt3.png",
    "src/upload/dt4.png",
    "src/upload/dt5.png",
  ];
  const roomImages = [
    "src/upload/pr1.png",
    "src/upload/pr1.png",
    "src/upload/pr1.png",
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const totalGuests = adults + children;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const increment = (setter: any) => setter((prev: any) => prev + 1);
  const decrement = (setter: any) =>
    setter((prev: any) => (prev > 0 ? prev - 1 : 0));
  // Function to show the next image
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to show the previous image
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Function to show a selected image when a thumbnail is clicked
  const showImage = (index: any) => {
    setCurrentIndex(index);
  };
  //open modal
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="w-full px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="product flex flex-col lg:flex-row justify-center gap-5">
            <div className="cntRight w-full lg:w-2/3">
              <div className="title mb-3">
                <h1 className="text-xl md:text-2xl font-bold text-[#242222CC]">
                  Grand Resort Sapa-Lào Cai
                </h1>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1"></MapPin>
                  <p className="text-sm md:text-base">
                    Sapa-Lào Cai - {""}
                    <a href="#" className="text-blue-600 hover:underline">
                      Xem trên bản đồ
                    </a>
                  </p>
                </div>
              </div>

              {/* Main Image with Slideshow */}
              <div className="relative">
                {/* Left Arrow */}
                <button
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 text-3xl text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 z-10"
                  onClick={prevSlide}
                >
                  &#10094;
                </button>
                <img
                  className="w-full h-[300px] md:h-[400px] lg:h-[592px] object-cover"
                  src={images[currentIndex]}
                  alt="Resort"
                />
                {/* Right Arrow */}
                <button
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 text-3xl text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70"
                  onClick={nextSlide}
                >
                  &#10095;
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 md:gap-4 mt-2 overflow-x-auto">
                {images.map((image, index) => (
                  <img
                    key={index}
                    className={`w-[80px] md:w-[120px] lg:w-[163px] h-[60px] md:h-[80px] lg:h-[109px] object-cover cursor-pointer ${
                      index === currentIndex ? "opacity-100" : "opacity-60"
                    } transition-opacity duration-300 hover:opacity-100`}
                    src={image}
                    alt={`Thumbnail ${index}`}
                    onClick={() => showImage(index)}
                  />
                ))}
              </div>

              <div className="des w-full mt-6">
                <p className="text-xl md:text-2xl font-bold">Mô tả</p>
                <span className="text-sm md:text-base">
                  Silk Path Grand Resort & Spa Sapa tọa lạc trên ngọn đồi riêng
                  tuyệt đẹp với tầm nhìn ôm trọn dãy núi Hoàng Liên Sơn bao
                  quanh là mây trắng bồng bềnh, cảm hứng từ những tòa lâu đài
                  Pháp kiêu sa với 152 phòng ngủ và biệt thự sang trọng. Sở hữu
                  vẻ đẹp tinh tế, quý phái theo phong cách kiến trúc Đông Dương
                  đặc trưng thời Pháp thuộc cùng họa tiết trang trí đậm nét văn
                  hóa Sapa bản địa, Silk Path Grand Resort & Spa Sapa tự hào là
                  khu nghỉ dưỡng đậm chất châu Âu thơ mộng giữa núi rừng Tây
                  Bắc...
                </span>
              </div>
            </div>

            <div className="cntLeft w-full lg:w-1/3 mt-6 lg:mt-0">
              {/* Left side content (unchanged) */}
              <div className="p-4 bg-card rounded-lg shadow-md">
                <div className="flex flex-wrap items-center gap-2">
                  <button className="border-inherit border w-[44px] h-[42px] p-3">
                    <img src="src/upload/tim.png" alt="" />
                  </button>
                  <button className="border-inherit border w-[44px] h-[42px] p-3">
                    <img src="src/upload/share.png" alt="" />
                  </button>
                  <span className="text-xl font-semibold border w-[69px] h-[41px] text-[#FFFFFF] text-center p-1 bg-[#0460B196]">
                    4.0/5
                  </span>
                  <div>
                    <p className="text-[#0460B196]">Phổ biến</p>
                    <p className="text-[12px] ml-2">(1 Review)</p>
                  </div>
                </div>
                <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-3 py-1 rounded mt-2">
                  Giá thấp nhất bao gồm:
                </button>
                <div className="mt-4">
                  <span className="text-lg font-bold">
                    Giá:{" "}
                    <span className="text-red-500 line-through">
                      1.500.000Đ
                    </span>{" "}
                    1.000.000Đ
                  </span>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">
                    Check In-Out
                  </label>
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
                <div className="mt-4">
                  <label className="block text-sm font-medium">
                    Số lượng phòng và người
                  </label>
                  <div className="select-room mt-1 p-2 border border-border rounded w-full">
                    <div
                      className="flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer font-montserrat text-[15px] font-semibold"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-users"></i>
                        <span>
                          {rooms} phòng - {totalGuests} khách
                        </span>
                      </div>
                      <FaChevronDown />
                    </div>
                    {isOpen && (
                      <div className="absolute bg-white border border-gray-300 w-[350px] rounded-lg mt-2 p-4 shadow-lg z-10">
                        <div className="space-y-4">
                          {/* Số phòng */}
                          <div className="flex items-center justify-between">
                            <label className="text-[15px] font-medium text-gray-700">
                              Số phòng
                            </label>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => decrement(setRooms)}
                                className="counter-btn"
                              >
                                <FaMinus className="text-xs" />
                              </button>
                              <input
                                type="number"
                                value={rooms}
                                readOnly
                                className="w-12 text-center"
                              />
                              <button
                                onClick={() => increment(setRooms)}
                                className="counter-btn"
                              >
                                <FaPlus className="text-xs" />
                              </button>
                            </div>
                          </div>

                          {/* Người lớn */}
                          <div className="flex items-center justify-between">
                            <label className="text-[15px] font-medium text-gray-700">
                              Người lớn
                            </label>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => decrement(setAdults)}
                                className="counter-btn"
                              >
                                <FaMinus className="text-xs" />
                              </button>
                              <input
                                type="number"
                                value={adults}
                                readOnly
                                className="w-12 text-center"
                              />
                              <button
                                onClick={() => increment(setAdults)}
                                className="counter-btn"
                              >
                                <FaPlus className="text-xs" />
                              </button>
                            </div>
                          </div>

                          {/* Trẻ em */}
                          <div className="flex items-center justify-between">
                            <label className="text-[15px] font-medium text-gray-700">
                              Trẻ em
                            </label>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => decrement(setChildren)}
                                className="counter-btn"
                              >
                                <FaMinus className="text-xs" />
                              </button>
                              <input
                                type="number"
                                value={children}
                                readOnly
                                className="w-12 text-center"
                              />
                              <button
                                onClick={() => increment(setChildren)}
                                className="counter-btn"
                              >
                                <FaPlus className="text-xs" />
                              </button>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => setIsOpen(false)}
                          className="w-full mt-4 bg-[#0460B196] text-white py-2 px-4 rounded hover:bg-[#0460B1] transition-colors"
                        >
                          Xác nhận
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <button className="bg-[#0460B196] text-[#FFFFFF] font-bold w-full h-[47px] mt-2">
                  Cập nhật
                </button>
                <div className="mt-6">
                  <div className="flex items-center">
                    <span className="text-lg font-semibold">3.7</span>
                    <span className="text-muted-foreground ml-2">
                      Địa điểm được đánh giá cao
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Hơn 90% những đánh giá tích cực
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Địa điểm dễ dàng xác nhận
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Không gian thân thiện
                  </p>
                  <button className="mt-2 text-blue-500 hover:underline">
                    Show on Map
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="option my-7">
            <h1 className="text-xl md:text-2xl text-[#000000CC] mb-6 font-bold">
              Chọn Phòng
            </h1>
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="border rounded shadow-md w-full mb-5">
                <p className="bg-[#F5A52DBA] w-[138px] h-[21px] float-right text-center rounded text-xs p-1 m-2 text-[#FFFFFF]">
                  Rẻ nhất hôm nay
                </p>
                <div className="flex flex-col md:flex-row gap-4 md:gap-8 p-4">
                  <div className="w-full md:w-1/4">
                    <img
                      src="src/upload/pr1.png"
                      alt=""
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <p className="text-[15px] font-bold mb-3">Giường đôi</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="flex items-center mb-1">
                          <LayoutGrid className="w-4 h-4 mr-1 text-[#022747BD]" />
                          <span className="text-[#022747BD] text-[13px] md:text-[15px]">
                            15m2
                          </span>
                        </div>
                        <div className="flex items-center mb-1">
                          <Wifi className="w-4 h-4 mr-1 text-[#022747BD]" />
                          <span className="text-[#022747BD] text-[13px] md:text-[15px]">
                            Wifi miễn phí
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center mb-1">
                          <Bed className="w-4 h-4 mr-1 text-[#022747BD]" />
                          <span className="text-[#022747BD] text-[13px] md:text-[15px]">
                            2 giường đơn
                          </span>
                        </div>
                        <div className="flex items-center mb-1">
                          <Bath className="w-4 h-4 mr-1 text-[#022747BD]" />
                          <span className="text-[#022747BD] text-[13px] md:text-[15px]">
                            Vòi sen và bồn tắm
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={openModal}
                      className="text-[#022747BD] text-[12px] hover:underline focus:outline-none mt-2"
                    >
                      Ảnh phòng và chi tiết
                    </button>
                  </div>
                  <div className="w-full md:w-1/4 mt-4 md:mt-0">
                    <div>
                      <span className="text-xl md:text-2xl font-bold">
                        899.000₫
                      </span>
                      <span className="text-gray-600 text-sm">/đêm</span>
                    </div>
                    <button className="border-[#0460B196] rounded border text-[#000000] font-bold w-full h-[47px] mt-2 hover:bg-[#0460B196]">
                      Cập nhật
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* modal detail */}

          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
              <div className="bg-white p-6 rounded-lg w-full max-w-[800px] relative">
                <button
                  className="absolute top-2 right-2 text-black text-xl"
                  onClick={closeModal}
                >
                  <X />
                </button>
                <h2 className="text-xl font-bold mb-4">Chi tiết ảnh phòng</h2>
                <div className="flex flex-wrap justify-around gap-2">
                  {roomImages.map((image, index) => (
                    <img
                      key={index}
                      className="w-[100px] md:w-[200px] h-[75px] md:h-[150px] object-cover"
                      src={image}
                      alt={`Room ${index + 1}`}
                    />
                  ))}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3">
                  <div className="flex items-center mb-1">
                    <Wifi className="w-4 h-4 mr-1 text-[#022747BD]" />
                    <span className="text-[#022747BD] text-[13px] md:text-[15px]">
                      Wifi miễn phí
                    </span>
                  </div>
                  <div className="flex items-center mb-1">
                    <Bath className="w-4 h-4 mr-1 text-[#022747BD]" />
                    <span className="text-[#022747BD] text-[13px] md:text-[15px]">
                      Vòi Hoa sen Và Bồn Tắm
                    </span>
                  </div>
                  <div className="flex items-center mb-1">
                    <Snowflake className="w-4 h-4 mr-1 text-[#022747BD]" />
                    <span className="text-[#022747BD] text-[13px] md:text-[15px]">
                      Điều Hòa
                    </span>
                  </div>
                  <div className="flex items-center mb-1">
                    <WashingMachine className="w-4 h-4 mr-1 text-[#022747BD]" />
                    <span className="text-[#022747BD] text-[13px] md:text-[15px]">
                      Máy giặt
                    </span>
                  </div>
                  <div className="flex items-center mb-1">
                    <Armchair className="w-4 h-4 mr-1 text-[#022747BD]" />
                    <span className="text-[#022747BD] text-[13px] md:text-[15px]">
                      Bàn Ghế
                    </span>
                  </div>
                  <div className="flex items-center mb-1">
                    <Martini className="w-4 h-4 mr-1 text-[#022747BD]" />
                    <span className="text-[#022747BD] text-[13px] md:text-[15px]">
                      Mini Bar
                    </span>
                  </div>
                  <div className="flex items-center mb-1">
                    <Dumbbell className="w-4 h-4 mr-1 text-[#022747BD]" />
                    <span className="text-[#022747BD] text-[13px] md:text-[15px]">
                      Phòng Gym
                    </span>
                  </div>
                  <div className="flex items-center mb-1">
                    <HandPlatter className="w-4 h-4 mr-1 text-[#022747BD]" />
                    <span className="text-[#022747BD] text-[13px] md:text-[15px]">
                      Nhà Hàng
                    </span>
                  </div>
                  <div className="flex items-center mb-1">
                    <Coffee className="w-4 h-4 mr-1 text-[#022747BD]" />
                    <span className="text-[#022747BD] text-[13px] md:text-[15px]">
                      Càfe
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="Evaluate">
            <Evaluate />
          </div>
          <div className="allEvaluate">
            <AllEvaluate />
          </div>
          <div className="FormCmt">
            <FormCmt />
          </div>
          <div className="similarHotel">
            <CardCarousel />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDT;
