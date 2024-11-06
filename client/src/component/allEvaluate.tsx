import React from "react";

const AllEvaluate = () => {
  return (
    <>
      <div className="p-4 sm:p-6 bg-background text-foreground">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-8">
          Tất cả đánh giá
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex items-start pb-4">
              <img
                src="https://placehold.co/50x50"
                alt="Reviewer Photo"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-sm sm:text-base m-1">
                  Phạm Lan
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground m-1">
                  18/09/2024
                </p>
                <div className="flex flex-wrap gap-2 m-1">
                  <p className="text-xs sm:text-sm text-center border w-[53px] h-[27px] text-[#FFFFFF] font-bold p-1 bg-[#0460B196]">
                    4.0/5
                  </p>
                  <p className="text-sm sm:text-base font-bold mt-1">
                    Khách sạn đẹp vô cùng
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-[#00000080]">
                  Từ không gian đến tiện ích đều vô cùng hài lòng...
                </p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-xl sm:text-2xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4">
          Thêm đánh giá
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Địa chỉ email của bạn sẽ được bảo mật.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
          {[
            "Đánh giá chung",
            "Dịch vụ",
            "Giá cả",
            "Không gian",
            "Tiện ích",
            "Thiết kế",
          ].map((label, index) => (
            <div key={index}>
              <label className="block text-xs sm:text-sm font-medium mb-1">
                {label}
              </label>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg sm:text-xl ${
                      i < 3 ? "text-yellow-500" : "text-zinc-300"
                    }`}
                  >
                    ⭐
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllEvaluate;
