import React, { useState, useEffect } from "react";
import { FaUserCircle, FaEdit, FaSave, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../config/axios";
import { toast } from "react-toastify";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
};

type Props = {
  user: User;
  onLogout: () => void;
};

const UserProfile: React.FC<Props> = ({ user, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User>(user);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (storedUser) {
      setFormData(storedUser);
    } else {
      setFormData(user);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.put(`/api/users/${formData.id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(formData));
        setIsEditing(false);
        toast.info("Chỉnh sửa thành công.");

        console.log("Updated user data:", formData);
      } else {
        console.error(
          "Failed to update user data:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleLogout = async () => {
    await onLogout();
    navigate("/");
  };

  return (
    <div className="w-full">
      <div className="relative h-[300px]">
        <div
          style={{
            backgroundImage: 'url("src/upload/profile-bg.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="absolute w-full h-[300px]"
        >
          <div className="absolute ml-10 top-[50px] text-white text-[20px]">
            <Link to={"/"}> Quay lại</Link>
          </div>
          <div className="flex flex-col items-center justify-center h-full bg-lime-950 text-white">
            <FaUserCircle className="text-[120px]" />
            <h2 className="text-3xl mt-2">{`${formData.name}`}</h2>
          </div>
        </div>
      </div>
      <div className="content mt-[150px]">
        <div className="max-w-6xl mx-auto p-4">
          <h2 className="text-xl font-semibold mb-4">Thông tin tài khoản</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="name" className="block mb-1">
                  Họ và tên
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block mb-1">
                Số điện thoại
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="address" className="block mb-1">
                Địa chỉ
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="flex justify-between mt-4">
              {isEditing ? (
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
                >
                  <FaSave className="mr-2" />
                  Lưu thay đổi
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleEdit}
                  className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
                >
                  <FaEdit className="mr-2" />
                  Chỉnh sửa
                </button>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center"
              >
                <FaSignOutAlt className="mr-2" />
                Đăng xuất
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
