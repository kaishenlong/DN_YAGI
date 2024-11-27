import React, { useState, useEffect, createContext } from "react";
import { IUser } from "../interface/user";
import { GetAllUsers, Updatestatus } from "../services/user";
import { UserStatus } from "../interface/userStatus";

type Props = {
  children: React.ReactNode;
};

export const UserCT = createContext<{ user: IUser[] }>({ user: [] });

const UserContext = ({ children }: Props) => {
  const [user, setUser] = useState<IUser[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await GetAllUsers();
        setUser(data[0]);
      } catch (error) {
        console.error("Error fetching users:", error);
        // Handle error appropriately (e.g., show error message to user)
      }
    })();
  }, []);
  const onUpdateReviewStatus = (id: number | string, status: boolean) => {
    setUser(
      user.map((product) =>
        product.id === id ? { ...product, isReviewed: status } : product
      )
    );
  };

  // const onUpdateStatus = async (id:string|number, currentStatus: any) => {
  //   try {
  //     // Tính toán trạng thái mới
  //     const newStatus =
  //       currentStatus === UserStatus.ACTIVE ? UserStatus.INACTIVE : UserStatus.ACTIVE;

  //     // Gửi yêu cầu cập nhật trạng thái
  //     const updatedUser = await Updatestatus(id, newStatus);

  //     // Cập nhật state sau khi API trả về thành công
  //     setUser(prevUsers =>
  //       prevUsers.map(user =>
  //         user.id === id ? { ...user, status: updatedUser.status } : user
  //       )
  //     );

  //     alert("Cập nhật trạng thái thành công!");
  //   } catch (error) {
  //     alert("Có lỗi xảy ra khi cập nhật trạng thái");
  //   }
  // };

  return (
    <UserCT.Provider value={{ user, onUpdateReviewStatus }}>
      {children}
    </UserCT.Provider>
  );
};

export default UserContext;
