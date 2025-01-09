import React, { useEffect, useState } from 'react';
import axios from '../config/axios';
import { getAllBackup, backups, deleteBackup, downloadBackup } from '../services/backupService';

interface BackupItem {
  name: string,
  url: string,
  size: number
}
const BackupList = () => {
  const [backupList, setBackupList] = useState<BackupItem[]>([]);
  const [isBackingUp, setIsBackingUp] = useState(false); // Theo dõi trạng thái backup

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10); // Số mục trên mỗi trang
  const fetchBackupList = async () => {
    try {

      const response = await getAllBackup();
      console.log('Fetched all backup files', response)
      setBackupList(response.data.reverse());
    } catch (error) {
      console.error("Failed to fetch backup files:", error);
    }
  }

  useEffect(() => {
    fetchBackupList(); // Load tất cả dữ liệu ban đầu
    // const intervalId = setInterval(() => {
    //   fetchBackupList(); // Load tất cả dữ liệu ban đầu
    // }, 5000);  // Kiểm tra mỗi 5 giây
  }, []);

  // Tạo backup
  const handleBackup = async () => {
    setIsBackingUp(true); // Bắt đầu backup
    try {
      const response = await backups();
      if (response.status === 200) {
        fetchBackupList();
        alert('Backup created successfully!');
      } else {
        alert('Backup failed!');
      }
    } catch (error) {
      console.error('Error creating backup:', error);
      alert('An error occurred while creating backup!');
    } finally {
      setIsBackingUp(false); // Kết thúc backup
    }
  };

  const onDelete = async (filename: string) =>{
    if (window.confirm(`Bạn có muốn xóa file ${filename}?`)) {
      try {
        const response = await deleteBackup(filename);
        fetchBackupList();
        alert("Xóa thành công!")
        
        
      } catch (error) {
        console.error('Error deleting backup:', error);
            alert('Failed to delete backup. Please try again.');
      }
    }
  }



  const downloadBackup = async (filename: string) => {
      try {
          const response = await axios.get(`/api/backups/download/${filename}`, {
              responseType: 'blob', // Quan trọng để xử lý file
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`, // Token xác thực nếu sử dụng JWT
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
          console.error('Error downloading the file:', error.response?.data?.message || error.message);
      }
  };
  
  

  // Tính toán dữ liệu hiển thị dựa trên trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = backupList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(backupList.length / itemsPerPage);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="">
      <div className="mt-3 ">
        <h1 className="text-gray-900 text-xl font-semibold">Backup Files</h1>
        <button
          onClick={handleBackup}
          disabled={isBackingUp} // Vô hiệu hóa nút khi đang backup
          className={`mt-4 px-4 py-2 rounded text-white ${isBackingUp ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'
            }`}
        >
          {isBackingUp ? 'Đang thực thi...' : 'Backup Now'}
        </button>
      </div>
      <div className="mt-1  w-full mx-auto">

        <div className="mb-4 grid grid-cols-1 gap-6 ">
          <div className="relative flex flex-col bg-white rounded-xl shadow-md overflow-hidden xl:col-span-2">
            <div className="flex flex-col">
              <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-x-auto">
                    <table className="w-[1190px] divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                      <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                          <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            #
                          </th>
                          <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            File Name
                          </th>
                          <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            Size (bytes)
                          </th>
                          <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody  className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                        {backupList.length > 0 ? (
                          currentItems.map((file, index: number) => (
                            <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                              <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {index + 1}
                              </td>
                              <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {file.name}
                              </td>
                              <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {file.size}
                              </td>
                              <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <button
                                onClick={()=>downloadBackup(file.name)}
                                 className="bg-blue-500 mx-1 hover:bg-red-700 text-white font-semibold py-1 px-2 rounded-lg transition">
                                  Download
                                </button>
                                  
                               
                                <button
                            onClick={() => onDelete(file.name)}
                            className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-2 rounded-lg transition"
                          >
                            Delete
                          </button>
                              </td>
                             
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                              No backup files found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    <div className="flex justify-end space-x-2 px-4 py-2">
                      {/* Hiển thị trang 1 và dấu ba chấm nếu cần */}
                      {currentPage > 3 && (
                        <>
                          <button
                            onClick={() => handlePageClick(1)}
                            className="px-2 py-1 rounded bg-gray-300"
                          >
                            1
                          </button>
                          <span className="px-2 py-1">...</span>
                        </>
                      )}

                      {/* Hiển thị các trang xung quanh trang hiện tại */}
                      {Array.from({ length: 5 }, (_, index) => {
                        const pageNum = currentPage - 2 + index;
                        if (pageNum > 0 && pageNum <= totalPages) {
                          return (
                            <button
                              key={pageNum}
                              onClick={() => handlePageClick(pageNum)}
                              className={`px-2 py-1 rounded ${currentPage === pageNum ? "bg-blue-500 text-white" : "bg-gray-300"}`}
                            >
                              {pageNum}
                            </button>
                          );
                        }
                        return null;
                      })}

                      {/* Hiển thị dấu ba chấm và trang cuối nếu cần */}
                      {currentPage < totalPages - 2 && (
                        <>
                          <span className="px-2 py-1">...</span>
                          <button
                            onClick={() => handlePageClick(totalPages)}
                            className="px-2 py-1 rounded bg-gray-300"
                          >
                            {totalPages}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  );

}
export default BackupList;