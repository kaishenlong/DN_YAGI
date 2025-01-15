import React, { useState, useEffect } from "react";
import { FaUserCircle, FaEdit, FaSave, FaSignOutAlt, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../config/axios";
import { toast } from "react-toastify";

type User = {
  id: number;
  name: string;
  phone:  string; 
  address: string;
};

type Props = {
  user: User;
  onLogout: () => void;
};

const UserProfile: React.FC<Props> = ({ user, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User>(user);
  const [originalData, setOriginalData] = useState<User>(user); // Dữ liệu gốc
  const [errors, setErrors] = useState<Partial<User>>({}); // Lưu lỗi validate
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (storedUser) {
      setFormData(storedUser);
    } else {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === 'phone' ? (value) : value }));
    // Xóa lỗi khi người dùng nhập lại
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Hàm validate các trường
  const validateForm = () => {
    const newErrors: Partial<User> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Tên không được để trống.";
    }

    if (!/^\d{10,11}$/.test(formData.phone.trim())) {
      newErrors.phone = "Số điện thoại phải chứa 10-11 chữ số và chỉ gồm các ký tự số.";
    }
    

    if (!formData.address.trim()) {
      newErrors.address = "Địa chỉ không được để trống.";
    }

    setErrors(newErrors);

    // Trả về true nếu không có lỗi
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(originalData); // Khôi phục dữ liệu gốc
    setIsEditing(false);
    setErrors({}); // Xóa lỗi
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Vui lòng sửa lỗi trước khi lưu.");
      return;
    }
    try {
      const response = await api.put(`/api/updateUser/${formData.id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      if (response.status === 201) {
        localStorage.setItem('user', JSON.stringify(formData)); 
        setIsEditing(false);
        toast.info("Chỉnh sửa thành công.");
        console.log("Updated user data:", formData);
      } else {
        console.error('Failed to update user data:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleLogout = async () => {
    await onLogout();
    navigate('/');
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
            <Link to={'/'}> Quay lại</Link>
          </div>
          <div className="flex flex-col items-center justify-center h-full bg-lime-950 text-white">
            <FaUserCircle className="text-[120px]" />
            <h2 className="text-3xl mt-2">{formData.name}</h2>
          </div>
        </div>
      </div>
      <div className="content mt-[150px]">
        <div className="max-w-6xl mx-auto p-4">
          <h2 className="text-xl font-semibold mb-4">Thông tin tài khoản</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1">Họ và tên</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border rounded"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="block mb-1">Số điện thoại</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border rounded"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>
            <div>
              <label htmlFor="address" className="block mb-1">Địa chỉ</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border rounded"
              />
              {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
            </div>
            <div className="flex justify-between mt-4">
              {isEditing ? (
                <>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
                  >
                    <FaSave className="mr-2" />
                    Lưu thay đổi
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 flex items-center"
                  >
                    <FaTimes className="mr-2" />
                    Hủy
                  </button>
                </>
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
