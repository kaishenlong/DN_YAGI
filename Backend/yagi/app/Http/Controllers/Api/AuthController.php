<?php

// AuthController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ResetPasswordRequest;
use App\Http\Requests\ChangePasswordRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginReq;
use App\Mail\WelcomeEmail;
use App\Mail\ResetPasswordMail;
use App\Mail\ContactEmail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {


        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'identity_card' => $request->identity_card,
            'role' => 'user'
        ]);
        if ($user) {
            Mail::to($user->email)->send(new WelcomeEmail($user));// Gửi email xác nhận đăng ký

            return response()->json([

                'user' => $user
            ], 201);
        } else {
            return response()->json([
                'error' => 'Đăng ký thất bại'
            ], 404);
        }

    }

    public function login(LoginReq $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Đăng nhập thất bại'], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json(['user' => $user, 'token' => $token]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Đăng xuất thành công']);
    }

    // Gửi email reset mật khẩu với mã token 6 số
    public function sendResetLinkEmail(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        // Kiểm tra nếu email tồn tại trong hệ thống
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'Email không tồn tại'], 404);
        }

        // Tạo mã xác thực 6 số ngẫu nhiên
        $token = rand(100000, 999999);  // Mã 6 số ngẫu nhiên

        // Lưu mã token và thời gian hết hạn vào bảng password_resets
        \DB::table('password_resets')->insert([
            'email' => $user->email,
            'token' => $token,
            'created_at' => now(),
            'expires_at' => now()->addMinutes(value: 5), // Mã hết hạn sau 10 phút
        ]);

        // Gửi email với mã xác thực 6 số
        Mail::to($user->email)->send(new ResetPasswordMail($token, $user->email));

        return response()->json(['message' => 'Đường dẫn và mã xác thực đã được gửi đến email của bạn.']);
    }


    // Cập nhật mật khẩu sau khi người dùng nhập mã token và mật khẩu mới
    public function resetPassword(ResetPasswordRequest $request)
    {
        // Kiểm tra nếu mã token tồn tại và chưa hết hạn
        $reset = \DB::table('password_resets')
            ->where('email', $request->email)
            ->where('token', $request->token)
            ->first();

        if (!$reset) {
            return response()->json(['message' => 'Mã xác thực không hợp lệ hoặc đã hết hạn'], 400);
        }

        // Kiểm tra xem mã token có hết hạn chưa
        if (now()->gt($reset->expires_at)) {
            return response()->json(['message' => 'Mã xác thực đã hết hạn'], 400);
        }

        // Cập nhật mật khẩu mới cho người dùng
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'Email không tồn tại trong hệ thống.'], 404);
        }

        // Mã hóa và cập nhật mật khẩu mới
        $user->password = Hash::make($request->password);
        $user->save();

        // Xóa mã token đã sử dụng khỏi bảng password_resets
        \DB::table('password_resets')->where('email', $request->email)->delete();

        return response()->json(['message' => 'Mật khẩu đã được thay đổi thành công.'], 200);
    }
    public function changePassword(ChangePasswordRequest $request)
    {
        // Lấy người dùng hiện tại đã đăng nhập
        $user = Auth::user();

        // Kiểm tra mật khẩu cũ có đúng không
        if (!Hash::check($request->old_password, $user->password)) {
            return response()->json(['message' => 'Mật khẩu cũ không đúng.'], 400);
        }

        // Cập nhật mật khẩu mới
        $user->password = Hash::make($request->new_password);
        $user->save();

        // Trả về thông báo thành công
        return response()->json(['message' => 'Mật khẩu đã được thay đổi thành công.'], 200);
    }
    public function sendContactEmail(Request  $request)
    {
        // Lấy dữ liệu từ form liên hệ
        $data = $request->only('name', 'phone', 'email', 'message');
        
        // Gửi email tới admin hoặc người nhận liên hệ
        Mail::to('phuchuot18@gmail.com')->send(new ContactEmail($data)); 

        return response()->json(['message' => 'Email đã được gửi thành công!']);
    }

}