import React, { useContext } from "react";

import { useForm } from "react-hook-form";
import { FormCites } from "../../interface/hotel";
import { CitiesCT } from "../../context/cities";

const AddCities = () => {
  const { onAdd } = useContext(CitiesCT);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormCites>();
  const onsubmit = (data: FormCites) => {
    onAdd(data);
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
              {...register("name", { required: true, minLength: 6 })}
              className="border p-2 text-white whitespace-nowrap bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none  focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <span className="text-red-600 text-sm mt-1">
                Tên không để trống và lớn hơn 6 kí tự
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

export default AddCities;
