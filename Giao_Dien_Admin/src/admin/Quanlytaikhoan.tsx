import React, { useContext } from "react";
import { UserCT } from "../context/user";
import { User } from "../interface/user";
import { UserStatus } from "../interface/userStatus";

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
    <div className="mt-12 w-full max-w-7xl mx-auto">
      <div className="mb-4 grid grid-cols-1 gap-6 2xl:grid-cols-3">
        <div className="relative flex flex-col bg-white rounded-xl shadow-md overflow-hidden xl:col-span-2">
          <div className="flex flex-col">
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
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
  );
};

export default Account_Management;
