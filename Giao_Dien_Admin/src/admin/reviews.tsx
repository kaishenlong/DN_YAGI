import React, { useContext } from 'react'
import { ReviewCT } from '../context/review';
import { IReview } from '../interface/review';



const Reviews = () => {

    const { review, onUpdateReviewStatus } = useContext(ReviewCT);

    console.log("🚀 ~ review :", review)
    // const handleReviewToggle = (productId: number | string, currentStatus: boolean) => {
    //   if (confirm('Bạn có chắc chắn muốn thay đổi trạng thái Kiểm Duyệt không?')) {
    //     onUpdateReviewStatus(productId, !currentStatus);
    //     alert('Cập nhật trạng thái Kiểm Duyệt thành công');
    //   }
    // };

    return (
        <div className="">
        <nav className="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
          <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
            <div className="capitalize">
              <nav aria-label="breadcrumb" className="w-max">
                <ol className="flex flex-wrap items-center w-full bg-opacity-60 rounded-md bg-transparent p-0 transition-all">
                  <li className="flex items-center text-blue-gray-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
                    <a href="#">
                      <p className="block antialiased font-sans text-sm leading-normal text-blue-900 font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100">dashboard</p>
                    </a>
                    <span className="text-gray-500 text-sm antialiased font-sans font-normal leading-normal mx-2 pointer-events-none select-none">/</span>
                  </li>
                  <li className="flex items-center text-blue-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-blue-500">
                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">Đánh Giá</p>
                  </li>
                </ol>
              </nav>
              <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-gray-900">Quản Lý Đánh Giá</h6>
            </div>
          </div>
        </nav>
        <div className="mt-12 ">
          <div className="mb-4 grid gap-3 2xl:grid-cols-1">
            <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                      <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                          <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            STT
                          </th>
                          <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            Tên Khách Hàng
                          </th>
                          <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            Nội Dung
                          </th>
                          <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            Điểm Đánh Giá
                          </th>
                          <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            Ngày Đánh Giá
                          </th>
                          <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            Khách Sạn Đánh Giá
                          </th>

                          <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            Chức Năng
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                        {/* {review.map((reviews: IReview, index: number) => (
                          <tr key={reviews.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                            <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {index + 1}
                            </td>
                            <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              Nguyễn Minh Đức
                            </td>
                            <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                             Phòng Xanh Sạch Đẹp
                            </td>
                            <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              10
                            </td>
                            <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            15/09/2024
                            </td>
                            <td className="py-4 px-6 text-sm text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Khách Sạn Em Ăn Gì Cũng Được
                            </td>

                            <td className="py-4 px-6 text-sm text-left font-medium whitespace-nowrap">
                              <button
                                onClick={() => handleReviewToggle(review.id, review.isReviewed)}
                                className={`ml-4 px-4 py-2 text-sm font-medium rounded-lg ${
                                  review.isReviewed
                                    ? 'bg-green-500 text-white'
                                    : 'bg-yellow-500 text-gray-900'
                                } hover:opacity-80 transition`}
                              >
                                {review.isReviewed ? 'Đã Kiểm Duyệt' : 'Chưa Kiểm Duyệt'}
                              </button>
                            </td>
                          </tr>
                        ))} */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Reviews
