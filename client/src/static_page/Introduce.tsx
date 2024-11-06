import React from "react";

type Props = {};

const Introduce = (props: Props) => {
  return (
    <>
      <div className="w-full">
        <div className="relative h-[300px]">
          <div
            style={{
              backgroundImage: 'url("src/upload/gthieu.jpeg")',
              backgroundSize: "cover",
              backgroundPosition: "0px",
            }}
            className="absolute w-full h-[399px] "
          >
            <p className="font-taviraj text-[61px]  italic font-extrabold  text-center mt-[150px] text-[#FFFFFF]">
              Về YaGi Group
            </p>
          </div>
        </div>
        <div className="content mt-[150px]">
          <div className="max-w-3xl mx-auto p-4 font-sans">
            <h1 className="text-3xl font-bold  text-blue-600 mb-6 italic">
              Tầm nhìn
            </h1>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-2 pl-12">
                Thương hiệu khách sạn hàng đầu Việt Nam.
              </h2>
              <p className="mb-4 text-xl">
                Trở thành một trong những thương hiệu khách sạn Việt Nam nổi bật
                nhất Đông nam Á.
              </p>
              <div className="w-full h-[300px] ">
                <img
                  src="src/upload/vechungtoi.jpeg"
                  className="w-full h-full object-cover "
                />
              </div>
            </section>

            <h1 className="text-3xl font-bold  text-blue-600 mb-6 italic">
              Sứ mệnh
            </h1>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-2 pl-12">
                Mang lại trải nghiệm, hạnh phúc đến cho khách hàng, đối tác,
                người lao động, chủ sở hữu và cộng đồng thông qua các sản phẩm
                và dịch vụ khách sạn.
              </h2>
              <p className="my-10 text-xl">
                Với sứ mệnh cao cả, VGH Group đang từng bước đưa sứ mệnh này đi
                vào thực tiễn tại thị trường sản Việt Nam, mang hình ảnh Việt
                Nam đến khắp năm châu thông qua việc cung cấp trải nghiệm, sản
                phẩm, dịch vụ độc đáo, chưa từng có trí cho khách hàng và các
                tương quan.
              </p>
              <div className="w-full h-[400px] ">
                <img
                  src="src/upload/thugian2.jpeg"
                  className="w-full h-2/3 object-cover "
                />
              </div>
            </section>

            <h1 className="text-3xl font-bold   text-blue-600 mb-6 italic">
              Giá trị cốt lõi
            </h1>

            <section className="mb-8">
              <div className="flex justify-around my-10 italic text-2xl">
                <p>Chính trực</p>
                <p>Hợp lực</p>
                <p>Sáng tạo</p>
                <p>Đẳng cấp</p>
              </div>
              <div className="w-full h-[400px] ">
                <img
                  src="src/upload/vungtau.jpeg"
                  className="w-full h-2/3 object-cover "
                />
              </div>
            </section>
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Introduce;
