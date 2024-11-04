<?php

// AuthController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\RegisterRequest ;
use App\Http\Requests\LoginReq ;

class AuthController extends Controller
{
    public function register(RegisterRequest $request , )
    {
   

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'identity_card' => $request->identity_card,
               'role'=>'user'
        ]);

        return response()->json([
        
            'user' => $user
        ],201);
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

}