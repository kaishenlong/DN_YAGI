import api from "../config/axios"

export const getallDashboard = async () => {
    try {
        const {data} = await api.get(`api/dashboard`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
        })
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}