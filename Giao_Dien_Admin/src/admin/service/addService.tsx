import React, { useContext } from "react";

import { useForm } from "react-hook-form";
import { ServiceCT } from "../../context/serviceCT";
import { FormService } from "../../interface/service";

const AddService = () => {
  const { onAdd } = useContext(ServiceCT);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormService>();
  const onsubmit = (data: FormService) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price.toString());
    onAdd(formData);
  };
  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Thêm mới Danh mục
        </h1>
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="flex gap-4 flex-col max-w-md mx-auto bg-gray-100 dark:bg-gray-700 text-white p-6 rounded-lg shadow-md"
        >
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Tên Danh mục"
              {...register("name", { required: true, minLength: 1 })}
              className="border p-2 text-black whitespace-nowrap bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none  focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <span className="text-red-600 text-sm mt-1">
                Tên không để trống và lớn hơn 6 kí tự
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
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Thêm mới
          </button>
        </form>
      </div>
    </>
  );
};

export default AddService;
