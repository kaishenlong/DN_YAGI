import React, { useState, useEffect, createContext, ReactNode } from "react";
import { FormUser, User } from "../interface/user";
import { GetAllUsers, SearchUser, Updatestatus, UpdateUser } from "../services/user";
import { UserStatus } from "../interface/userStatus";
import { useNavigate } from "react-router-dom";

type UserContextType = {
  users: User[];
  loadingUserId: number | string | null;
  onUpdateStatus: (
    id: number | string,
    currentStatus: UserStatus
  ) => Promise<void>;
  onUpdatePass: (data: FormUser, id: number | string) => Promise<void>;
  onSearchUsers: (criteria: { name?: string; email?: string }) => Promise<void>;
};
export const UserCT = createContext<UserContextType>({
  users: [],
  loadingUserId: null,
  onUpdateStatus: async () => {},
  onUpdatePass: async () => {},
  onSearchUsers: async () => {},
});

type Props = {
  children: ReactNode;
};

const UserContext = ({ children }: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUserId, setLoadingUserId] = useState<number | string | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await GetAllUsers();
        // Kiểm tra và gán dữ liệu cho users
        if (Array.isArray(response)) {
          setUsers(response); // Gán trực tiếp mảng người dùng trả về
        } else {
          console.error("Response không phải là mảng");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const onUpdateStatus = async (
    id: number | string,
    currentStatus: UserStatus
  ) => {
    setLoadingUserId(id); // Bắt đầu loading cho người dùng cụ thể
    const newStatus =
      currentStatus === UserStatus.ACTIVE
        ? UserStatus.INACTIVE
        : UserStatus.ACTIVE;

    try {
      const updatedUser = await Updatestatus(id, newStatus);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id // Kiểm tra nếu id của user trùng khớp
            ? { ...user, status: updatedUser.status } // Cập nhật trạng thái người dùng
            : user
        )
      );
      // Sau khi cập nhật thành công, reload lại danh sách người dùng
      const fetchUsers = async () => {
        try {
          const response = await GetAllUsers();
          if (Array.isArray(response)) {
            setUsers(response); // Gán trực tiếp mảng người dùng trả về
          } else {
            console.error("Response không phải là mảng");
          }
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
      fetchUsers();
    } catch (error) {
      console.error("Error updating user status:", error);
    } finally {
      setLoadingUserId(null); // Kết thúc loading
    }
  };
  const onUpdatePass = async (data: FormUser, id: number | string) => {
    try {
      const resdata = await UpdateUser(data, id);
      alert("Cập nhật thành công");
      // Tự động load lại trang account sau khi cập nhật
      window.location.href = "/dashboard/account"; // Tự động load lại trang account
    } catch (error) {
      // Xử lý lỗi
    }
  };
  const onSearchUsers = async (criteria: { name?: string; email?: string }) => {
    try {
      const results = await SearchUser(criteria);
      setUsers(results); // Cập nhật danh sách người dùng sau khi tìm kiếm
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };
  return (
    <UserCT.Provider
      value={{ users, loadingUserId, onUpdateStatus, onUpdatePass, onSearchUsers }}
    >
      {children}
    </UserCT.Provider>
  );
};

export default UserContext;
