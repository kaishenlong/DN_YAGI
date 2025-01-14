import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ICities, IHotel } from "../../interface/hotel"; // Import your FormData type
import { hotelCT } from "../../context/hotel"; // Import your context
import { getallCitys } from "../../services/cities";
import { useParams } from "react-router-dom";
import { GetHotelByID } from "../../services/hotel";

const EditHotels = () => {
  const { onUpdate } = useContext(hotelCT); // Assuming onAdd is used to add the hotel
  const [city, setCity] = useState<ICities[]>([]); // For categories or any other needed data
  const [hotelData, setHotelData] = useState<IHotel | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IHotel>(); // Using the FormData type for form handling
  const param = useParams();
  useEffect(() => {
    (async () => {
      const hotel = await GetHotelByID(param?.id as number | string);
      setHotelData(hotel);
      reset(hotel);
    })();
  }, []);
  // Function to handle form submission
  const onsubmit = (data: IHotel) => {
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

    // Thêm _method để Laravel hiểu là PUT
    formData.append("_method", "PUT");

    // In ra FormData (để kiểm tra các giá trị)
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    // Gọi hàm onUpdate với formData và id
    onUpdate(formData, param?.id as number | string);
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await getallCitys();
        console.log("Fetched cities data:", data); // Check format
        setCity(data.data);
      } catch (error) {
        alert("Error fetching cities");
      }
    })();
  }, []);

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Thêm mới khách sạn
        </h1>
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="flex gap-4 flex-col max-w-md mx-auto bg-gray-100 dark:bg-gray-700 text-white p-6 rounded-lg shadow-md"
        >
          {/* Name Input */}
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Tên khách sạn"
              {...register("name", { required: true, minLength: 6 })}
              className="border p-2 text-black bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <span className="text-red-600 text-sm mt-1">
                Tên không để trống và phải lớn hơn 6 kí tự
              </span>
            )}
          </div>
          {/* Address Input */}
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Địa chỉ"
              {...register("address", { required: true })}
              className="border p-2 text-black bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.address && (
              <span className="text-red-600 text-sm mt-1">
                Địa chỉ không được để trống
              </span>
            )}
          </div>
          {/* map Input */}
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Bản Đồ"
              {...register("map", { required: true })}
              className="border p-2 text-black bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.address && (
              <span className="text-red-600 text-sm mt-1">
                Địa chỉ không được để trống
              </span>
            )}
          </div>
          {/* Email Input */}
          <div className="flex flex-col">
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
              className="border p-2 text-black bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <span className="text-red-600 text-sm mt-1">
                Email không được để trống
              </span>
            )}
          </div>

          {/* Phone Input */}
          <div className="flex flex-col">
            <input
              type="tel"
              placeholder="Số điện thoại"
              {...register("phone", { required: true })}
              className="border p-2 text-black bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.phone && (
              <span className="text-red-600 text-sm mt-1">
                Số điện thoại không được để trống
              </span>
            )}
          </div>
          {/* rating */}
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="rating"
              {...register("rating", { required: true })}
              className="border p-2 text-black bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.phone && (
              <span className="text-red-600 text-sm mt-1">
                Số điện thoại không được để trống
              </span>
            )}
          </div>

          {/* Description Input */}
          <div className="flex flex-col">
            <textarea
              placeholder="Mô tả"
              {...register("description", { required: true })}
              className="border p-2 text-black bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.description && (
              <span className="text-red-600 text-sm mt-1">
                Mô tả không được để trống
              </span>
            )}
          </div>

          {/* Image Input */}
          <div className="flex flex-col">
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="border p-2 text-black bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Display the image */}
          {register("image") && hotelData && (
            <img
              src={`http://localhost:8000/storage/${hotelData.image}`}
              alt="Hotel Image"
              className="w-40 h-40 object-cover"
            />
          )}

          {/* Status Input */}
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Status"
              {...register("status")}
              className="border p-2 text-black bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* id user */}
          <div className="flex flex-col">
            <input
              type="hidden"
              placeholder="id user"
              {...register("user_id")}
              className="border p-2 text-black bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* city input */}
          <div className="flex flex-col">
            <select
              {...register("city_id", { required: true })}
              className="border text-black p-2 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>chọn tỉnh thành</option>
              {city.map((citys: ICities) => (
                <option key={citys.id} value={citys.id}>
                  {citys.name}
                </option>
              ))}
            </select>
            {errors.city_id && (
              <span className="text-red-600 text-sm mt-1">
                Danh mục không được để trống
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-black py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Sửa mới
          </button>
        </form>
      </div>
    </>
  );
};

export default EditHotels;
