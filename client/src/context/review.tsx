import React, { useState, useEffect, createContext } from "react";
import { IReview } from "../interface/review";
import { GetAllReview } from "../service/review";

type Props = {
  children: React.ReactNode;
};

export const ReviewCT = createContext({} as any);

const ReviewContext = ({ children }: Props) => {
  const [review, setReview] = useState<IReview[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await GetAllReview();
        setReview(data); // Lấy danh sách đánh giá
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    })();
  }, []);

  const addReview = (newReview: IReview) => {
    setReview((prev) => [...prev, newReview]); // Thêm review mới
  };

  return (
    <ReviewCT.Provider value={{ review, addReview }}>
      {children}
    </ReviewCT.Provider>
  );
};

export default ReviewContext;
