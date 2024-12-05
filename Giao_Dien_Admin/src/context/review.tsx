import React, { useState, useEffect, createContext } from "react";
import { deleteReviewFromService, GetAllReview } from "../services/review";
import { IReview } from "../interface/review";

type ReviewContextType = {
  review: IReview[];
  deleteReview: (id: number) => void; // Cập nhật kiểu deleteReview
};

export const ReviewCT = createContext<ReviewContextType>(
  {} as ReviewContextType
);

type Props = {
  children: React.ReactNode;
};

const ReviewContext = ({ children }: Props) => {
  const [review, setReview] = useState<IReview[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await GetAllReview();
        setReview(data); // Cập nhật lại cách lấy reviews từ API
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    })();
  }, []);

  // Hàm xóa review
  const deleteReview = async (id: number) => {
    try {
      // Gọi service xóa review từ server
      await deleteReviewFromService(id);

      // Cập nhật lại danh sách reviews sau khi xóa
      setReview((prevReviews) =>
        prevReviews.filter((review) => review.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete review", error);
    }
  };

  return (
    <ReviewCT.Provider value={{ review, deleteReview }}>
      {children}
    </ReviewCT.Provider>
  );
};

export default ReviewContext;
