<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đặt lại mật khẩu</title>
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
        <div class="content">
            <h1>Đặt lại mật khẩu của bạn</h1>
            <p>Chào bạn,</p>
            <p>Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn. Để tiếp tục, vui lòng sử dụng mã xác thực dưới đây:</p>

            <div style="font-size: 24px; font-weight: bold; color: #e67e22; margin: 20px 0;">
                <span>Mã xác thực: <strong>{{ $token }}</strong></span>
            </div>

            <p>Vui lòng nhập mã xác thực vào trang đổi mật khẩu của chúng tôi:</p>

            <a  href="http://localhost:5173/newpassword" class="cta-button">Đổi mật khẩu</a>

            <p style="margin-top: 30px;">Nếu bạn không yêu cầu thay đổi mật khẩu, vui lòng bỏ qua email này.</p>
        </div>

        <!-- Footer Section -->
        <div class="footer">
            <p>© 2024 Công ty của bạn. Tất cả quyền được bảo lưu.</p>
            <p><a href="http://localhost:5173/Contact">Liên hệ chúng tôi</a></p>
        </div>
    </div>
</body>
</html>
