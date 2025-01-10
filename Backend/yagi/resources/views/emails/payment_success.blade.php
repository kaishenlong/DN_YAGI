<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chúc mừng đăng ký thành công</title>
    <style>
        /* General Styles */
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f6f9;
            margin: 0;
            padding: 0;
            color: #333;
        }

        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .header {
            background-color: #3498db;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }

        .header img {
            max-width: 150px;
        }

        .content {
            padding: 30px;
            text-align: center;
        }

        .content h1 {
            font-size: 24px;
            color: #2c3e50;
            margin-bottom: 15px;
        }

        .content p {
            font-size: 16px;
            line-height: 1.6;
            color: #555;
            margin-bottom: 20px;
        }

        .cta-button {
            background-color: #e67e22;
            color: white;
            padding: 12px 25px;
            text-decoration: none;
            font-size: 16px;
            font-weight: bold;
            border-radius: 5px;
            display: inline-block;
            margin-top: 15px;
        }

        .cta-button:hover {
            background-color: #d35400;
        }

        .footer {
            background-color: #ecf0f1;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #7f8c8d;
            border-radius: 0 0 8px 8px;
        }

        .footer a {
            color: #3498db;
            text-decoration: none;
        }
    </style>
</head>

<body>
    <div class="container">
        <!-- Header Section -->
        <div class="header">
        <img src="cid:logo.png" alt="Logo">
        </div>

        <!-- Content Section -->
        <h1>Chúc mừng {{ $user->name }}!</h1>
        <p>Thanh toán của bạn cho đặt phòng tại {{ $room->hotel->name }} đã được thực hiện thành công.</p>
        <p><strong>Thông tin booking:</strong></p>
        <ul>
            <li>Ngày nhận phòng: {{ $booking->check_in }}</li>
            <li>Ngày trả phòng: {{ $booking->check_out }}</li>
            <li>Số lượng khách: {{ $booking->guests }}</li>
            <li>Số lượng phòng: {{ $booking->quantity }}</li>
            <li>Tổng tiền: {{ number_format($payment->total_amount, 0) }} VND</li>
        </ul>
        <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
        <!-- Footer Section -->
        <div class="footer">
            <p>© 2024 Công ty của bạn. Tất cả quyền được bảo lưu.</p>
            <p><a href="http://localhost:5173/Contact">Liên hệ chúng tôi</a></p>
        </div>
    </div>
</body>

</html>
