import React from "react";
import Lottie from "react-lottie";
import Confetti from "react-confetti";
import great from "../End/Animation/great.json";
import successAnimation from "../End/Animation/successAnimation.json";
import { useWindowSize } from "react-use";

const End = () => {
  const { width, height } = useWindowSize();

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: successAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <Confetti
        width={width}
        height={height}
        numberOfPieces={500}
        recycle={false}
      />
      <div className="bg-white  mt-[50px] p-8 rounded-lg shadow-lg text-center">
        <Lottie options={defaultOptions} height={100} width={100} />
        <h1 className="text-2xl font-bold mt-4">Thanh toán thành công!</h1>
        <p className="text-gray-600 mt-2">
          Cảm ơn bạn đã tin tưởng chúng tôi. Đơn hàng của bạn đã được xử lý
          thành công.
        </p>
        <button className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
          Quay lại trang chủ
        </button>
      </div>
    </div>
  );
};

export default End;
