<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartDetail;
use App\Models\DetailRoom;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    /**
     * Thêm sản phẩm vào giỏ hàng
     */
    public function addToCart(Request $request)
    {
        $userId = Auth::id();

        // Tạo giỏ hàng mới
        $cart = Cart::create([
            'user_id' => $userId,
        ]);
        
        $totalPrice = 0;

        // Lặp qua từng sản phẩm và thêm chi tiết vào CartDetail
        foreach ($request->products as $product) {
            // Lấy thông tin chi tiết phòng từ bảng DetailRoom
            $room = DetailRoom::find($product['detail_room_id']);
            if (!$room) {
                return response()->json(['error' => 'Room not found'], 404);
            }

            // Tính giá trị dựa trên số lượng và giá của phòng (into_money)
            $productPrice = $room->into_money;

            // Cập nhật tổng giá trị giỏ hàng
            $totalPrice += $product['quantity'] * $productPrice;

            // Thêm chi tiết vào CartDetail
            CartDetail::create([
                'cart_id' => $cart->id,
                'detail_room_id' => $product['detail_room_id'],
                'quantity' => $product['quantity'],
                'price' => $productPrice, // Giá lấy từ into_money của DetailRoom
            ]);
        }

        // Cập nhật tổng giá trị giỏ hàng
        $cart->update(['total_price' => $totalPrice]);

        return response()->json([
            'message' => 'Added to cart successfully',
            'cart_id' => $cart->id,
            'total_price' => $totalPrice, // Trả về tổng giá trị giỏ hàng đã tính
        ], 201);
    }
}