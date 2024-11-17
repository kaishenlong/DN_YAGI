// import React, { createContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FormCites, ICities } from "../interface/hotel";
// import { ADDCity, DeleteCities, getallCitys } from "../services/cities";

// type Props = {
//   children: React.ReactNode;
// };
// export const CitiesCT = createContext({} as any);
// const CitiesContext = ({ children }: Props) => {
//   const [cities, setCities] = useState<ICities[]>([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     (async () => {
//       try {
//         const data = await getallCitys();
//         console.log("Fetched cities data:", data); // Check format
//         setCities(data.data);
//       } catch (error) {
//         alert("Error fetching cities");
//       }
//     })();
//   }, []);
//   const onDelete = async (id: number | string) => {
//     if (confirm("Bạn chắc chứ?")) {
//       try {
//         const Cities = await DeleteCities(id);
//         alert("Xóa thành công");
//         const newCities = cities.filter((Cities) => Cities.id !== id);
//         setCities(newCities);
//       } catch (error) {}
//     }
//   };
//   const onAdd = async (dataCities: FormCites) => {
//     try {
//       const newCity = await ADDCity(dataCities);
//       alert("Thêm mới thành công");
//       setCities([...cities, newCity]);
//       navigate("/cities", { replace: true });
//     } catch (error) {
//       // Xử lý lỗi
//     }
//   };
//   return (
//     <CitiesCT.Provider value={{ cities, onAdd, onDelete }}>
//       {children}
//     </CitiesCT.Provider>
//   );
// };

// export default CitiesContext;
