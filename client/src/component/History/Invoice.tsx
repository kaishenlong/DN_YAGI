import React from "react";
import { Invoice } from "../../interface/invoice";

export const convertToInvoice = (booking: any, detailPayment: any): Invoice => {
    return {
      companyName: "CÔNG TY CỔ PHẦN KHÁCH SẠN YAGI",
      taxCode: "022557788",
      address: "Trịnh Văn Bô, Xuân Phương, Nam Từ Liêm, Hà Nội",
      phone: "02838225887",
      invoiceDate: new Date().toLocaleDateString("vi-VN"), // Ngày hiện tại
      customerName: `${detailPayment.firstname} ${detailPayment.lastname}`, // Lấy từ detailPayment
      customerPhone: detailPayment.phone, // Số điện thoại khách hàng
      paymentMethod: detailPayment.method || "N/A", // Phương thức thanh toán
      services: [
        {
          name: booking.hotelName,
          quantity: booking.quantity,
          price: detailPayment.total_amount / booking.quantity, // Giá mỗi phòng
          total: detailPayment.total_amount, // Tổng tiền
        },
      ],
      totalAmount: detailPayment.total_amount, // Tổng tiền
      totalAmountText: convertNumberToWords(detailPayment.total_amount), // Hàm chuyển số thành chữ
    };
  };
  
  // Hàm chuyển số thành chữ (giả định bạn đã có hoặc sử dụng thư viện ngoài)
  const convertNumberToWords = (amount: number): string => {
    // Ví dụ: 500000 => "năm trăm nghìn đồng"
    // Thực thi logic tại đây hoặc dùng thư viện
    return "năm trăm nghìn đồng";
  };
  
  const InvoiceComponent: React.FC<{ invoice: Invoice }> = ({ invoice }) => {
    return (
      <div className="invoice-container">
        <h2 className="text-xl font-bold text-center">Hóa Đơn Đặt Phòng</h2>
        <p className="text-right">Ngày: {invoice.invoiceDate}</p>
  
        <div className="company-info">
          <p>{invoice.companyName}</p>
          <p>Mã số thuế: {invoice.taxCode}</p>
          <p>Địa chỉ: {invoice.address}</p>
          <p>Số điện thoại: {invoice.phone}</p>
        </div>
  
        <div className="customer-info mt-4">
          <p>Người thanh toán: {invoice.customerName}</p>
          <p>Số điện thoại: {invoice.customerPhone}</p>
          <p>Phương thức thanh toán: {invoice.paymentMethod}</p>
        </div>
  
        <div className="services-table mt-4 border border-gray-300">
          <table className="w-full">
            <thead>
              <tr>
                <th className="border px-4 py-2">STT</th>
                <th className="border px-4 py-2">Dịch vụ</th>
                <th className="border px-4 py-2">Số lượng</th>
                <th className="border px-4 py-2">Đơn giá</th>
                <th className="border px-4 py-2">Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {invoice.services.map((service, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{service.name}</td>
                  <td className="border px-4 py-2">{service.quantity}</td>
                  <td className="border px-4 py-2">{service.price.toLocaleString()} VND</td>
                  <td className="border px-4 py-2">{service.total.toLocaleString()} VND</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        <div className="total mt-4 text-right">
          <p>Tổng tiền: {invoice.totalAmount.toLocaleString()} VND</p>
          <p>Số tiền bằng chữ: {invoice.totalAmountText}</p>
        </div>
      </div>
    );
  };
  

export default InvoiceComponent;

// Usage example:
// <Invoice invoiceData={yourInvoiceData} />
