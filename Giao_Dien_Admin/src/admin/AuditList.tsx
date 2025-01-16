import React, { useEffect, useState } from "react";
import { fetchAuditList } from "../services/auditService";
import { format } from "date-fns";

interface AuditChanges {
  new?: Record<string, any>;
  deleted?: Record<string, any>;
  updated?: Record<string, any>;
  original?: Record<string, any>;
}

interface AuditItem {
  id: number;
  name: string;
  user_id: string;
  description: string;
  model_type: string;
  action: string;
  model_id: number;
  user_name: string;
  created_at: string;
  changes: AuditChanges;
}

const AuditList: React.FC = () => {
  const [auditList, setAuditList] = useState<AuditItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openSubmenuIndexes, setOpenSubmenuIndexes] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10); // Số mục trên mỗi trang
  const [filters, setFilters] = useState({
    model_type: "",
    model_id: "",
    user_id: "",
    action: "",
  });

  const toggleSubmenu = (index: number) => {
    if (openSubmenuIndexes.includes(index)) {
      setOpenSubmenuIndexes(openSubmenuIndexes.filter((i) => i !== index));
    } else {
      setOpenSubmenuIndexes([...openSubmenuIndexes, index]);
    }
  };

  const formatDate = (date: string) => {
    try {
      return format(new Date(date), "dd/MM/yyyy HH:mm:ss");
    } catch (error) {
      // console.error("Invalid date format:", date);
      return date;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Ngăn reload trang
    const formData = new FormData(e.currentTarget);
    const updatedFilters = {
      model_type: formData.get("model_type")?.toString() || "",
      model_id: formData.get("model_id")?.toString() || "",
      user_id: formData.get("user_id")?.toString() || "",
      action: formData.get("action")?.toString() || "",
    };

    setFilters(updatedFilters); // Lưu giá trị hiện tại
    fetchAudits(updatedFilters); // Gọi API với bộ lọc
  };

  const fetchAudits = async (filters: Record<string, any>) => {
    try {
      setLoading(true);
      const response = await fetchAuditList(filters);
      // console.log("Data audits fetched:", response);
      setAuditList(response.audits);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch audits:", error);
      setError("Failed to fetch audits. Please try again.");
      setAuditList([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchAudits({}); // Load tất cả dữ liệu ban đầu
  }, []);
  // Tính toán dữ liệu hiển thị dựa trên trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = auditList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(auditList.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  // if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="">
      <div className="mt-3 ">
        <h1 className="text-gray-900 text-xl font-semibold">Audit Logs</h1>
      </div>
      <form
        id="filterForm"
        onSubmit={handleSubmit}
        className="bg-white p-3 rounded-lg shadow-md space-y-4 w-full max-w-full mx-auto"
      >
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex flex-col">
            <label
              htmlFor="model_type"
              className="block text-sm font-medium text-gray-700"
            >
              Loại model
            </label>
            <select
              id="model_type"
              name="model_type"
              value={filters.model_type}
              onChange={(e) =>
                setFilters({ ...filters, model_type: e.target.value })
              }
              className="block w-48 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Chọn loại model</option>
              <option value="City">City</option>
              <option value="Hotel">Hotel</option>
              <option value="User">User</option>
              <option value="CartDetail">CartDetail</option>
              <option value="Cart">Cart</option>
              <option value="DetailRoom">DetailRoom</option>
              <option value="room">Room</option>
              <option value="payment">Payment</option>
              <option value="booking">Booking</option>
              <option value="Transaction">Transaction</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="model_id"
              className="block text-sm font-medium text-gray-700"
            >
              Model ID
            </label>
            <input
              id="model_id"
              type="text"
              name="model_id"
              placeholder="Model ID"
              value={filters.model_id}
              onChange={(e) =>
                setFilters({ ...filters, model_id: e.target.value })
              }
              className="block w-32 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="user_id"
              className="block text-sm font-medium text-gray-700"
            >
              ID/Tên người chỉnh sửa
            </label>
            <input
              id="user_id"
              type="text"
              name="user_id"
              placeholder="User ID/ Tên người chỉnh sửa"
              value={filters.user_id}
              onChange={(e) =>
                setFilters({ ...filters, user_id: e.target.value })
              }
              className="block w-64 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="action"
              className="block text-sm font-medium text-gray-700"
            >
              Hành động
            </label>
            <select
              id="action"
              name="action"
              value={filters.action}
              onChange={(e) =>
                setFilters({ ...filters, action: e.target.value })
              }
              className="block w-48 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Chọn hành động</option>
              <option value="create">Create</option>
              <option value="update">Update</option>
              <option value="delete">Delete</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Lọc
            </button>
          </div>
        </div>
      </form>

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
                            ID
                          </th>
                          <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            Model
                          </th>

                          <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            Hành động
                          </th>
                          <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            model_id
                          </th>
                          <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            ID - Người thực hiện
                          </th>
                          <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            Thời điểm
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                        {Array.isArray(auditList) && auditList.length > 0 ? (
                          currentItems.map((audit, index: number) => (
                            <React.Fragment key={index}>
                              <tr
                                onClick={() => toggleSubmenu(index)}
                                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                  {audit.id}
                                </td>
                                <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                  {audit.model_type}
                                </td>
                                <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                  {audit.action}
                                </td>
                                <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                  {audit.model_id}
                                </td>
                                <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                  {audit.user_name
                                    ? audit.user_id + " - " + audit.user_name
                                    : "N/A"}
                                </td>
                                <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                  {formatDate(audit.created_at)}
                                </td>
                              </tr>
                              {openSubmenuIndexes.includes(index) && (
                                <tr>
                                  <td
                                    colSpan={6}
                                    className="bg-gray-100 dark:bg-gray-700"
                                  >
                                    <div className="p-4">
                                      <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
                                          Thay đổi: {audit.action}
                                        </h2>
                                        <div className="text-right dark:text-white">
                                          <strong>Thời gian thay đổi:</strong>{" "}
                                          {formatDate(audit.created_at)}
                                        </div>
                                      </div>

                                      {audit.changes ? (
                                        <div className="overflow-x-auto bg-white rounded-lg shadow">
                                          <table className="min-w-full table-auto text-sm text-left text-gray-700">
                                            <thead>
                                              <tr className="bg-gray-200">
                                                <th className="px-4 py-2 font-medium"></th>
                                                <th className="px-4 py-2 font-medium">
                                                  Gốc
                                                </th>
                                                <th className="px-4 py-2 font-medium">
                                                  Các trường thay đổi
                                                </th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {/* Kiểm tra xem có `new` hay `original` và lặp qua chúng */}
                                              {(audit.changes.new
                                                ? Object.entries(
                                                    audit.changes.new
                                                  )
                                                : Object.entries(
                                                    audit.changes.original || {}
                                                  )
                                              ).map(([key, value]) => (
                                                <tr
                                                  className="border-t"
                                                  key={key}
                                                >
                                                  <td className="px-4 py-2 font-medium capitalize break-word">
                                                    {key.replace("_", " ")}
                                                  </td>
                                                  {/* Hiển thị 'Trước' nếu có original, hoặc '' nếu là 'new' */}
                                                  <td className="px-4 py-2">
                                                    {audit.changes.new
                                                      ? "--"
                                                      : value !== null &&
                                                        value !== undefined
                                                      ? value.toString()
                                                      : "N/A"}
                                                  </td>
                                                  {/* Hiển thị 'Sau' nếu có new, nếu không thì hiển thị updated hoặc deleted */}
                                                  <td className="px-4 py-2">
                                                    {audit.changes.new ? (
                                                      value !== null &&
                                                      value !== undefined ? (
                                                        value.toString()
                                                      ) : (
                                                        "N/A"
                                                      )
                                                    ) : audit.changes.deleted &&
                                                      audit.changes.deleted[
                                                        key
                                                      ] !== undefined ? (
                                                      audit.changes.deleted[
                                                        key
                                                      ] !== null &&
                                                      audit.changes.deleted[
                                                        key
                                                      ] !== undefined ? (
                                                        audit.changes.deleted[
                                                          key
                                                        ].toString()
                                                      ) : (
                                                        "N/A"
                                                      )
                                                    ) : audit.changes.updated &&
                                                      audit.changes.updated[
                                                        key
                                                      ] !== undefined ? (
                                                      typeof audit.changes
                                                        .updated[key] ===
                                                        "string" &&
                                                      audit.changes.updated[
                                                        key
                                                      ].startsWith("http") ? (
                                                        <a
                                                          href={
                                                            audit.changes
                                                              .updated[key]
                                                          }
                                                          target="_blank"
                                                          rel="noopener noreferrer"
                                                          className="text-blue-500 underline"
                                                        >
                                                          View Link
                                                        </a>
                                                      ) : audit.changes.updated[
                                                          key
                                                        ] !== null &&
                                                        audit.changes.updated[
                                                          key
                                                        ] !== undefined ? (
                                                        audit.changes.updated[
                                                          key
                                                        ].toString()
                                                      ) : (
                                                        "N/A"
                                                      )
                                                    ) : (
                                                      "--"
                                                    )}
                                                  </td>
                                                </tr>
                                              ))}
                                            </tbody>
                                          </table>
                                        </div>
                                      ) : (
                                        <p className="text-sm text-gray-500">
                                          No changes available.
                                        </p>
                                      )}
                                      {/* <p className="mt-4 text-gray-600 dark:text-white">
                                        <strong>Created At:</strong> {formatDate(audit.created_at)}
                                      </p> */}
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="text-center py-4">
                              <p>No audits found.</p>
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
                              className={`px-2 py-1 rounded ${
                                currentPage === pageNum
                                  ? "bg-blue-500 text-white"
                                  : "bg-gray-300"
                              }`}
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
};

export default AuditList;
