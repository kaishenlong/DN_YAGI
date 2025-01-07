import { useEffect, useState } from "react";
import { IHotel } from "../interface/hotel";
import { useParams } from "react-router-dom";
import { GetHotelByID } from "../service/hotel";

const HotelDetail = () => {
  const param = useParams();
  const [hotelData, setHotelData] = useState<IHotel | null>(null);

  useEffect(() => {
    (async () => {
      const hotel = await GetHotelByID(param?.id as number | string);
      setHotelData(hotel);
    })();
  }, []);

  if (!hotelData) {
    return <div>Loading...</div>; // Đợi khi dữ liệu được tải
  }

  console.log(hotelData); // Kiểm tra cấu trúc của hotelData
  return (
    <div>
      <h1>Hotel Details</h1>
      <div>
        <h2>{hotelData.name}</h2>
        <p>{hotelData.description}</p>
      </div>
    </div>
  );
};
export default HotelDetail;
