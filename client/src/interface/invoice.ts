export interface Invoice {
    companyName: string; // Tên công ty phát hành hóa đơn
    taxCode: string; // Mã số thuế công ty
    address: string; // Địa chỉ công ty
    phone: string; // Số điện thoại công ty
    invoiceDate: string; // Ngày phát hành hóa đơn
    customerName: string; // Tên khách hàng
    customerPhone: string; // Số điện thoại khách hàng
    paymentMethod: string; // Phương thức thanh toán (VD: MoMo, Thẻ tín dụng)
    services: {
      name: string; // Tên dịch vụ (VD: Tên khách sạn hoặc homestay)
      quantity: number; // Số lượng (VD: số phòng)
      price: number; // Giá tiền mỗi đơn vị
      total: number; // Tổng tiền (quantity * price)
    }[];
    totalAmount: number; // Tổng số tiền cần thanh toán
    totalAmountText: string; // Tổng tiền dưới dạng chữ
  }
  