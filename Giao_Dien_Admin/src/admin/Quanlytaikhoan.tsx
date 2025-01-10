import React, { useContext, useState } from "react";
import { UserCT } from "../context/user";
import { User } from "../interface/user";
import { UserStatus } from "../interface/userStatus";
import { Link } from "react-router-dom";

const Account_Management = () => {
  const { users, onUpdateStatus, loadingUserId } = useContext(UserCT);
  const [searchTerm, setSearchTerm] = useState("");

  const handleUpdateStatus = async (
    id: number | string,
    currentStatus: UserStatus
  ) => {
    try {
      await onUpdateStatus(id, currentStatus);
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  // Lọc kết quả dựa trên từ khóa tìm kiếm
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <nav className="flex flex-col md:flex-row md:items-center justify-between bg-white p-4 shadow-md rounded-lg">
        <div>
          <nav
            aria-label="breadcrumb"
            className="text-sm text-gray-500 flex items-center gap-2"
          >
            <a href="#" className="hover:text-blue-500">
              Dashboard
            </a>
            <span>/</span>
            <p className="font-semibold text-gray-800">Quản Lý Tài Khoản</p>
          </nav>
          <h1 className="text-2xl font-bold text-gray-800 mt-2">
            Quản Lý Tài Khoản
          </h1>
        </div>
      </nav>

     
      

      {/* User Table */}
      <div className="mt-8 bg-white shadow-md rounded-lg p-6">
         {/* Search Input */}
      <div className="flex flex-col gap-4 items-end py-3">
          <input
            type="text"
            placeholder="Tìm theo tên hoặc email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/3 py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <table className="min-w-full border-collapse border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm font-medium">
              <th className="py-4 px-6 text-left border-b">STT</th>
              <th className="py-4 px-6 text-left border-b">Tên Khách Hàng</th>
              <th className="py-4 px-6 text-left border-b">Email</th>
              <th className="py-4 px-6 text-left border-b">Vai Trò</th>
              <th className="py-4 px-6 text-left border-b">Trạng Thái</th>
              <th className="py-4 px-6 text-left border-b">Chức Năng</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {filteredUsers.map((user: User, index: number) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 transition-all border-b"
              >
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{user.name}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6">{user.role}</td>
                <td className="py-3 px-6">
                  {user.status === UserStatus.ACTIVE ? "Active" : "Inactive"}
                </td>
                <td className="py-3 px-6 flex gap-4 items-center">
                  <button
                    onClick={() => handleUpdateStatus(user.id, user.status)}
                    disabled={loadingUserId === user.id}
                    className={`py-2 px-4 text-sm font-medium rounded-lg text-white shadow-md ${
                      loadingUserId === user.id
                        ? "bg-gray-400 cursor-not-allowed"
                        : user.status === UserStatus.ACTIVE
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    } transition-all`}
                  >
                    {loadingUserId === user.id
                      ? "Đang cập nhật..."
                      : user.status === UserStatus.ACTIVE
                      ? "Deactivate"
                      : "Activate"}
                  </button>
                  <Link
                    to={`/dashboard/account/change-password/${user.id}`}
                    className="py-2 px-4 text-sm font-medium rounded-lg bg-blue-500 text-white hover:bg-blue-600 shadow-md transition-all"
                  >
                    Đổi mật khẩu
                  </Link>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="py-4 px-6 text-center text-gray-500"
                >
                  Không tìm thấy kết quả phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Account_Management;
