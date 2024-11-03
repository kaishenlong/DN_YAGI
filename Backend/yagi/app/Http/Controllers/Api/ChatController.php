<?php

namespace App\Http\Controllers\Api;

use App\Events\MessageSent;
use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\ResChat;
class ChatController extends Controller
{       public function index(Request $request)
    {
        $userId = Auth::id(); // ID của user hiện tại
        $adminId = 1; // Giả sử ID của admin là 1, bạn có thể thay đổi theo ID thực tế

        // Lấy 5 tin nhắn gần nhất giữa user và admin
        $messages = Message::where(function($query) use ($userId, $adminId) {
            $query->where('sender_id', $userId)->where('receiver_id', $adminId)
                  ->orWhere('sender_id', $adminId)->where('receiver_id', $userId);
        })->latest()->take(5)->get();

        return response()->json($messages);
    }

    public function store(ResChat $request)
    {
       

        $userId = Auth::id(); // ID của người gửi (user)
        $adminId = 1; // ID của admin

        // Lưu tin nhắn vào cơ sở dữ liệu
        $message = Message::create([
            'sender_id' => $userId,
            'receiver_id' => $adminId,
            'message' => $request->message,
        ]);

        // Gửi sự kiện tin nhắn đã gửi
        // broadcast(new MessageSent($message))->toOthers();

        return response()->json($message, 201);
    }
}