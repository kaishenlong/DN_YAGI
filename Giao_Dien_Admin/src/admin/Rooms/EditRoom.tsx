import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { IHotel } from "../../interface/hotel";
import { IRoomsDetail, IType_Room } from "../../interface/rooms";
import { roomCT } from "../../context/room";
import { getallHotels } from "../../services/hotel";
import { getallTypeRoom } from "../../services/typeRoom";
import { getRoomById } from "../../services/Rooms";

const UpdateRooms = () => {
  const { id } = useParams(); // Sử dụng 'id' thay vì 'roomId'
  const { onUpdate } = useContext(roomCT); // Hàm cập nhật phòng từ context
  const [typeRoom, setTypeR] = useState<IType_Room[]>([]);
  const [hotels, setHotel] = useState<IHotel[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IRoomsDetail>();

  useEffect(() => {
    (async () => {
      try {
        const roomData = await getRoomById(id as string | number);
        console.log("Room data:", roomData); // Kiểm tra dữ liệu trả về

        // Đổ dữ liệu vào form nếu API trả về dữ liệu hợp lệ
        if (roomData) {
          setValue("room_id", roomData.room_id);
          setValue("hotel_id", roomData.hotel_id);
          setValue("price", roomData.price);
          setValue("price_surcharge", roomData.price_surcharge);
          setValue("available_rooms", roomData.available_rooms); // Sửa từ 'available_rooms' thành 'available' để khớp với dữ liệu trả về
          setValue("description", roomData.description);
        }
      } catch (error) {
        alert("Lỗi khi lấy dữ liệu phòng!");
        console.error("Error fetching room data:", error);
      }
    })();

    // Lấy danh sách kiểu phòng
    (async () => {
      const typeRoomData = await getallTypeRoom();
      setTypeR(typeRoomData.data);
      reset(typeRoomData.data);
    })();

    // Lấy danh sách khách sạn
    (async () => {
      const hotelData = await getallHotels();
      setHotel(hotelData.data);
      reset(hotelData.data);
    })();
  }, [id, setValue]);

  // Xử lý khi gửi form
  const onSubmit = (data: IRoomsDetail) => {
    const formData = new FormData();

    // Thêm tất cả các trường vào FormData
    formData.append("room_id", data.room_id.toString());
    formData.append("hotel_id", data.hotel_id.toString());
    formData.append("price", data.price.toString());
    formData.append("price_surcharge", data.price_surcharge.toString());
    formData.append("available_rooms", data.available_rooms.toString()); // Sửa từ 'available' thành 'available_rooms' để khớp với tên trường trong form
    formData.append("description", data.description);
    // Thêm ảnh vào FormData nếu có
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }
    // Thêm _method để Laravel hiểu là PUT
    formData.append("_method", "PUT");

    // In ra FormData (để kiểm tra các giá trị)
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    console.log("FormData gửi đi:", formData);
    onUpdate(formData, id as number | string); // Gửi dữ liệu cập nhật với 'id'
  };

  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-6 text-center">Cập nhật phòng</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-4 flex-col max-w-md mx-auto bg-gray-100 dark:bg-gray-700 text-white p-6 rounded-lg shadow-md"
      >
        {/* Type room */}
        <div className="flex flex-col">
          <select
            {...register("room_id", { required: "Vui lòng chọn kiểu phòng" })}
            className="border text-black p-2 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Chọn type room</option>
            {typeRoom.map((TypeR) => (
              <option key={TypeR.id} value={TypeR.id}>
                {TypeR.type_room}
              </option>
            ))}
          </select>
          {errors.room_id && (
            <span className="text-red-600 text-sm mt-1">
              {errors.room_id.message}
            </span>
          )}
        </div>

        {/* hotel */}
        <div className="flex flex-col">
          <select
            {...register("hotel_id", { required: "Vui lòng chọn khách sạn" })}
            className="border text-black p-2 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Chọn khách sạn</option>
            {hotels.map((Hotels) => (
              <option key={Hotels.id} value={Hotels.id}>
                {Hotels.name}
              </option>
            ))}
          </select>
          {errors.hotel_id && (
            <span className="text-red-600 text-sm mt-1">
              {errors.hotel_id.message}
            </span>
          )}
        </div>

        {/* giá */}
        <div className="flex flex-col">
          <input
            type="number"
            placeholder="Giá"
            {...register("price", {
              required: "Giá không được để trống",
              min: { value: 0, message: "Giá không được âm" },
            })}
            className="border p-2 text-black bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.price && (
            <span className="text-red-600 text-sm mt-1">
              {errors.price.message}
            </span>
          )}
        </div>

        {/* giá thay đổi */}
        <div className="flex flex-col">
          <input
            type="number"
            placeholder="price_surcharge"
            {...register("price_surcharge", {
              required: "price_surcharge không được để trống",
              min: { value: 0, message: "Giá không được âm" },
            })}
            className="border p-2 text-black bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.price_surcharge && (
            <span className="text-red-600 text-sm mt-1">
              {errors.price_surcharge.message}
            </span>
          )}
        </div>

        {/* available */}
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="available_rooms"
            {...register("available_rooms", {
              required: "available_rooms không được để trống",
            })}
            className="border p-2 text-black bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.available_rooms && (
            <span className="text-red-600 text-sm mt-1">
              {errors.available_rooms.message}
            </span>
          )}
        </div>

        {/* Mô tả */}
        <div className="flex flex-col">
          <textarea
            placeholder="Mô tả"
            {...register("description", {
              required: "Mô tả không được để trống",
            })}
            className="border p-2 text-black bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.description && (
            <span className="text-red-600 text-sm mt-1">
              {errors.description.message}
            </span>
          )}
        </div>

        {/* Trường ảnh */}
        <div className="flex flex-col">
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            className="border p-2 text-black bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Nút Submit */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
};

export default UpdateRooms;
