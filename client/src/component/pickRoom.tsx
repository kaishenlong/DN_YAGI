import {
  Armchair,
  Bath,
  Bed,
  Coffee,
  Dumbbell,
  HandPlatter,
  LayoutGrid,
  Martini,
  Snowflake,
  WashingMachine,
  Wifi,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { IRoomsDetail, IType_Room } from "../interface/room";
import { getallTypeRoom } from "../service/typeRoom";
import { getallRoom } from "../service/room";
import { Link, useParams } from "react-router-dom";
const RoomCategory = () => {
  const { id } = useParams<{ id: string }>(); // Lấy id của hotel từ URL
  const [filteredRooms, setFilteredRooms] = useState<IRoomsDetail[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [types, setType] = useState<IType_Room[]>([]);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    (async () => {
      try {
        const allRoomsResponse = await getallRoom(); // Gọi API
        const allRooms = allRoomsResponse.data; // Lấy mảng từ trường `data`
        const roomsByHotel = allRooms.filter(
          (room: IRoomsDetail) => room.hotel_id === Number(id)
        ); // Lọc danh sách phòng
        console.log("Danh sách phòng:", roomsByHotel);
        setFilteredRooms(roomsByHotel); // Cập nhật danh sách phòng đã lọc
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu phòng:", error);
        alert("Lỗi khi lấy dữ liệu phòng.");
      }
    })();
  }, [id]);

  useEffect(() => {
    // Lấy danh sách loại phòng
    (async () => {
      try {
        const typeData = await getallTypeRoom();
        setType(typeData.data);
      } catch (error) {
        alert("Lỗi khi lấy dữ liệu kiểu phòng");
      }
    })();
  }, []);
  return (
    <>
      <div className="option my-7">
        <h1 className="text-xl md:text-2xl text-[#000000CC] mb-6 font-bold">
          Chọn Phòng
        </h1>
        {filteredRooms.map((room: IRoomsDetail) => (
          <div key={room.id} className="border rounded shadow-md w-full mb-5">
            <p className="bg-[#F5A52DBA] w-[138px] h-[21px] float-right text-center rounded text-xs p-1 m-2 text-[#FFFFFF]">
              Rẻ nhất hôm nay
            </p>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 p-4">
              <div className="w-full md:w-1/4">
                <img
                  src={
                    room.image
                      ? `http://localhost:8000/storage/${room.image}`
                      : "/placeholder-image.jpg" // Đường dẫn tới ảnh mặc định
                  }
                  className="w-full h-48 object-cover rounded-t"
                />
              </div>
              <div className="w-full md:w-1/2">
                <p className="text-[15px] font-bold mb-3">
                  {types.find((TypeR) => TypeR.id === room.room_id)
                    ?.type_room || "Unknown Type Room"}
                </p>
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
                    {new Intl.NumberFormat().format(room.into_money)}
                  </span>
                  <span className="text-gray-600 text-sm">/đêm</span>
                </div>
                <button className="border-[#0460B196] rounded border text-[#000000] font-bold w-full h-[47px] mt-2 hover:bg-[#0460B196]">
                  <Link to={`/room/${room.id}`} className="">
                    Đặt ngay
                  </Link>{" "}
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
            <div className="flex justify-center">
              {/* show ảnh */}
              <img
                className="w-auto md:w-auto h-auto md:h-[150px] object-cover rounded-lg shadow-md"
                src={
                  filteredRooms[0].image
                    ? `http://localhost:8000/storage/${filteredRooms[0].image}`
                    : "/placeholder-image.jpg" // Đường dẫn tới ảnh mặc định
                }
              />
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
    </>
  );
};

export default RoomCategory;
