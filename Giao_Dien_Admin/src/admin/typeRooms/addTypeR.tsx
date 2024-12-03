import React, { useContext } from "react";

import { useForm } from "react-hook-form";
import { TypeRoomCT } from "../../context/typeRoom";
import { FormTypeRoom } from "../../interface/rooms";

const AddTypeRoom = () => {
  const { onAdd } = useContext(TypeRoomCT);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormTypeRoom>();
  const onsubmit = (data: FormTypeRoom) => {
    onAdd(data);
  };
  return (
    <>
      <div className="">
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
              {...register("type_room", { required: true, minLength: 6 })}
              className="border p-2 text-black whitespace-nowrap bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none  focus:ring-2 focus:ring-blue-500"
            />
            {errors.type_room && (
              <span className="text-red-600 text-sm mt-1">
                Tên không để trống và lớn hơn 6 kí tự
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <input
              type="number"
              placeholder="Số giường"
              {...register("bed", { required: true, min: 0 })}
              className="border p-2 text-black whitespace-nowrap bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none  focus:ring-2 focus:ring-blue-500"
            />
            {errors.bed && (
              <span className="text-red-600 text-sm mt-1">
                Số giường không được để trống và không âm
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

export default AddTypeRoom;
