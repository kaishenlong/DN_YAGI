
import { FormReview, IReview } from "../interface/review";
import api from "../config/axios";

export const GetAllReview = async (): Promise<IReview[]> => {
  try {
    const { data } = await api.get("api/reviewsall");
    console.log(data.id);

    return data;
  } catch (error) {
    throw new Error("Lỗi khi lấy danh sách đánh giá");
  }
};
export const Comment = async (hotelId: number, cmtData: FormReview) => {
  try {
    const { data } = await api.post(
      "api/reviews",
      { ...cmtData, hotel_id: hotelId }, // Thêm hotel_id vào payload
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Lỗi khi gửi đánh giá:", error);
    throw error;
  }
};
export const GetAllUsers = async () => {
  try {
    const { data } = await api.get("/api/users");
    console.log("Fetched data from API:", data); // Kiểm tra cấu trúc dữ liệu trả về
    return data[0]; // Trả về mảng dữ liệu trực tiếp (không cần lấy [0])
  } catch (error) {
    console.error("Error fetching users from API:", error); // Log lỗi nếu có
    throw new Error("Error fetching users");
  }
};