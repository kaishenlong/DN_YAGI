import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IRoomsDetail } from "../interface/room";
import { getallRoom, getallTypeRoom } from "../service/room";

type Props = {
  children: React.ReactNode;
};

export const roomCT = createContext({} as any);

const RoomContext = ({ children }: Props) => {
  const [rooms, setRoom] = useState<IRoomsDetail[]>([]);
  const [typeRoom, setTypeRooms] = useState<IRoomsDetail[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const data = await getallRoom();
      console.log(data);
      setRoom(data.data);

      const typeRoomsData = await getallTypeRoom();
      console.log('Type Rooms Data:', typeRoomsData);
      setTypeRooms(typeRoomsData.data);
    })();
  }, []);
  const getRoomById = (roomId: number) => { return rooms.find(room => room.id === roomId); };
  const contextValue = {
    rooms,
    typeRoom,
    getRoomById,
  };

  return (
    <roomCT.Provider value={contextValue}>
      {children}
    </roomCT.Provider>
  );
};

export default RoomContext;
