import React, { useEffect, useState } from "react";
import Evaluate from "./Evaluate";
import FormCmt from "./formCmt";
import { FaChevronDown, FaMinus, FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { IHotel } from "../interface/hotel";
import { Heart, MapPin, Share } from "lucide-react";
import { GetHotelByID } from "../service/hotel";
import RoomCategory from "./pickRoom";
import AllEvaluate from "./allEvaluate";

const ProductDT = () => {
  // const { rooms } = useContext(roomCT);
  // const [isOpen, setIsOpen] = useState(false);
  // const [adults, setAdults] = useState(1);
  // const [children, setChildren] = useState(0);
  // const totalGuests = adults + children;

  // const increment = (setter: any) => setter((prev: any) => prev + 1);
  // const decrement = (setter: any) =>
  //   setter((prev: any) => (prev > 0 ? prev - 1 : 0));
  // //open modal

  const param = useParams();
  const [hotelData, setHotelData] = useState<IHotel | null>(null);

  useEffect(() => {
    (async () => {
      const hotel = await GetHotelByID(param?.id as number | string);
      setHotelData(hotel);
    })();
  }, []);

  if (!hotelData) {
    return <div>Loading...</div>; // Đợi khi dữ liệu được tải
  }

  console.log("datahotel", hotelData);
  return (
    <>
      <div className="w-full px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="product flex flex-col lg:flex-row justify-start gap-5">
            <div className="cntLeft w-full lg:w-2/3">
              <div className="title mb-3">
                <h1 className="text-2xl md:text-3xl font-bold text-[#242222CC]">
                  {hotelData.name}
                </h1>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2"></MapPin>
                  <p className="text-base md:text-lg">
                    {""}
                    <a
                      href={hotelData.map}
                      className="text-blue-600 hover:underline"
                    >
                      Xem trên bản đồ
                    </a>
                  </p>
                </div>
              </div>
              <div className="relative h-auto">
                <img
                  src={
                    hotelData.image
                      ? `http://localhost:8000/storage/${hotelData.image}`
                      : "/placeholder-image.jpg" // Đường dẫn tới ảnh mặc định
                  }
                  alt={hotelData.name || "No name"}
                  className="w-full h-full object-cover rounded-lg shadow-md"
                  style={{ filter: "brightness(90%)" }} // Tăng độ sáng của ảnh
                />
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2">
                  <p className="text-base">{hotelData.name}</p>
                </div>
              </div>
              <div className="des w-full mt-6">
                <p className="text-2xl md:text-3xl font-bold">Mô tả</p>
                <span className="text-base md:text-lg">
                  {hotelData.description}
                </span>
              </div>
            </div>
          </div>
          <div>
            <RoomCategory />
          </div>
          <div className="Evaluate">
            <Evaluate />
          </div>
          <div className="mb-[20px]">
            <AllEvaluate />
          </div>
          <div className="FormCmt mb-[20px]">
            <FormCmt hotelId={hotelData.id} />
          </div>
          {/* <div className="similarHotel">
            <CardCarousel />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ProductDT;
