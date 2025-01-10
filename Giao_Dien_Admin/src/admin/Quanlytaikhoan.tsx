import React, { useContext } from "react";
import { UserCT } from "../context/user";
import { User } from "../interface/user";
import { UserStatus } from "../interface/userStatus";
import { Link } from "react-router-dom";

const Account_Management = () => {
  const { users, onUpdateStatus, loadingUserId } = useContext(UserCT); // Lấy state users và hàm cập nhật từ context

  // Hàm xử lý cập nhật trạng thái người dùng
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

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <nav className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center bg-white p-4 py-2 rounded-xl shadow-sm">
        <div className="capitalize">
          <nav
            aria-label="breadcrumb"
            className="w-max bg-opacity-60 rounded-md p-2 transition-all"
          >
            <ol className="flex flex-wrap items-center w-full transition-colors duration-300">
              <li className="flex items-center text-blue-gray-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer hover:text-light-blue-500">
                <a href="#">
                  <p className="block antialiased font-sans text-sm leading-normal text-blue-900 font-normal opacity-50 hover:text-blue-500 hover:opacity-100">
                    dashboard
                  </p>
                </a>
                <span className="text-gray-500 text-sm antialiased font-sans font-normal leading-normal mx-2 pointer-events-none select-none">
                  /
                </span>
              </li>
              <li className="flex items-center text-blue-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer hover:text-blue-500">
                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                  Tài Khoản
                </p>
              </li>
            </ol>
          </nav>
          <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-gray-900">
            Quản Lý Tài Khoản
          </h6>
        </div>
      </nav>
      <div className="mt-12 w-full mx-auto">
        <div className="mb-4 grid grid-cols-1 gap-6">
          <div className="relative flex flex-col bg-white rounded-xl shadow-md overflow-hidden xl:col-span-2">
            <div className="flex flex-col">
              <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-x-auto">
                    <table className="w-[1200px] divide-y divide-gray-200 table-fixed dark:divide-gray-700 rounded-lg">
                      <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                          <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            STT
                          </th>
                          <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            Tên Khách Hàng
                          </th>
                          <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            Email
                          </th>
                          <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            Vai Trò
                          </th>
                          <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            Trạng Thái
                          </th>
                          <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            Chức Năng
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                        {users.map((user: User, index: number) => (
                          <tr key={index}>
                            <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {index + 1}
                            </td>
                            <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {user.name}
                            </td>
                            <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {user.email}
                            </td>
                            <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {user.role}
                            </td>
                            <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {user.status === UserStatus.ACTIVE
                                ? "Active"
                                : "Inactive"}
                            </td>
                            <td className="py-4 px-6 text-sm text-left font-medium whitespace-nowrap">
                              <button
                                onClick={() =>
                                  handleUpdateStatus(user.id, user.status)
                                }
                                disabled={loadingUserId === user.id}
                                className={`${
                                  loadingUserId === user.id
                                    ? "bg-gray-500 cursor-not-allowed"
                                    : user.status === UserStatus.ACTIVE
                                    ? "bg-red-500"
                                    : "bg-green-500"
                                } ml-4 px-4 py-2 text-sm font-medium rounded-lg text-white hover:opacity-80 transition`}
                              >
                                {loadingUserId === user.id
                                  ? "Đang cập nhật..."
                                  : user.status === UserStatus.ACTIVE
                                  ? "Deactivate"
                                  : "Activate"}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account_Management;
