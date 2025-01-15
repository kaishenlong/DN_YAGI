import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormService, Iservice } from "../interface/service";
import { ADDservice, getallService, UpdateService } from "../services/service";

type Props = {
  children: React.ReactNode;
};
export const ServiceCT = createContext({} as any);
const ServiceContext = ({ children }: Props) => {
  const [services, setservices] = useState<Iservice[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const data = await getallService();
        console.log("Fetched service data:", data); // Check format
        setservices(data.data);
      } catch (error) {
        alert("Error fetching service");
      }
    })();
  }, []);
  const onAdd = async (dataServices: FormService) => {
    try {
      const newService = await ADDservice(dataServices);
      alert("Thêm mới thành công");
      //load lại trang
      const newdata = await getallService();
      setservices(newdata.data);
      navigate("service");
    } catch (error) {
      // Xử lý lỗi
    }
  };
  const onUpdate = async (data: FormService, id: number | string) => {
    try {
      const resdata = await UpdateService(data, id);
      alert("Cập nhật thành công");
      // Tự động load lại trang list sau khi cập nhật
      const updatedCity = await getallService();
      setservices(updatedCity.data);
      navigate("service");
    } catch (error) {
      // Xử lý lỗi
    }
  };
  return (
    <ServiceCT.Provider value={{ services, onAdd, onUpdate }}>
      {children}
    </ServiceCT.Provider>
  );
};

export default ServiceContext;
