import { createContext, useEffect, useState } from "react";
import { ILove } from "../component/api/catagory";
import api from "../component/config/axios";

export const hotelCT = createContext({} as any);
const CategoryCT = ({ children }: Props) => {
    const [hotels, setHotel] = useState<ILove[]>([]);
    useEffect(() => {
      (async () => {
        const data = await getallHotels();
        setHotel(data.data);
      })();
    }, []);
}
export const getallHotels = async ()=>{
    try {
        const {data} = await api.get('api/hotel')
        return data
    } catch (error) {
        throw new Error('Error')
    }
}
export default CategoryCT;
