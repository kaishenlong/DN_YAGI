import React, { useContext, useEffect, useState } from "react";
import { ReviewCT } from "../context/review";
import { IReview, IUser } from "../interface/review";
import { GetAllReview, GetAllUsers } from "../service/review";
import { useParams } from "react-router-dom";
import { CircleUser, User } from "lucide-react";

const AllEvaluate = () => {
  const { id } = useParams<{ id: string }>();
  const [users, setUser] = useState<IUser[]>([]);
  const [filteredReview, setFilteredReview] = useState<IReview[]>([]);
  const { review } = useContext(ReviewCT); // Sử dụng context để lấy danh sách đánh giá

  useEffect(() => {
    (async () => {
      try {
        const allReviewResponse = await GetAllReview(); // Gọi API
        const allReviews = allReviewResponse; // Lấy mảng từ trường `data`
        const reviewByHotel = allReviews.filter(
          (review: IReview) => review.hotel_id === Number(id)
        ); // Lọc danh sách phòng
        console.log("Danh sách review phòng:", reviewByHotel);
        setFilteredReview(reviewByHotel); // Cập nhật danh sách phòng đã lọc
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu phòng:", error);
        alert("Lỗi khi lấy dữ liệu phòng.");
      }
    })();
  }, [id, review]); // Thêm review vào dependency để tự động cập nhật khi có người comment

  useEffect(() => {
    (async () => {
      try {
        const user = await GetAllUsers();
        setUser(user);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <>
      <div className="p-4 sm:p-6 bg-background text-foreground rounded-lg shadow-md">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-8 text-center">
          Tất cả đánh giá
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
          {filteredReview.map((review: IReview) => (
            <div
              key={review.id}
              className="flex items-start pb-4 border-b border-gray-200"
            >
              <User className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4" />
              <div className="flex-1">
                <h3 className="font-semibold text-sm sm:text-base m-1">
                  {users.find((user) => user.id === review.user_id)?.name ||
                    "Unknown Type Room"}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground m-1">
                  {new Date(review.created_at).toLocaleDateString()}
                </p>
                <div className="flex flex-wrap gap-2 m-1">
                  <div className="flex items-center">
                    {Array.from({ length: review.rating }, (_, i) => (
                      <span key={i} className="text-yellow-500">
                        ★
                      </span>
                    ))}
                    {Array.from({ length: 5 - review.rating }, (_, i) => (
                      <span key={i} className="text-gray-300">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-sm sm:text-base font-bold mt-1">
                    {review.comment}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllEvaluate;
