import React, { createContext, useEffect, useState } from "react";
import { getallDashboard } from "../services/dashboard";
import { DashboardData } from "../interface/dashboard";

type Props = {
  children: React.ReactNode;
};
export const DashboardCT = createContext({} as any);

const DashboardContext = ({ children }: Props) => {
  const [dashboard, setDashboard] = useState<DashboardData[]>([]);
  const [filters, setFilters] = useState({
    start_date: "00001-01-01",
    end_date: "9999-12-31",
  });

  const fetchDashboardData = async (start_date: string, end_date: string) => {
    try {
      const data = await getallDashboard(start_date, end_date);
      // console.log("Đã lấy dữ liệu thống kê:", data);
      setDashboard(data.data);
    } catch (error) {
      alert("Lỗi khi lấy dữ liệu thống kê");
    }
  };

  useEffect(() => {
    fetchDashboardData(filters.start_date, filters.end_date);
  }, [filters]);

  const handleFilterSubmit = (start_date: string, end_date: string) => {
    if (new Date(start_date) > new Date(end_date)) {
      alert("Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc!");
      return;
    }
    setFilters({ start_date, end_date });
  };

  return (
    <DashboardCT.Provider value={{ dashboard, handleFilterSubmit }}>
      {children}
    </DashboardCT.Provider>
  );
};

export default DashboardContext;
