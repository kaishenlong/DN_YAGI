import React, { createContext, useEffect, useState } from "react";
import { getallDashboard } from "../services/dashboard";
import { DashboardData } from "../interface/dashboard";

type Props = {
  children: React.ReactNode;
};
export const DashboardCT = createContext({} as any);
const DashboardContext = ({ children }: Props) => {
  const [dashboard, setDashboard] = useState<DashboardData[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const data = await getallDashboard();
        console.log("Fetched cities data:", data); // Check format
        setDashboard(data.data);
      } catch (error) {
        alert("Error fetching cities");
      }
    })();
  }, []);
  return (
    <DashboardCT.Provider value={{ dashboard }}>
      {children}
    </DashboardCT.Provider>
  );
};

export default DashboardContext;
