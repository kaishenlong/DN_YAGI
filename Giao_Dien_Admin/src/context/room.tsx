import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormRoom, IRoomsDetail } from "../interface/rooms";
import { addRoom, deleteRoom, getallRoom, UpdateRoom } from "../services/Rooms";

type Props = {
  children: React.ReactNode;
};

export const roomCT = createContext({} as any);

const RoomContext = ({ children }: Props) => {
  const [rooms, setRoom] = useState<IRoomsDetail[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const data = await getallRoom();
      console.log(data);

      setRoom(data.data);
    })();
  }, []);

  const onAdd = async (data: FormRoom) => {
    try {
      const newRoom = await addRoom(data);
      alert("Thêm mới thành công");
      //load lại trang
      const newdata = await getallRoom();
      setRoom(newdata.data);
      navigate("rooms");
    } catch (error) {
      console.error("Error adding hotel:", error);
      alert("Có lỗi xảy ra khi thêm khách sạn!");
    }
  };
  const onDelete = async (id: number | string) => {
    if (confirm("Bạn chắc chứ?")) {
      try {
        const Rooms = await deleteRoom(id);
        alert("Xóa thành công");
        const newRoom = rooms.filter((Rooms) => Rooms.id !== id);
        setRoom(newRoom);
      } catch (error) {}
    }
  };
  const onUpdate = async (data: FormRoom, id: number | string) => {
    try {
      const resdata = await UpdateRoom(data, id);
      alert("Cập nhật thành công");
      // Tự động load lại trang list sau khi cập nhật
      const updatedRoom = await getallRoom();
      setRoom(updatedRoom.data);
      navigate("rooms");
    } catch (error) {
      // Xử lý lỗi
    }
  };

  return (
    <roomCT.Provider
      value={{
        rooms,
        onAdd,
        onDelete,
        onUpdate,
      }}
    >
      {children}
    </roomCT.Provider>
  );
};

export default RoomContext;
