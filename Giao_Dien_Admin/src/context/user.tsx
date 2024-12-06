import React, { useState, useEffect, createContext, ReactNode } from "react";
import { User } from "../interface/user";
import { GetAllUsers, Updatestatus } from "../services/user";
import { UserStatus } from "../interface/userStatus";

type UserContextType = {
  users: User[]; // Danh sách người dùng
  loadingUserId: number | string | null; // Người dùng đang được cập nhật
  onUpdateStatus: (
    id: number | string,
    currentStatus: UserStatus
  ) => Promise<void>;
};

export const UserCT = createContext<UserContextType>({
  users: [],
  loadingUserId: null,
  onUpdateStatus: async () => {},
});

type Props = {
  children: ReactNode;
};

const UserContext = ({ children }: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUserId, setLoadingUserId] = useState<number | string | null>(
    null
  );

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

  return (
    <UserCT.Provider value={{ users, loadingUserId, onUpdateStatus }}>
      {children}
    </UserCT.Provider>
  );
};

export default UserContext;
