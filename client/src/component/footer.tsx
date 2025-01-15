import {
  Facebook,
  Mail,
  Map,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import React, { useEffect } from "react";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 300000); // Reload every 5 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <footer
      className="bg-[#00396B] text-white py-8"
      style={{
        backgroundImage: 'url("src/upload/backgroundft.png")',
        backgroundSize: "cover",
      }}
    >
      <div className="bg-background text-foreground p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-[200px]">
          <div className="logo">
            <img src="l" alt="" className="w-32 lg:w-auto" />
          </div>
          <div className="w-full lg:w-auto">
            <div>
              <nav className="flex flex-wrap justify-center lg:justify-start text-white text-base lg:text-[20px] text-center space-y-2 lg:space-y-0 lg:space-x-7">
                <a
                  href="#"
                  className="hover:text-yellow-400 hover:underline block lg:inline-block w-full lg:w-auto"
                >
                  Sang trọng
                </a>
                <a
                  href="#"
                  className="hover:text-yellow-400 hover:underline block lg:inline-block w-full lg:w-auto"
                >
                  Tiện nghi
                </a>
                <a
                  href="#"
                  className="hover:text-yellow-400 hover:underline block lg:inline-block w-full lg:w-auto"
                >
                  Lãng mạn
                </a>
                <a
                  href="#"
                  className="hover:text-yellow-400 hover:underline block lg:inline-block w-full lg:w-auto"
                >
                  Phong cách
                </a>
                <a
                  href="#"
                  className="hover:text-yellow-400 hover:underline block lg:inline-block w-full lg:w-auto"
                >
                  Thư giãn
                </a>
              </nav>
            </div>
            <hr className="my-6 lg:my-[46px] w-full lg:w-[801px]" />
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="w-full lg:w-1/4 text-center lg:text-left">
                <p className="text-xl lg:text-[24px]">
                  TỔNG CÔNG TY KHÁCH SẠN YAGI
                </p>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="flex items-center mb-2 justify-center lg:justify-start">
                  <Map className="mr-2 text-yellow-600" />
                  <span className="text-muted-foreground text-sm lg:text-base">
                    Trịnh Văn Bồ, Xuân Phương, Nam Từ Liêm, Hà Nội
                  </span>
                </div>
                <div className="flex items-center mb-2 justify-center lg:justify-start">
                  <Phone className="mr-2 text-yellow-600" />
                  <span className="text-muted-foreground text-sm lg:text-base">
                    (84-28) - 927 5887
                  </span>
                </div>
                <div className="flex items-center justify-center lg:justify-start">
                  <Mail className="mr-2 text-yellow-600" />
                  <span className="text-muted-foreground text-sm lg:text-base">
                    inforyagi@gmail.com.vn
                  </span>
                </div>
              </div>
              <div className="w-full lg:w-1/4 mt-4 lg:mt-[30px]">
                <div className="grid grid-cols-3 gap-2 justify-items-center lg:justify-items-start">
                  <Facebook className="w-8 h-8" />
                  <Twitter className="w-8 h-8" />
                  <Youtube className="w-8 h-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="w-full my-6 lg:mt-[70px] lg:mb-[50px]" />
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="mb-4 lg:mb-0">
            <p className="text-sm lg:text-base">@2020 YaGiHotel Group</p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm lg:text-base">
            <p>Sơ đồ website</p>
            <p>Liên hệ</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
