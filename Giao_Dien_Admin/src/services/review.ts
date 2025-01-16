import axios from "axios";
import api from "../config/axios";
import { IReview } from "../interface/review";

export const GetAllReview = async (): Promise<IReview[]> => {
  try {
    const { data } = await api.get("api/reviewsall");
    // console.log(data.id);

    return data;
  } catch (error) {
    throw new Error("Lỗi khi lấy danh sách đánh giá");
  }
};

export const deleteReviewFromService = async (id: number | string) => {
  try {
    const { data } = await api.delete(`api/reviews/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return data;
  } catch (error) {
    throw new Error("Lỗi");
  }
};
