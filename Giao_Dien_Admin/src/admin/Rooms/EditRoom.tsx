import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IHotel } from "../../interface/hotel"; // Nhập loại FormData của bạn
import { FormRoom, IType_Room } from "../../interface/rooms";
import { roomCT } from "../../context/room";
import { getallHotels } from "../../services/hotel";
import { getallTypeRoom } from "../../services/typeRoom";
import { GetRoomByID } from "../../services/Rooms";
import { useParams } from "react-router-dom";

const EditRooms = () => {
  const { onUpdate } = useContext(roomCT);
  const [typeRoom, setTypeR] = useState<IType_Room[]>([]);
  const [hotels, setHotel] = useState<IHotel[]>([]);
  const param = useParams();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  console.log(hotels, "hahaha");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormRoom>();
  useEffect(() => {
    (async () => {
      const room = await GetRoomByID(param?.id as number | string);

      // console.log(param?.id);
      reset({
        room_id: room.room_id,
        hotel_id: room.hotel_id,
        price: room.price,
        price_surcharge: room.price_surcharge,
        available: room.available,
        into_money: room.into_money,
        description: room.description,
        image: room.image,
      });
    })();
  }, [param?.id, reset]);
  // Hàm xử lý khi gửi form
  const onsubmit = (data: FormRoom) => {
    onUpdate(data, param?.id as number | string);
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
        onSubmit={handleSubmit(onsubmit)}
        className="flex gap-4 flex-col max-w-md mx-auto bg-gray-100 dark:bg-gray-700 text-white p-6 rounded-lg shadow-md"
      >
        {/* Type room */}
        <div className="flex flex-col">
          <select
            {...register("room_id", { required: "Vui lòng chọn kiểu phòng" })}
            className="border text-black p-2 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
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
        {/* Ảnh */}
        {/* <div className="flex flex-col">
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: "Vui lòng chọn ảnh" })}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setImagePreview(reader.result as string);
                };
                reader.readAsDataURL(file);
              }
            }}
            className="border p-2 text-black bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.image && (
            <span className="text-red-600 text-sm mt-1">
              {errors.image.message}
            </span>
          )}
          {imagePreview && <img src={imagePreview} alt="Preview" />}
        </div> */}

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
            placeholder="Available"
            {...register("available", {
              required: "available không được để trống",
            })}
            className="border p-2 text-black bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.available && (
            <span className="text-red-600 text-sm mt-1">
              {errors.available.message}
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

        {/* Trạng thái */}
        <div className="flex flex-col">
          <input
            type="number"
            placeholder="Giá"
            {...register("into_money", {
              required: "Giá không được để trống",
              min: { value: 0, message: "Giá không được âm" },
            })}
            className="border p-2 text-black bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.into_money && (
            <span className="text-red-600 text-sm mt-1">
              {errors.into_money.message}
            </span>
          )}
        </div>

        {/* Nút Submit */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Cập Nhật
        </button>
      </form>
    </div>
  );
};

export default EditRooms;
