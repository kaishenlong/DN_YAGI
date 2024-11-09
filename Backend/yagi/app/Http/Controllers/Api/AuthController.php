<?php

// AuthController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\RegisterRequest ;
use App\Http\Requests\LoginReq ;
use App\Mail\WelcomeEmail;
use App\Mail\ResetPasswordMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterRequest $request )
    {
   

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'identity_card' => $request->identity_card,
               'role'=>'user'
        ]);
        if($user){
            Mail::to($user->email)->send(new WelcomeEmail($user));// Gửi email xác nhận đăng ký
       
        return response()->json([
        
            'user' => $user
        ],201);
        }else{
            return response()->json([
                'error' => 'Đăng ký thất bại'
            ],404);
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
    // Gửi email reset mật khẩu
    public function sendResetLinkEmail(Request $request)
    {
    $request->validate(['email' => 'required|email']);

    // Kiểm tra nếu email tồn tại trong hệ thống
    $user = User::where('email', $request->email)->first();

    if (!$user) {
        return response()->json(['message' => 'Email không tồn tại'], 404);
    }

    // Tạo token reset mật khẩu
    $status = Password::createToken($user);

    if ($status) {
        // Lấy token từ bảng password_resets
        $token = \DB::table('password_resets')->where('email', $request->email)->first()->token;

        // Gửi email với nội dung của bạn
        Mail::to($user->email)->send(new ResetPasswordMail($token, $user->email));

        return response()->json(['message' => 'Đường dẫn đặt lại mật khẩu đã được gửi đến email của bạn.']);
    }

    return response()->json(['message' => 'Email không đúng hoặc đã có lỗi xảy ra.'], 400);
    }

    // Cập nhật mật khẩu sau khi người dùng click vào link reset mật khẩu
    public function resetPassword(Request $request)
    {
        // Kiểm tra mật khẩu và mật khẩu xác nhận
        if ($request->password !== $request->password_confirmation) {
            return response()->json(['message' => 'Mật khẩu xác nhận không khớp.'], 400);
        }
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:6|confirmed',
        ]);

        // Kiểm tra và reset mật khẩu
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->save();
            }
        );
        if ($status === Password::PASSWORD_RESET) {
            return response()->json(['message' => 'Mật khẩu đã được thay đổi thành công.']);
        }

        return response()->json(['message' => 'Có lỗi xảy ra khi đặt lại mật khẩu.'], 400);
    }

}