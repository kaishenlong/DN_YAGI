import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { City } from "../interface/hotel";
import { getallCitys } from "../service/city";

type Props = {
  children: React.ReactNode;
};
export const CitiesCT = createContext({} as any);
const CitiesContext = ({ children }: Props) => {
  const [cities, setCities] = useState<City[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const data = await getallCitys();
        console.log("Fetched cities data:", data); // Check format
        setCities(data.data);
      } catch (error) {
        alert("Error fetching cities");
      }
    })();
  }, []);
  return <CitiesCT.Provider value={{ cities }}>{children}</CitiesCT.Provider>;
};

export default CitiesContext;
