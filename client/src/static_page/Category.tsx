import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Products from "../component/products";
import { getallRoom } from "../service/room";
import { IHotel } from "../interface/hotel";
import { getallHotels } from "../service/hotel";

const Category = () => {
  const { id } = useParams();
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy tất cả các khách sạn
        const data = await getallHotels();
        // Lấy tất cả các phòng
        const rooms = await getallRoom();

        // Lọc khách sạn theo city_id
        const filteredHotels = data.data.filter(
          (hotel: IHotel) => hotel.city_id === Number(id)
        );

        // Kết hợp dữ liệu khách sạn với thông tin phòng
        const combinedData = filteredHotels.map((hotel: IHotel) => {
          const room = rooms.data.find((r: any) => r.hotel_id === hotel.id);
          return {
            ...hotel,
            price: room?.price || "Chưa có giá", // Thêm giá phòng nếu có
          };
        });

        // Cập nhật state với dữ liệu kết hợp
        setHotels(combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]); // Thêm id vào dependency array để khi id thay đổi, useEffect sẽ được gọi lại

  const priceRanges = [
    { value: "under_2000000", label: "Dưới 2.000.000đ" },
    { value: "2000000_4000000", label: "2.000.000đ - 4.000.000đ" },
    { value: "4000000_6000000", label: "4.000.000đ - 6.000.000đ" },
    { value: "6000000_8000000", label: "6.000.000đ - 8.000.000đ" },
    { value: "above_10000000", label: "Trên 10.000.000đ" },
  ];

  return (
    <div className="w-full">
      <div className="relative h-[300px] w-full">
        <div
          style={{
            backgroundColor: "#4CAF50", // Set the background color here (green example)
          }}
          className="absolute w-full h-[399px]"
        >
          <p className="font-taviraj text-[61px] italic font-extrabold text-center mt-[150px] text-[#FFFFFF]">
            Thành phố {id}
          </p>
        </div>
      </div>
      <div className="mt-[150px] w-full p-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold mb-4 pl-[410px]">
            Kết quả tìm kiếm: khách sạn
          </h1>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full ml-10 md:w-1/4">
            <div className="bg-white p-4 rounded shadow">
              <h2 className="font-bold mb-2">Hạng sao</h2>
              {[5, 4, 3, 2, 1].map((stars) => (
                <div key={stars} className="flex items-center mb-2">
                  <input type="checkbox" className="mr-2" />
                  {Array(stars)
                    .fill(null)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 mx-1 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                </div>
              ))}

              <h2 className="font-bold mt-4 mb-2">Khoảng giá</h2>
              {priceRanges.map((range) => (
                <div key={range.value} className="flex items-center mb-2">
                  <input type="checkbox" className="mr-2" />
                  <span>{range.label}</span>
                </div>
              ))}

              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                Tìm kiếm
              </button>
            </div>
          </div>

          <div className="w-full md:w-3/4">
            {/* Truyền danh sách khách sạn vào Products */}
            <Products hotels={hotels} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
