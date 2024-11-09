import React from "react";

type Props = {};
const imageData = [
  { image: "src/upload/dv1.jpeg" },
  { image: "src/upload/dv2.jpeg" },
  { image: "src/upload/dv3.jpeg" },
  { image: "src/upload/dv4.jpeg" },
  { image: "src/upload/dv5.jpeg" },
  { image: "src/upload/dv6.jpeg" },
];
const Service = (props: Props) => {
  return (
    <div className="w-full">
      <div className="relative h-[300px]">
        <div
          style={{
            backgroundImage: 'url("src/upload/dichvu.jpeg")',
            backgroundSize: "cover",
            backgroundPosition: "0px",
          }}
          className="absolute w-full h-[399px] "
        >
          <p className="font-taviraj text-[61px]  italic font-extrabold  text-center mt-[150px] text-[#FFFFFF]">
            Giải trí
          </p>
        </div>
      </div>

      <div className="content mt-[150px]">
        <div className="max-w-4xl mx-auto p-4 font-sans">
          <section className="mb-8 max-w-3xl ml-10">
            <p className="mb-4 font-jaldi text-xl tracking-wider text-justify ">
              Với những lợi thế sẵn có về nguồn lực cũng như nỗ lực không ngừng
              trong việc giới thiệu tới khách hàng những dịch vụ du lịch, giải
              trí hiện đại hàng đầu, YaGi Group đã và đang phát triển nhiều hạng
              mục dịch vụ giải trí bao gồm hệ thống dịch vụ truyền hình cáp
              SCTV, các khu vui chơi giải trí (Công viên văn hóa Đầm Sen, Làng
              du lịch Bình Quới, Khu du lịch Sinh thái…), sân golf Thủ Đức,
              Trung tâm Hội chợ Triển lãm Sài Gòn (SECC) và hệ thống các câu lạc
              bộ trò chơi điện tử có thưởng.
            </p>
          </section>
          <h1 className="font-taviraj text-[40px] leading-81.89px font-semibold text-center  mb-6  ">Hình Ảnh</h1>
          <div className="grid grid-cols-2 ">
            {imageData.map((item, index) => (
              <div key={index} className="flex justify-center">
                <img
                  src={item.image}
                  alt=""
                  className=" w-[350px] h-[350px] mb-5"
                />
              </div>
            ))}
          </div>
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Service;
