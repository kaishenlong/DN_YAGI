import React, { useState, useContext } from "react";
import { Comment } from "../service/review";
import { ReviewCT } from "../context/review";
import { Star } from "lucide-react";

interface FormCmtProps {
  hotelId?: number; // Nhận hotelId từ ProductDT, hoặc để người dùng nhập nếu không có
}

const FormCmt: React.FC<FormCmtProps> = ({ hotelId: initialHotelId }) => {
  const { addReview } = useContext(ReviewCT); // Lấy hàm addReview từ context
  const [formData, setFormData] = useState({
    comment: "",
    rating: 0,
    hotel_id: initialHotelId || 0, // Giá trị mặc định từ props hoặc 0
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "hotel_id" ? Number(value) : value,
    });
  };

  const handleRatingClick = (rating: number) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.comment || formData.rating === 0 || formData.hotel_id === 0) {
      alert("Vui lòng nhập đầy đủ ID khách sạn, bình luận và đánh giá sao!");
      return;
    }

    try {
      const newReview = await Comment(formData.hotel_id, {
        comment: formData.comment,
        rating: formData.rating,
      });
      addReview(newReview);
      alert("Đánh giá đã được gửi thành công!");
      setFormData({ comment: "", rating: 0, hotel_id: initialHotelId || 0 });
    } catch (error) {
      alert("Vui lòng đăng nhập để đánh giá");
    }
  };

  return (
    <div className="w-full">
      <div className="w-full bg-white p-6 md:p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-6">
            <label
              htmlFor="comment"
              className="block text-gray-700 text-lg font-bold mb-4"
            >
              Bình luận
            </label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
              className="w-full h-[150px] px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập bình luận của bạn"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-bold mb-4">
              Đánh giá sao
            </label>
            <div className="flex space-x-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => handleRatingClick(star)}
                  className={`px-4 py-3 rounded-md text-white font-bold focus:outline-none ${
                    formData.rating >= star ? "bg-yellow-500" : "bg-gray-300"
                  }`}
                >
                  <Star className="text-white font-bold" />
                </button>
              ))}
            </div>
            <p className="text-lg text-red-600 mt-4 font-semibold">
              {formData.rating === 1 && "Rất Tệ"}
              {formData.rating === 2 && "Tệ"}
              {formData.rating === 3 && "Tạm ổn"}
              {formData.rating === 4 && "Tốt"}
              {formData.rating === 5 && "Rất Tốt"}
            </p>
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-500 w-full hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Gửi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormCmt;
