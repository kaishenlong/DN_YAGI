import api from "../config/axios";
import { IUser } from "../interface/user";
import { UserStatus } from "../interface/userStatus";

export const GetAllUsers = async () => {
  try {
    const { data } = await api.get("/api/users");
    return data;
  } catch (error) {
    throw new Error("Lỗi");
  }
};

export const GetUserByID = async (id: number | string) => {
  try {
    const { data } = await api.get(`/api/users/${id}`);
    return data;
  } catch (error) {
    throw new Error("Lỗi");
  }
};

export const LoginUser = async (UserData: IUser) => {
  try {
    const { data } = await api.post(`login`, UserData);
    return data;
  } catch (error) {
    throw new Error("Lỗi");
  }
};
export const UpdateUser = async (UserData: FormData, id: number | string) => {
  try {
    const { data } = await api.put(`users/${id}`, UserData);
    return data;
  } catch (error) {
    throw new Error("Lỗi");
  }
};

// Giả sử bạn đang gọi API để cập nhật trạng thái người dùng
export const Updatestatus = async (id: number | string, status: UserStatus) => {
  try {
    // Gửi yêu cầu API cập nhật trạng thái người dùng
    const { data } = await api.put(`users/${id}/status`, {
      status
    });
    return data;
  } catch (error) {
    console.log(error);
    
    throw new Error("Có lỗi xảy ra khi cập nhật trạng thái người dùng");
  }
};
