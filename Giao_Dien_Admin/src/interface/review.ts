export interface IUser {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
  }
  
  export interface IHotel {
    id: number;
    name: string;
    address: string;
    email: string;
    phone: string;
    rating: string;
  }
  
  export interface IReview {
    id: number;
    created_at: string;
    updated_at: string | null;
    hotel_id: number;
    user_id: number;
    rating: number;
    comment: string;
    user?: IUser; // Thông tin người dùng
    hotel?: IHotel; // Thông tin khách sạn
    isReviewed?: boolean; // Trạng thái kiểm duyệt (có thể thêm tùy chỉnh)
  }
  