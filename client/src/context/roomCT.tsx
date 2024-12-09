import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IRoomsDetail } from "../interface/room";
import { getallRoom } from "../service/room";

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

  return (
    <roomCT.Provider
      value={{
        rooms,
      }}
    >
      {children}
    </roomCT.Provider>
  );
};

export default RoomContext;
