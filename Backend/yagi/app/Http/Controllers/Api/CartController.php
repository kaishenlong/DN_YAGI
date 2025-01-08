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
    public function deleteFromCart(Request $request)
{
    $userId = Auth::id();
    $cartId = $request->cart_id;
    $detailRoomId = $request->detail_room_id; // ID of the product to remove
    $quantity = $request->quantity; // Quantity of the product to remove

    // Get the cart for the user
    $cart = Cart::where('user_id', $userId)->where('id', $cartId)->first();

    if (!$cart) {
        return response()->json(['error' => 'Cart not found'], 404);
    }

    // Find the cart detail to delete
    $cartDetail = CartDetail::where('cart_id', $cartId)
                            ->where('detail_room_id', $detailRoomId)
                            ->first();

    if (!$cartDetail) {
        return response()->json(['error' => 'Product not found in the cart'], 404);
    }

    // If quantity to delete is greater than the quantity in the cart, return an error
    if ($quantity > $cartDetail->quantity) {
        return response()->json(['error' => 'Quantity to delete is greater than the quantity in the cart'], 400);
    }

    // Subtract the total price based on the price of the product and the quantity to remove
    $productPrice = $cartDetail->price;
    $totalPriceToSubtract = $quantity * $productPrice;

    // Remove the product from the CartDetail table
    if ($quantity == $cartDetail->quantity) {
        $cartDetail->delete(); // Delete the entire cart detail if all quantity is removed
    } else {
        $cartDetail->quantity -= $quantity; // Update the quantity if it's a partial removal
        $cartDetail->save();
    }

    // Update the total price of the cart
    $cart->total_price -= $totalPriceToSubtract;
    $cart->save();

    return response()->json([
        'message' => 'Product removed from cart successfully',
        'cart_id' => $cart->id,
        'total_price' => $cart->total_price, // Return the updated total price
    ]);
}
public function show($id)
{
    $cart = Cart::find($id);

    if (!$cart) {
        return response()->json(['error' => 'Cart not found'], 404);
    }

    return response()->json([
        'data' => $cart,
        'status_code' => 200,
    ], 200);
}

// Function lấy tất cả các giỏ hàng của người dùng hiện tại
public function getAllID()
{
    $userId = Auth::id();

    // Lấy tất cả các giỏ hàng của người dùng hiện tại
    $carts = Cart::where('user_id', $userId)->get();

    if ($carts->isEmpty()) {
        return response()->json(['message' => 'No carts found'], 404);
    }

    return response()->json([
        'carts' => $carts,
    ]);
}
}