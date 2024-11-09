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
const News = (props: Props) => {
  return (
    <div className=" w-full">
      <div className="relative h-[300px]">
        <div
          style={{
            backgroundImage: 'url("src/upload/tintuc.jpeg")',
            backgroundSize: "cover",
            backgroundPosition: "0px",
          }}
          className="absolute w-full h-[399px] "
        >
          <p className="font-taviraj text-[61px]  italic font-extrabold  text-center mt-[150px] text-[#FFFFFF]">
            Tin Tức
          </p>
        </div>
      </div>

      <div className="content mt-[150px]">
        <div className="max-w-4xl mx-auto p-4 font-sans">
          <h1 className="font-taviraj text-[40px] leading-81.89px font-semibold text-center  mb-6 ">
            Thư Viện Video
          </h1>
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

export default News;
