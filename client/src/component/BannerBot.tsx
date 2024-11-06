import React from "react";

type Props = {};

const BannerBot = (props: Props) => {
  return (
    <>
      <div
        className="banner w-full h-[300px] sm:h-[400px] md:h-[470px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("src/upload/bfBot.png")',
        }}
      >
        <div className="text-center p-4 sm:p-8 md:p-20">
          <p className="text-[20px] sm:text-[18px] md:text-[20px] font-bold text-white">
            TẦM NHÌN
          </p>
          <h1 className="font-taviraj italic text-[28px] sm:text-[36px] md:text-[60px] font-extrabold text-white mt-2 mb-4">
            Tôn vinh vẻ đẹp Việt Nam
          </h1>
          <p className="font-montserrat text-[14px] sm:text-[16px] md:text-[20px] font-bold text-white">
          Trở thành một trong những thương hiệu dịch vụ khách <br /> sạn hàng
            đầu khu vực Đông Nam Á, nâng cao vị thế và <br /> hình ảnh của Việt
            Nam
          </p>
        </div>
        <div className="font-montserrat font-bold flex flex-wrap justify-center gap-3 text-center px-4">
          <div className="w-[calc(50%-0.75rem)] sm:w-[calc(25%-0.75rem)] h-[100px] sm:h-[126px] bg-white p-2">
            <p className="text-[30px] sm:text-[40px] md:text-[50px] text-[#DF8D11BA]">
              40+
            </p>
            <p className="text-[12px] sm:text-[14px] md:text-[15px] text-[#716868]">
              năm phát triển
            </p>
          </div>
          <div className="w-[calc(50%-0.75rem)] sm:w-[calc(25%-0.75rem)] h-[100px] sm:h-[126px] bg-white p-2">
            <p className="text-[30px] sm:text-[40px] md:text-[50px] text-[#DF8D11BA]">
              05
            </p>
            <p className="text-[12px] sm:text-[14px] md:text-[15px] text-[#716868]">
              mô hình dịch vụ
            </p>
          </div>
          <div className="w-[calc(50%-0.75rem)] sm:w-[calc(25%-0.75rem)] h-[100px] sm:h-[126px] bg-white p-2">
            <p className="text-[30px] sm:text-[40px] md:text-[50px] text-[#DF8D11BA]">
              103
            </p>
            <p className="text-[12px] sm:text-[14px] md:text-[15px] text-[#716868]">
              công ty thành viên
            </p>
          </div>
          <div className="w-[calc(50%-0.75rem)] sm:w-[calc(25%-0.75rem)] h-[100px] sm:h-[126px] bg-white p-2">
            <p className="text-[30px] sm:text-[40px] md:text-[50px] text-[#DF8D11BA]">
              200+
            </p>
            <p className="text-[12px] sm:text-[14px] md:text-[15px] text-[#716868]">
              đối tác từ 30 quốc gia
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BannerBot;
