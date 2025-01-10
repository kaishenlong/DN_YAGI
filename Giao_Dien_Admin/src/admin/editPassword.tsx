import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { UserCT } from "../context/user";
import { User } from "../interface/user";
import { GetUserByID } from "../services/user";

const EditPassword = () => {
  const { onUpdatePass } = useContext(UserCT); // Sử dụng context cho cập nhật mật khẩu
  const [loading, setLoading] = useState(false); // Quản lý trạng thái loading
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Quản lý lỗi
  const { id } = useParams<{ id: string }>(); // Lấy ID từ URL

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ password: string }>(); // Sử dụng kiểu dữ liệu chỉ cần cho password

  // Lấy thông tin user ban đầu
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await GetUserByID(id!);
        reset({ password: "" }); // Reset form (không cần hiển thị mật khẩu cũ vì đây là form đặt mật khẩu mới)
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
        setErrorMessage("Không thể tải thông tin người dùng.");
      }
    };
    fetchUser();
  }, [id, reset]);

  // Hàm xử lý submit form
  const onSubmit = async (data: { password: string }) => {
    if (!id) return; // Bảo vệ trường hợp ID không hợp lệ
    setLoading(true);
    setErrorMessage(null);
    try {
      await onUpdatePass({ password: data.password }, id);
      alert("Cập nhật mật khẩu thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật mật khẩu:", error);
      setErrorMessage("Không thể cập nhật mật khẩu. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800 dark:text-white">
        Sửa mật khẩu
      </h1>
      {errorMessage && (
        <p className="text-red-600 text-center mb-4">{errorMessage}</p>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-4 flex-col max-w-md mx-auto bg-white dark:bg-gray-800 text-black dark:text-white p-8 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:scale-105"
      >
        {/* Nhập mật khẩu mới */}
        <div className="flex flex-col mb-4">
          <label
            htmlFor="password"
            className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
          >
            Mật khẩu mới
          </label>
          <input
            id="password"
            type="password"
            placeholder="Nhập mật khẩu mới"
            {...register("password", {
              required: "Mật khẩu không được để trống.",
              minLength: {
                value: 8,
                message: "Mật khẩu phải có ít nhất 8 ký tự.",
              },
            })}
            className="border border-gray-300 dark:border-gray-600 p-3 text-black dark:text-white bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          />
          {errors.password && (
            <span className="text-red-600 text-sm mt-1">
              {errors.password.message}
            </span>
          )}
        </div>

        {/* Nút gửi */}
        <button
          type="submit"
          disabled={loading}
          className={`py-2 px-4 rounded-md text-white font-semibold transition duration-300 focus:outline-none ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Đang xử lý..." : "Sửa mật khẩu"}
        </button>
      </form>
    </div>
  );
};

export default EditPassword;
