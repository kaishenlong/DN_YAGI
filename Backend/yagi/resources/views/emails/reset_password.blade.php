<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đặt lại mật khẩu</title>
</head>
<body>
    <h2>Chào bạn {{ $email }}</h2>
    <p>Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản của mình. Để đặt lại mật khẩu, vui lòng nhấn vào đường dẫn bên dưới:</p>
    <a href="{{ url('password/reset/'.$token) }}">Đặt lại mật khẩu</a>

    <p>Nếu bạn không yêu cầu thay đổi mật khẩu, vui lòng bỏ qua email này.</p>

    <p>Chúc bạn một ngày tốt lành!</p>
</body>
</html>
