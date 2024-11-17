import React, { createContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { FormTypeRoom, IType_Room } from "../interface/rooms";
import { ADDTypeR, DeleteTypeR, getallTypeRoom } from "../services/typeRoom";

type Props = {
  children: React.ReactNode;
};
export const TypeRoomCT = createContext({} as any);
const TypeRoomContext = ({ children }: Props) => {
  const [types, setType] = useState<IType_Room[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const data = await getallTypeRoom();
        console.log("Fetched cities data:", data); // Check format
        setType(data.data);
      } catch (error) {
        alert("Error fetching cities");
      }
    })();
  }, []);
  const onDelete = async (id: number | string) => {
    if (confirm("Bạn chắc chứ?")) {
      try {
        const TypesR = await DeleteTypeR(id);
        alert("Xóa thành công");
        const newType = types.filter((TypesR) => TypesR.id !== id);
        setType(newType);
      } catch (error) {}
    }
  };
  const onAdd = async (dataCities: FormTypeRoom) => {
    try {
      const newTypeR = await ADDTypeR(dataCities);
      alert("Thêm mới thành công");
      setType([...types, newTypeR]);
      navigate("Rooms/TypeRooms");
    } catch (error) {
      // Xử lý lỗi
    }
  };
  return (
    <TypeRoomCT.Provider value={{ types, onAdd, onDelete }}>
      {children}
    </TypeRoomCT.Provider>
  );
};

export default TypeRoomContext;
