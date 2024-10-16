<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request){
        $request->validate([
            'name'=> 'required|string|max:255',
            'email'=> 'required|string|email|max:255|unique:users',
            'password'=> 'required|string|min:6',
        ]);
        $user  = User::create([
            'name'=> $request->name,
            'email'=> $request->email,
            'password'=>bcrypt($request->password),
            'identity_card'=>$request->identity_card,
            'role'=> $request->role
        ]); 
        return response()->json([
            'user'=> $user
        ],201);
    }
    public function login(Request $request){
        $request->validate([
            'email'=> 'required|string|email',
            'password'=> 'required|string',
        ]);
        if(!Auth::attempt($request->only('email','password'))){
            return response()->json(['message'=> 'Login Thất Bại'],401);
        }
        $user = $request->user();
        $token = $user->createToken('authToken')->plainTextToken;
        return response()->json(['user' =>$user,'token' =>$token]);
    }
    public function logout(Request $request){
        $request->user()->tokens()->delete();
        return response()->json(['message'=> 'Đăng xuất thành công']);
    }
}
