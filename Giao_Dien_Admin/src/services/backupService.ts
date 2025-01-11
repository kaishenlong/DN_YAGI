import api from "../config/axios"

export const getAllBackup = async ()=>{
    try {
        const {data}= await api.get(`api/backups`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Token xác thực nếu sử dụng JWT
            },
        })
        return data
    } catch (error) {
        throw new Error('Error')
    }
}
export const backups = async ()=>{
    try {
        const {data}= await api.post(`/api/backup`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          })
        return data
    } catch (error) {
        throw new Error('Error')
    }
}

export const deleteBackup = async (filename: string)=>{
    try {
        const {data}= await api.delete(`/api/backup/${filename}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Token xác thực nếu sử dụng JWT
            },
        })
        return data 
    } catch (error) {
        throw new Error('Error')
    }
}

export const downloadBackup = async (filename: string) => {
    try {
        const response = await api.get(`/api/backups/download/${filename}`, {
            responseType: 'blob', // Quan trọng để xử lý file
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Token xác thực nếu sử dụng JWT
            },
        });

        // Tạo link để tải file
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename); // Đặt tên file tải xuống
        document.body.appendChild(link);
        link.click();
        link.remove();
    } catch (error) {
        throw new Error('Error')
    }
};
