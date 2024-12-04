import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormData, IHotel } from "../interface/hotel";
import {
  ADDHotels,
  DeleteHotel,
  getallHotels,
  UpdateHotel,
} from "../services/hotel";

type Props = {
  children: React.ReactNode;
};

export const hotelCT = createContext({} as any);

const HotelContext = ({ children }: Props) => {
  const [hotels, setHotel] = useState<IHotel[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const data = await getallHotels();
      setHotel(data.data);
    })();
  }, []);

  const onAdd = async (data: FormData) => {
    try {
      const newHotel = await ADDHotels(data);
      alert("Thêm mới thành công");
      //load lại trang
      const newdata = await getallHotels();
      setHotel(newdata.data);
      navigate("hotels");
    } catch (error) {
      console.error("Error adding hotel:", error);
      alert("Có lỗi xảy ra khi thêm khách sạn!");
    }
  };
  const onDelete = async (id: number | string) => {
    if (confirm("Bạn chắc chứ?")) {
      try {
        const Hotels = await DeleteHotel(id);
        alert("Xóa thành công");
        const newCities = hotels.filter((Hotels) => Hotels.id !== id);
        setHotel(newCities);
      } catch (error) {}
    }
  };
  const onUpdate = async (data: FormData, id: number | string) => {
    
    try {
      const resdata = await UpdateHotel(data, id);
      alert("Cập nhật thành công");
      // Tự động load lại trang list sau khi cập nhật
      const updatedHotels = await getallHotels();
      setHotel(updatedHotels.data);
      navigate("hotels");
    } catch (error) {
      // Xử lý lỗi
    }
  };

  return (
    <hotelCT.Provider
      value={{
        hotels,
        onAdd,
        onDelete,
        onUpdate,
      }}
    >
      {children}
    </hotelCT.Provider>
  );
};

export default HotelContext;
