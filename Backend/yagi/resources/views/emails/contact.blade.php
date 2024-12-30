<!DOCTYPE html>
<html>
<head>
    <title>Liên hệ từ form website</title>
</head>
<body>
    <h3>Thông tin liên hệ</h3>
    <p><strong>Họ tên:</strong> {{ $data['name'] }}</p>
    <p><strong>Số điện thoại:</strong> {{ $data['phone'] }}</p>
    <p><strong>Email:</strong> {{ $data['email'] }}</p>
    <p><strong>Nội dung:</strong></p>
    <p>{{ $data['message'] }}</p>
</body>
</html>