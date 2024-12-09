import React from "react";

const CreateLocationForm: React.FC = () => {
  return (
    <div className="bg-cream w-[1000px] text-charcoal min-h-screen font-sans leading-normal overflow-x-hidden lg:overflow-auto">
      <main className="flex-1 md:p-0 lg:pt-8 lg:px-8 md:ml-24 flex flex-col">
        <section className="bg-cream-lighter p-4 shadow">
          <div className="md:flex">
            <h2 className="md:w-1/3 uppercase tracking-wide text-sm sm:text-lg mb-6">
              Thêm Mới Khách Sạn
            </h2>
          </div>
          <form>
            {/* Location Section */}
            <div className="md:flex mb-8">
              <div className="md:w-1/3">
                <legend className="uppercase tracking-wide text-sm">
                  Thông tin Khách Sạn
                </legend>
                <p className="text-xs font-light text-red">Bắt Buộc Nhập</p>
              </div>
              <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                <div className="mb-4">
                  <label className="block uppercase tracking-wide text-xs font-bold">
                    Tên Khách Sạn
                  </label>
                  <input
                    className="w-full shadow-inner p-4 border-0"
                    type="text"
                    name="name"
                    placeholder="Acme Mfg. Co."
                  />
                </div>
                <div className="mb-4">
                  <div className="md:flex-1 md:pr-3">
                    <label className="block uppercase tracking-wide text-xs font-bold">
                      Địa Chỉ
                    </label>
                    <input
                      className="w-full shadow-inner p-4 border-0"
                      type="text"
                      name="name"
                      placeholder="Acme Mfg. Co."
                    />
                  </div>
                  <div className="md:flex-1 md:pr-3">
                    <label className="block uppercase tracking-wide text-xs font-bold">
                      Bản Đồ
                    </label>
                    <input
                      className="w-full shadow-inner p-4 border-0"
                      type="text"
                      name="name"
                      placeholder="Acme Mfg. Co."
                    />
                  </div>
                  <div className="md:flex-1 md:pr-3">
                    <label className="block uppercase tracking-wide text-xs font-bold">
                      Email
                    </label>
                    <input
                      className="w-full shadow-inner p-4 border-0"
                      type="text"
                      name="name"
                      placeholder="Acme Mfg. Co."
                    />
                  </div>
                </div>
                <div className="md:flex mb-4">
                  <div className="md:flex-1 md:pr-3">
                    <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                      Số điện thoại
                    </label>
                    <input
                      className="w-full shadow-inner p-4 border-0"
                      type="text"
                      name="lat"
                      placeholder="30.0455542"
                    />
                  </div>
                  <div className="md:flex-1 md:pl-3">
                    <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                      Đánh giá
                    </label>
                    <input
                      className="w-full shadow-inner p-4 border-0"
                      type="text"
                      name="lon"
                      placeholder="-99.1405168"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Description */}
            <div className="md:flex mb-6">
              <div className="md:w-1/3">
                <legend className="uppercase tracking-wide text-sm">
                  Miêu Tả
                </legend>
              </div>
              <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
              <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                      Miêu tả Khách sạn
                    </label>
                <textarea
                  className="w-full shadow-inner p-4 border-0"
                  placeholder="We build fine acmes."
                  rows={6}
                />
              </div>
            </div>

            {/* Contact Section */}
            <div className="md:flex mb-8">
              <div className="md:w-1/3">
                <legend className="uppercase tracking-wide text-sm">
                  Trạng Thái 
                </legend>
              </div>
              <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                <div className="mb-4">
                  <label className="block uppercase tracking-wide text-xs font-bold">
                  Trạng Thái khách sạn (Tùy Chọn)
                  </label>
                  <input
                    className="w-full shadow-inner p-4 border-0"
                    type="tel"
                    name="phone"
                    placeholder="(555) 555-5555"
                  />
                </div>
                <div className="mb-4">
                  <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                    ID người dùng (Tùy Chọn)
                  </label>
                  <input
                    className="w-full shadow-inner p-4 border-0"
                    type="url"
                    name="url"
                    placeholder="acme.co"
                  />
                </div>
                <div className="mb-4">
                  <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                    Chọn tỉnh thành
                  </label>
                  <input
                    className="w-full shadow-inner p-4 border-0"
                    type="email"
                    name="email"
                    placeholder="contact@acme.co"
                  />
                </div>
              </div>
            </div>


            

            {/* Cover Image */}
            <div className="md:flex mb-6">
              <div className="md:w-1/3">
                <legend className="uppercase tracking-wide text-sm">
                  Thêm ảnh
                </legend>
              </div>
              <div className="md:flex-1 px-3 ">
                <div className="button bg-gold hover:bg-gold-dark text-cream mx-auto cursor-pointer relative">
                  <input
                    className="opacity-0 absolute pin-x pin-y"
                    type="file"
                    name="cover_image"
                  />
                  Add Cover Image
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="md:flex mb-6 border border-t-1 border-b-0 border-x-0 border-cream-dark">
              <div className="md:flex-1 px-3 text-center md:text-right">
                <input type="hidden" name="sponsor" value="0" />
                <input
                  className="button text-cream-lighter bg-brick hover:bg-brick-dark"
                  type="submit"
                  value="Create Location"
                />
              </div>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default CreateLocationForm;
