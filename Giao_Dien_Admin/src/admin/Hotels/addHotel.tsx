import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ICities, IHotel } from "../../interface/hotel"; // Nhập loại FormData của bạn
import { hotelCT } from "../../context/hotel"; // Nhập context của bạn
import { getallCitys } from "../../services/cities";

const AddHotels = () => {
  const { onAdd } = useContext(hotelCT); // Giả sử onAdd dùng để thêm khách sạn
  const [city, setCity] = useState<ICities[]>([]); // Sửa lại kiểu dữ liệu cho thành phố

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IHotel>(); // Sử dụng kiểu IHotel cho form

  // Hàm xử lý khi gửi form
  const onSubmit = (data: IHotel) => {
    const formData = new FormData();

    // Thêm tất cả các trường vào FormData
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("rating", data.rating.toString()); // Đảm bảo rating là chuỗi
    formData.append("description", data.description);
    formData.append("map", data.map);
    formData.append("status", data.status);
    formData.append("user_id", data.user_id.toString()); // Đảm bảo user_id là chuỗi
    formData.append("city_id", data.city_id.toString()); // Đảm bảo city_id là chuỗi

    // Thêm ảnh vào FormData nếu có
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    console.log("FormData gửi đi:", formData);
    onAdd(formData); // Giả sử onAdd là một hàm xử lý form data
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await getallCitys();
        console.log("Dữ liệu thành phố đã lấy:", data); // Kiểm tra dữ liệu
        setCity(data.data);
      } catch (error) {
        alert("Lỗi khi lấy dữ liệu thành phố");
      }
    })();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Thêm mới khách sạn
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-4 flex-col max-w-md mx-auto bg-gray-100 dark:bg-gray-700 text-white p-6 rounded-lg shadow-md"
      >
        {/* Tên khách sạn */}
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Tên khách sạn"
            {...register("name", {
              required: "Tên không để trống",
              minLength: { value: 6, message: "Tên phải dài hơn 6 ký tự" },
            })}
            className="border p-2 text-black bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <span className="text-red-600 text-sm mt-1">
              {errors.name.message}
            </span>
          )}
        </div>

        {/* Địa chỉ */}
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Địa chỉ"
            {...register("address", {
              required: "Địa chỉ không được để trống",
            })}
            className="border p-2 text-black bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.address && (
            <span className="text-red-600 text-sm mt-1">
              {errors.address.message}
            </span>
          )}
        </div>

        {/* Bản đồ */}
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Bản đồ"
            {...register("map", { required: "Bản đồ không được để trống" })}
            className="border p-2 text-black bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.map && (
            <span className="text-red-600 text-sm mt-1">
              {errors.map.message}
            </span>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email không được để trống" })}
            className="border p-2 text-black bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <span className="text-red-600 text-sm mt-1">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Số điện thoại */}
        <div className="flex flex-col">
          <input
            type="tel"
            placeholder="Số điện thoại"
            {...register("phone", {
              required: "Số điện thoại không được để trống",
            })}
            className="border p-2 text-black bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phone && (
            <span className="text-red-600 text-sm mt-1">
              {errors.phone.message}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex flex-col">
          <input
            type="number"
            placeholder="Rating"
            {...register("rating", { required: "Rating không được để trống" })}
            className="border p-2 text-black bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.rating && (
            <span className="text-red-600 text-sm mt-1">
              {errors.rating.message}
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

        {/* Trạng thái */}
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Trạng thái (tùy chọn)"
            {...register("status")}
            className="border p-2 text-black bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* ID người dùng */}
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="ID người dùng (tùy chọn)"
            {...register("user_id")}
            className="border p-2 text-black bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Thành phố */}
        <div className="flex flex-col">
          <select
            {...register("city_id", { required: "Vui lòng chọn thành phố" })}
            className="border text-black p-2 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Chọn tỉnh thành</option>
            {city.map((cityItem) => (
              <option key={cityItem.id} value={cityItem.id}>
                {cityItem.name}
              </option>
            ))}
          </select>
          {errors.city_id && (
            <span className="text-red-600 text-sm mt-1">
              {errors.city_id.message}
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

export default AddHotels;
