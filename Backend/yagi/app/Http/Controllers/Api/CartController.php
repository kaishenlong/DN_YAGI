<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartDetail;
use App\Models\DetailRoom;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    /**
     * Thêm sản phẩm vào giỏ hàng
     */
    public function addToCart(Request $request)
    {
        $carts = []; // Mảng lưu trữ các bookings
        $userId = Auth::id();
        foreach ($request->products as $product) {
            // Lấy thông tin chi tiết phòng từ bảng DetailRoom
            $room = DetailRoom::find($product['detail_room_id']);
            if (!$room) {
                return response()->json(['error' => 'Room not found'], 404);
            }

            // Kiểm tra xem có đủ phòng không
            if ($room->available_rooms < $product['quantity']) {
                return response()->json(['error' => 'Not enough rooms available'], 400);
            }

            // Cập nhật lại số lượng phòng còn lại
            // $room->available_rooms -= $product['quantity'];
            // $room->save();

            // Chuyển đổi check_in và check_out thành đối tượng Carbon
            $checkIn = Carbon::parse($product['check_in']);
            $checkOut = Carbon::parse($product['check_out']);

            // Tính số ngày giữa check_in và check_out
            $days = $checkOut->diffInDays($checkIn);
            if ($days <= 0) {
                return response()->json(['error' => 'Invalid date range'], 400);
            }

            // Tính giá trị cho booking dựa trên số ngày và giá phòng
            $productPrice = $room->into_money;

            // Tính tổng giá trị cho booking hiện tại
            $totalBookingPrice = $days * $product['quantity'] * $productPrice;

            // Tạo mới một booking cho sản phẩm này
            $cart = Cart::create([
                'user_id' => $userId,
                'detail_room_id' => $product['detail_room_id'], // Truy cập đúng ID phòng
                'check_in' => $checkIn,
                'check_out' => $checkOut,
                'guests' => $product['adult'] + $product['children'],
                'adult' => $product['adult'],
                'total_price' => $totalBookingPrice, // Lưu tổng giá trị cho từng booking
                'children' => $product['children'],
                'quantity' => $product['quantity'], // Sử dụng quantity của sản phẩm

            ]);

            // Thêm booking vào mảng bookings
            $carts[] = $cart
            ;

            // Cộng dồn tổng giá trị cho tất cả bookings
            $total_price = $totalBookingPrice;
        }

        return response()->json([
            'data' => $carts,  // Trả về tất cả bookings đã tạo
            'total_price' => $total_price,  // Tổng giá trị cho tất cả bookings
            'message' => 'Booking created successfully',
            'status_code' => 201,
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
        $cart = Cart::orderBy('created_at', 'desc')->find($id);

        if (!$cart) {
            return response()->json(['error' => 'Cart not found'], 404);
        }

        return response()->json([
            'data' => $cart,
            'status_code' => 200,
        ], 200);
    }
    public function deleteCartById($id)
    {
        $userId = Auth::id(); // Lấy ID người dùng hiện tại
    
        // Tìm giỏ hàng theo ID và đảm bảo giỏ hàng thuộc về người dùng hiện tại
        $cart = Cart::where('id', $id)->where('user_id', $userId)->first();
    
        // Kiểm tra nếu không tìm thấy giỏ hàng
        if (!$cart) {
            return response()->json(['error' => 'Cart not found or access denied'], 404);
        }
    
        // Xóa giỏ hàng
        $cart->delete();
    
        return response()->json([
            'message' => 'Cart deleted successfully',
            'status_code' => 200,
        ], 200);
    }
    // Function lấy tất cả các giỏ hàng của người dùng hiện tại
    public function getAllID()
    {
        $userId = Auth::id();

        // Lấy tất cả các giỏ hàng của người dùng hiện tại
        $carts = Cart::with("detailrooms")->where('user_id', $userId)->get();
        if ($carts->isEmpty()) {
            return response()->json(['message' => 'No carts found'], 404);
        }

        return response()->json([
            'carts' => $carts,
        ]);
    }
    
}