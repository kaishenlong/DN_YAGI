export interface ILove {
    id: number; // ID duy nhất của mục yêu thích
    name: string; // Tên khách sạn
    slug: string; // Slug của khách sạn (URL-friendly)
    city_id: number; // ID của thành phố
    address: string; // Địa chỉ khách sạn
    email: string; // Email liên hệ
    phone: string; // Số điện thoại liên hệ
    rating: string; // Đánh giá khách sạn
    description: string; // Mô tả khách sạn
    map: string; // Địa chỉ bản đồ của khách sạn
    image: string; // URL của ảnh khách sạn

  }
