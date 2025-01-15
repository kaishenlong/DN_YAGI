import api from "../config/axios"

export const getallDashboard = async (start_date: string, end_date: string) => {
    try {
        const { data } = await api.get(`api/dashboard`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            params: {
                start_date: start_date,
                end_date: end_date,
            },
        });
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
};

