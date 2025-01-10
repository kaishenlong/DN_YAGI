import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormCites, ICities } from "../../interface/hotel";
import { CitiesCT } from "../../context/cities";
import { useParams } from "react-router-dom";
import { GetCitiesByID } from "../../services/cities";

const EditCities = () => {
  const { onUpdate } = useContext(CitiesCT);
  const [cityData, setCityData] = useState<FormCites | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICities>();
  const param = useParams();
  console.log(cityData);

  useEffect(() => {
    (async () => {
      const city = await GetCitiesByID(param?.id as number | string);
      console.log(city);
      setCityData(city);
      reset(city);
    })();
  }, []);

  const onsubmit = (data: ICities) => {
    const formData = new FormData();
    formData.append("name", data.name);

    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]); // Append selected file if available
    }

    formData.append("_method", "PUT");

    onUpdate(formData, param?.id as number | string);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Sửa thông tin thành phố
      </h1>
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="flex gap-4 flex-col max-w-md mx-auto bg-gray-100 dark:bg-gray-700 text-white p-6 rounded-lg shadow-md"
      >
        {/* Name Input */}
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Tên thành phố"
            {...register("name", {
              required: "Tên không được để trống",
              minLength: {
                value: 6,
                message: "Tên phải có ít nhất 6 ký tự",
              },
            })}
            className="border p-2 text-black bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <span className="text-red-600 text-sm mt-1">
              {errors.name.message}
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
        {cityData?.image && (
          <div className="flex justify-center mt-4">
            <img
              src={`http://localhost:8000/storage/${cityData.image}`}
              alt="City Image"
              className="w-40 h-40 object-cover rounded-md"
            />
          </div>
        )}

        {/* Submit Button */}
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

export default EditCities;
