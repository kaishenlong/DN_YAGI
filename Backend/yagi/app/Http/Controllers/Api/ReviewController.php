<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reviews = review::select('user_id','hotel_id','comment')->with('user', 'hotel')->get();
        return response()->json($reviews);
    }

    public function store(Request $request)
    {
        $request->validate([
            'hotel_id' => 'required',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        $review = Review::create([
            'hotel_id' => $request->hotel_id,
            'user_id' => Auth::id(), // Lưu ID của người dùng đã đăng nhập
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        return response()->json([
            'data' => $review,
            'message' => 'Review created successfully',
            'status_code' => 201,
        ], 201);
    }

   
    public function show(review $review)
    {
        return response()->json($review);
    }

   
   
    public function update(Request $request, review $review)
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        $review->update($request->only('rating', 'comment'));

        return response()->json([
            'data' => $review,
            'message' => 'Review updated successfully',
            'status_code' => 200,
        ], 200);
    }

  
    public function destroy(review $review)
    {
        $review->delete();

        return response()->json([
            'message' => 'Review deleted successfully',
            'status_code' => 200,
        ], 200);
    }
}
