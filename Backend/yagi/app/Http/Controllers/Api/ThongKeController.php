<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ThongKeController extends Controller
{
    public function index(Request $request)
    {
        // lấy thống kê theo tất cả các ngày
        $startDate = '0001-01-01';
        $endDate = '9999-12-31';
        if ($request->has('start_date')) {
            // lấy thống kê theo khoảng ngày mong muốn
            $startDate = $request->start_date;
        }
        if ($request->has('end_date')) {
            // lấy thống kê theo khoảng ngày mong muốn

            $endDate = $request->end_date;
        }




        $thongKeTongQuan = (object) [
            'tong_doanh_thu' => DB::table('payments')
                ->where('status', 'complete')
                ->whereBetween('created_at', [$startDate, $endDate])
                ->sum(DB::raw('COALESCE(total_amount, 0)')),  // Tổng doanh thu

            'danh_gia_tb' => DB::table('reviews')
                ->whereBetween('created_at', [$startDate, $endDate])
                ->avg(DB::raw('COALESCE(rating, 0)')),  // Đánh giá trung bình

            'tong_don_xac_nhan' => DB::table('payments')
                ->where('status', 'complete')
                ->whereBetween('created_at', [$startDate, $endDate])
                ->count(),  // Tổng số đơn xác nhận

            'tong_so_khach_da_den' => DB::table('bookings')
                ->where('status', 'checkin')
                ->whereBetween('check_in', [$startDate, $endDate])
                ->sum(DB::raw('COALESCE(guests, 0)')),  // Tổng số khách đã đến

            'tong_don_dat_phong' => DB::table('payments')
                ->whereBetween('created_at', [$startDate, $endDate])
                ->count(),  // Tổng số đơn đặt phòng

            'tong_don_huy' => DB::table('payments')
                ->where('status', 'failed')
                ->whereBetween('created_at', [$startDate, $endDate])
                ->count(),  // Tổng số đơn hủy

            'ti_le_huy' => (DB::table('payments')
                ->where('status', 'failed')
                ->whereBetween('created_at', [$startDate, $endDate])
                ->count() * 100 / DB::table('payments')->whereBetween('created_at', [$startDate, $endDate])->count()) ?? 0,  // Tỷ lệ hủy

            'tong_so_thanh_toan_thanh_cong' => DB::table('payments')
                ->where('status', 'complete')
                ->whereBetween('created_at', [$startDate, $endDate])
                ->count()  // Tổng số thanh toán thành công
        ];



        //         $startDate = '2024-01-01'; // Thay giá trị này bằng ngày bắt đầu bạn muốn lọc
        // $endDate = '2024-12-31';   // Thay giá trị này bằng ngày kết thúc bạn muốn lọc



        $thongKeChiNhanh = DB::table('hotels')
            ->select('hotels.id as hotel_id', 'hotels.name as ten_chi_nhanh')
            ->addSelect([

                'tong_don_dat_phong' => DB::table('bookings')
                    ->join('detail_rooms', 'bookings.detail_room_id', '=', 'detail_rooms.id')
                    ->whereColumn('detail_rooms.hotel_id', 'hotels.id')
                    ->whereBetween('bookings.created_at', [$startDate, $endDate])
                    ->selectRaw('COUNT(*)')
                    ->limit(1),

                'thanh_toan_thanh_cong' => DB::table('payments')
                    ->join('detail_payments', 'payments.id', '=', 'detail_payments.payment_id') // Liên kết qua bảng trung gian
                    ->join('bookings', 'detail_payments.booking_id', '=', 'bookings.id') // Liên kết bảng bookings
                    ->join('detail_rooms', 'bookings.detail_room_id', '=', 'detail_rooms.id') // Liên kết bảng detail_rooms
                    ->whereColumn('detail_rooms.hotel_id', 'hotels.id') // Điều kiện liên quan đến hotel_id
                    ->where('payments.status', 'complete') // Điều kiện status là confirmed
                    ->whereBetween('bookings.created_at', [$startDate, $endDate]) // Điều kiện khoảng thời gian
                    ->selectRaw('COUNT(DISTINCT payments.id)') // Đếm số lượng không trùng lặp
                    ->limit(1), // Giới hạn kết quả


                'tong_doanh_thu' => DB::table('payments')
                    ->join('detail_payments', 'payments.id', '=', 'detail_payments.payment_id') // Liên kết qua bảng trung gian
                    ->join('bookings', 'detail_payments.booking_id', '=', 'bookings.id') // Liên kết bảng bookings
                    ->join('detail_rooms', 'bookings.detail_room_id', '=', 'detail_rooms.id') // Liên kết bảng detail_rooms
                    ->whereColumn('detail_rooms.hotel_id', 'hotels.id') // Điều kiện liên quan đến hotel_id
                    ->where('payments.status', 'complete') // Điều kiện status là confirmed
                    ->whereBetween('payments.created_at', [$startDate, $endDate]) // Điều kiện khoảng thời gian
                    ->selectRaw('SUM( DISTINCT payments.total_amount)') // Sử dụng SUM và DISTINCT để loại bỏ trùng lặp
                    ->limit(1), // Giới hạn kết quả


                // 'don_xac_nhan' => DB::table('payments')
                // ->join('detail_payments', 'payments.id', '=', 'detail_payments.payment_id') // Liên kết qua bảng trung gian
                // ->join('bookings', 'detail_payments.booking_id', '=', 'bookings.id') // Liên kết bảng bookings
                // ->join('detail_rooms', 'bookings.detail_room_id', '=', 'detail_rooms.id') // Liên kết bảng detail_rooms
                //     ->whereColumn('detail_rooms.hotel_id', 'hotels.id')
                //     ->where('payments.status', 'complete') // Điều kiện status là confirmed
                //     ->whereBetween('bookings.created_at', [$startDate, $endDate])
                //     ->selectRaw('COUNT(DISTINCT detail_payments.payment_id)') // Đếm số lượng không trùng lặp
                //     ->limit(1),

                'khach_da_den' => DB::table('bookings')
                    ->join('detail_rooms', 'bookings.detail_room_id', '=', 'detail_rooms.id')
                    ->whereColumn('detail_rooms.hotel_id', 'hotels.id')
                    ->where('bookings.status', 'checkin')
                    ->where('bookings.check_in', '<=', now())
                    ->whereBetween('bookings.created_at', [$startDate, $endDate])
                    ->selectRaw('SUM(guests)')
                    ->limit(1),

                'don_huy'  => DB::table('payments')
                    ->join('detail_payments', 'payments.id', '=', 'detail_payments.payment_id') // Liên kết qua bảng trung gian
                    ->join('bookings', 'detail_payments.booking_id', '=', 'bookings.id') // Liên kết bảng bookings
                    ->join('detail_rooms', 'bookings.detail_room_id', '=', 'detail_rooms.id') // Liên kết bảng detail_rooms
                    ->whereColumn('detail_rooms.hotel_id', 'hotels.id') // Điều kiện liên quan đến hotel_id
                    ->where('payments.status', 'failed') // Điều kiện status là confirmed
                    ->whereBetween('bookings.created_at', [$startDate, $endDate]) // Điều kiện khoảng thời gian
                    ->selectRaw('COUNT(DISTINCT detail_payments.payment_id)') // Đếm số lượng không trùng lặp
                    ->limit(1), // Giới hạn kết quả

                'ti_le_huy' => DB::table('payments')
                    ->join('detail_payments', 'payments.id', '=', 'detail_payments.payment_id') // Liên kết qua bảng trung gian
                    ->join('bookings', 'detail_payments.booking_id', '=', 'bookings.id') // Liên kết bảng bookings
                    ->join('detail_rooms', 'bookings.detail_room_id', '=', 'detail_rooms.id') // Liên kết bảng detail_rooms
                    ->whereColumn('detail_rooms.hotel_id', 'hotels.id') // Điều kiện liên quan đến hotel_id
                    ->where('payments.status', 'failed') // Điều kiện status là failed
                    ->whereBetween('bookings.created_at', [$startDate, $endDate]) // Điều kiện khoảng thời gian
                    ->selectRaw('(COUNT(DISTINCT detail_payments.payment_id) * 100.0 / (SELECT COUNT(*) FROM bookings INNER JOIN detail_rooms ON bookings.detail_room_id = detail_rooms.id WHERE detail_rooms.hotel_id = hotels.id AND bookings.created_at BETWEEN ? AND ?)) as ti_le_huy', [$startDate, $endDate])
                    ->limit(1), // Giới hạn kết quả


                'danh_gia_tb' => DB::table('reviews')
                    ->whereColumn('reviews.hotel_id', 'hotels.id')
                    ->selectRaw('AVG(rating)')
                    ->limit(1),
            ])
            ->get();





        $doanhThu7Ngay = DB::table('payments')
            ->select(DB::raw('DATE(paymen_date) as ngay, COALESCE(SUM(total_amount), 0) as doanh_thu'))
            ->where('status', 'complete')  // Điều kiện chỉ lấy các giao dịch hoàn tất
            ->whereBetween('paymen_date', [now()->subDays(6), now()])  // Giới hạn trong 7 ngày gần nhất
            ->groupBy(DB::raw('DATE(paymen_date)'))  // Nhóm theo từng ngày
            ->rightJoin(DB::raw('(SELECT CURDATE() - INTERVAL n DAY AS ngay 
                FROM (SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL 
                      SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6) 
                AS days) AS date_range'), 'date_range.ngay', '=', DB::raw('DATE(paymen_date)'))  // Kết hợp với ngày không có dữ liệu
            ->orderBy('ngay', 'asc')
            ->get();





        // doanh thu các ngày trong tháng hiện tại
        $doanhThuTheoThang = DB::table(DB::raw('
    (SELECT CURDATE() - INTERVAL (DAY(CURDATE()) - 1) DAY + INTERVAL n DAY AS ngay
    FROM (SELECT n FROM (SELECT @row := @row + 1 AS n FROM 
          (SELECT 0 UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL 
           SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL 
           SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10 UNION ALL SELECT 11 UNION ALL 
           SELECT 12 UNION ALL SELECT 13 UNION ALL SELECT 14 UNION ALL SELECT 15 UNION ALL 
           SELECT 16 UNION ALL SELECT 17 UNION ALL SELECT 18 UNION ALL SELECT 19 UNION ALL 
           SELECT 20 UNION ALL SELECT 21 UNION ALL SELECT 22 UNION ALL SELECT 23 UNION ALL 
           SELECT 24 UNION ALL SELECT 25 UNION ALL SELECT 26 UNION ALL SELECT 27 UNION ALL 
           SELECT 28 UNION ALL SELECT 29 UNION ALL SELECT 30) AS numbers, (SELECT @row := -1) AS r) AS seq) AS days
    WHERE n < DAY(LAST_DAY(CURDATE()))) AS date_range'))
            ->leftJoin('payments', DB::raw('DATE(payments.paymen_date)'), '=', 'date_range.ngay')
            ->select('date_range.ngay', DB::raw('SUM(payments.total_amount) as doanh_thu'))
            ->where('payments.status', '=', 'complete')
            ->orderBy('ngay', 'desc')
            ->groupBy('date_range.ngay')
            ->get();

        // doanh thu các tháng trong năm hiện tại
        $doanhThuCacThangTrongNam = DB::table(DB::raw('
    (SELECT 1 AS thang UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL 
     SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL 
     SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10 UNION ALL SELECT 11 UNION ALL SELECT 12) AS month_range'))
            ->leftJoin('payments', DB::raw('MONTH(payments.paymen_date)'), '=', 'month_range.thang')
            ->select('month_range.thang', DB::raw('SUM(payments.total_amount) as doanh_thu'))
            ->where('payments.status', '=', 'complete')
            ->whereYear('payments.paymen_date', now()->year)
            ->orderBy('thang', 'desc')
            ->groupBy('month_range.thang')
            ->get();

        //     // $thongKeKhachHang = DB::table('users as u')
        //     // ->select('u.id as customer_id', 'u.name as customer_name')
        //     // ->selectRaw('COUNT(b.id) as so_lan_dat_phong')
        //     // ->selectRaw('SUM(CASE WHEN b.status = "cancelled" THEN 1 ELSE 0 END) as so_lan_huy')
        //     // ->selectRaw('SUM(p.total_amount) as tong_chi_tieu')
        //     // ->leftJoin('bookings as b', 'u.id', '=', 'b.user_id')
        //     // ->leftJoin('payments as p', function ($join) {
        //     //     $join->on('b.id', '=', 'p.booking_id')
        //     //          ->where('p.status', 'complete');  // Chỉ tính các thanh toán hoàn tất
        //     // })
        //     // ->groupBy('u.id', 'u.name')
        //     // ->get();
        $thongKeKhachHang = DB::table('users as u')
        ->select(
            'u.id as id_khach_hang',
            'u.name as ten_khach_hang',
            DB::raw('COUNT(DISTINCT b.id) as so_lan_dat_phong'),
            DB::raw('COUNT(DISTINCT CASE WHEN p.status = "complete" THEN p.id END) as so_lan_dat_phong_thanh_cong'),
            DB::raw('IF(COUNT(p.id) > 0, COUNT(DISTINCT CASE WHEN p.status = "complete" THEN p.id END) * 100.0 / COUNT(DISTINCT p.id), 0) as ty_le_dat_phong_thanh_cong'),
            DB::raw('IF(COUNT(p.id) > 0, COUNT(DISTINCT CASE WHEN p.status = "failed" THEN p.id END) * 100.0 / COUNT(DISTINCT p.id), 0) as ty_le_huy_dat_phong'),
            DB::raw('SUM(DATEDIFF(b.check_out, b.check_in)) as tong_so_ngay_luu_tru'),
            DB::raw('SUM(p.total_amount) as tong_chi_tieu'),
            DB::raw('MAX(b.created_at) as ngay_dat_phong_gan_nhat')
        )
        ->leftJoin('bookings as b', function($join) use ($startDate, $endDate) {
            $join->on('u.id', '=', 'b.user_id')
                 ->whereBetween('b.created_at', [$startDate, $endDate]); // Lọc ngày cho bookings
        })
        ->leftJoin('payments as p', function($join) use ($startDate, $endDate) {
            $join->on('u.id', '=', 'p.user_id')
                 ->whereBetween('p.created_at', [$startDate, $endDate]); // Lọc ngày cho payments
        })
        ->groupBy('u.id', 'u.name')
        ->orderBy('tong_chi_tieu', 'desc')
        ->get();
    
    


        return response()->json([
            'data' => [

                'thongKeTongQuan' => $thongKeTongQuan,
                'thongKeChiNhanh' => $thongKeChiNhanh, // ok 
                'doanhThu7Ngay' => $doanhThu7Ngay,
                'doanhThuTheoThang' => $doanhThuTheoThang,
                'doanhThuCacThangTrongNam' => $doanhThuCacThangTrongNam,
                'thongKeKhachHang' => $thongKeKhachHang
            ],
            'status_code' => '200',
            'message' => 'success'
        ], 200);
    }
}
