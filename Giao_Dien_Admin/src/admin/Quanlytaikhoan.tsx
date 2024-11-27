import { useContext, useState } from "react";
import { UserCT } from "../context/user";
import { IUser } from "../interface/user";
import { UserStatus } from "../interface/userStatus";
import { Updatestatus } from "../services/user"; // Giả sử hàm này đã có và được import từ dịch vụ

const Account_Management = () => {
  const { user, setUser } = useContext(UserCT); // Lấy state user và setUser từ context
  const [loading, setLoading] = useState(false); // Để quản lý trạng thái loading khi cập nhật

  // Hàm cập nhật trạng thái người dùng
  const onUpdateStatus = async (
    id: number | string,
    currentStatus: UserStatus
  ) => {
    // Đặt trạng thái loading là true khi bắt đầu cập nhật
    setLoading(true);

    // Đổi trạng thái
    const newStatus =
      currentStatus === UserStatus.ACTIVE
        ? UserStatus.INACTIVE
        : UserStatus.ACTIVE;

    try {
      // Gọi API cập nhật trạng thái
      const updatedUser = await Updatestatus(id, newStatus); // Hàm này sẽ gửi yêu cầu API tới backend
      console.log(updatedUser);

      // Cập nhật lại danh sách người dùng sau khi API trả về thành công
      setUser((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, status: updatedUser.status } : user
        )
      );

      alert("Cập nhật trạng thái người dùng thành công!");
    } catch (error) {
      // alert("Có lỗi xảy ra khi cập nhật trạng thái");
      console.log(error);
      
    } finally {
      // Đặt trạng thái loading là false khi hoàn tất
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="mt-12 w-[1700px]">
        <div className="mb-4 grid grid-cols-1 gap-6 2xl:grid-cols-3">
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
            <div>
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
                              Tên Đăng Nhập
                            </th>
                            <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                              Avatar
                            </th>
                            <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                              Số Điện Thoại
                            </th>
                            <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                              Chức Năng
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                          {user.map((user: IUser, index) => (
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
                                {user.identity_card}
                              </td>
                              <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {user.role}
                              </td>
                              <td className="py-4 px-6 text-sm text-left font-medium whitespace-nowrap">
                                <button
                                  onClick={() =>
                                    onUpdateStatus(user.id, user.status)
                                  }
                                  disabled={loading}
                                  className={`${
                                    loading
                                      ? "bg-gray-500"
                                      : user.status === UserStatus.ACTIVE
                                      ? "bg-red-500"
                                      : "bg-green-500"
                                  } ml-4 px-4 py-2 text-sm font-medium rounded-lg text-white hover:opacity-80 transition`}
                                >
                                  {user.status === UserStatus.ACTIVE
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
    </div>
  );
};

export default Account_Management;
