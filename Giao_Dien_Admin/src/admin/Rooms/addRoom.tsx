import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IHotel } from "../../interface/hotel"; // Nhập loại FormData của bạn
import { IRoomsDetail, IType_Room } from "../../interface/rooms";
import { roomCT } from "../../context/room";
import { getallHotels } from "../../services/hotel";
import { getallTypeRoom } from "../../services/typeRoom";

const AddRooms = () => {
  const { onAdd } = useContext(roomCT); // Giả sử onAdd dùng để thêm khách sạn
  const [typeRoom, setTypeR] = useState<IType_Room[]>([]);
  const [hotels, setHotel] = useState<IHotel[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRoomsDetail>(); // Sử dụng kiểu IHotel cho form

  // Hàm xử lý khi gửi form
  const onSubmit = (data: IRoomsDetail) => {
    const formData = new FormData();

    // Thêm tất cả các trường vào FormData
    formData.append("room_id", data.room_id.toString());
    formData.append("hotel_id", data.hotel_id.toString());
    formData.append("price", data.price.toString());
    formData.append("price_surcharge", data.price_surcharge.toString());
    formData.append("available_rooms", data.available_rooms.toString());
    formData.append("description", data.description);

    // Thêm ảnh vào FormData nếu có
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    console.log("FormData gửi đi:", formData);
    onAdd(formData); // Giả sử onAdd là một hàm xử lý form data
    console.log("Thông tin đẩy lên DB:", data); // Log thông tin được đẩy lên DB
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await getallHotels();
        console.log("Dữ liệu hotel đã lấy:", data); // Kiểm tra dữ liệu
        setHotel(data.data);
      } catch (error) {
        alert("Lỗi khi lấy dữ liệu thành phố");
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const data = await getallTypeRoom();
        console.log("Dữ liệu type room đã lấy:", data); // Kiểm tra dữ liệu
        setTypeR(data.data);
      } catch (error) {
        alert("Lỗi khi lấy dữ liệu thành phố");
      }
    })();
  }, []);

  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Thêm mới khách sạn
      </h1>
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
        {/* Ảnh */}
        <div className="flex flex-col">
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: "Vui lòng chọn ảnh" })}
            className="border p-2 text-black bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.image && (
            <span className="text-red-600 text-sm mt-1">
              {errors.image.message}
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

        {/* Nút Submit */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Thêm mới
        </button>
      </form>
    </div>
  );
};

export default AddRooms;
