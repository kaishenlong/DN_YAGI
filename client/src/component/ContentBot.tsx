import React from "react";

type Props = {};

const ContentBot = (props: Props) => {
  return (
    <>
      <div className="content flex flex-col md:flex-row justify-center gap-4 px-4 md:px-0">
        <div
          className="w-full md:w-[443px] h-[300px] md:h-[395px] bg-cover bg-center relative"
          style={{
            backgroundImage: 'url("src/upload/halong.png")',
          }}
        >
          <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8">
            <a
              className="text-2xl md:text-3xl lg:text-[36px] text-white hover:text-yellow-400 hover:underline"
              href=""
            >
              Hình Ảnh
              <p className="text-base md:text-lg lg:text-[20px]">
                Xem tất cả các hình ảnh
              </p>
            </a>
          </div>
        </div>
        <div className="w-full md:w-[560px] h-[300px] md:h-[395px]">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/QSMpmdXQ9RM?si=Gotdfy_u5FUdcLcg"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default ContentBot;
