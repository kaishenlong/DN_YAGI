export interface ThongKeTongQuan {
    tong_doanh_thu: string;
    danh_gia_tb: string;
    tong_don_xac_nhan: number;
    tong_so_khach_da_den: number;
    tong_don_dat_phong: number;
    tong_don_huy: number;
    ti_le_huy: number;
    tong_so_thanh_toan_thanh_cong: number;
  }
  
  export interface ThongKeChiNhanh {
    hotel_id: number;
    ten_chi_nhanh: string;
    tong_don_dat_phong: number;
    thanh_toan_thanh_cong: number | null;
    tong_doanh_thu: string | null;
    don_xac_nhan: number;
    khach_da_den: number | null;
    don_huy: number;
    ti_le_huy: string;
    danh_gia_tb: string;
  }
  
  export interface DoanhThu7Ngay {
    ngay: string;
    doanh_thu: string;
  }
  
  export interface DoanhThuTheoThang {
    ngay: string;
    doanh_thu: string;
  }
  
  export interface DoanhThuCacThangTrongNam {
    thang: number;
    doanh_thu: string;
  }
  
  export interface ThongKeKhachHang {
    id_khach_hang: number;
    ten_khach_hang: string;
    so_lan_dat_phong: number;
    so_lan_dat_phong_thanh_cong: number;
    ty_le_dat_phong_thanh_cong: string;
    ty_le_huy_dat_phong: string;
    tong_so_ngay_luu_tru: string;
    tong_chi_tieu: string;
    ngay_dat_phong_gan_nhat: string;
  }
  
  export interface DashboardData {
    thongKeTongQuan: ThongKeTongQuan;
    thongKeChiNhanh: ThongKeChiNhanh[];
    doanhThu7Ngay: DoanhThu7Ngay[];
    doanhThuTheoThang: DoanhThuTheoThang[];
    doanhThuCacThangTrongNam: DoanhThuCacThangTrongNam[];
    thongKeKhachHang: ThongKeKhachHang[];
  }