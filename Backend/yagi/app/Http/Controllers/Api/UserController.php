<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\ResUser;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = User::get();
        return response()->json([
            $user,
            200,
        ]);
    }

    public function search(Request $request)
    {
        $name = $request->input('name');
        $email = $request->input('email');

        // Kiểm tra nếu không có bất kỳ điều kiện nào
        if (empty($name) && empty($email)) {
            return response()->json(['error' => 'Bắt buộc phải nhập tên người dùng hoặc email'], 400);
        }

        $user = User::query()
            ->when($name, function ($query) use ($name) {
                // Tìm kiếm theo firstname hoặc lastname
                $query->where('name', 'like', "%$name%");
            })
            ->when($email, function ($query) use ($email) {
                // Tìm kiếm theo email
                $query->where('email', 'like', "%$email%");  // Dùng "like" nếu muốn tìm kiếm phần trăm
            })
            ->get();

        if ($user->isEmpty()) {
            return response()->json([
                'message' => 'Không tìm thấy user nào cho tiêu chí tìm kiếm được cung cấp',
                'status_code' => 404,
            ], 404);
        }

        return response()->json([
            'data' => $user,
            'message' => 'Đã truy xuất user thành công',
            'status_code' => 200,
        ], 200);
    }


    public function show(User $user)
    {
        return response()->json([
            $user,
            200,
        ]);
    }

    public function update(ResUser $request, User $user)
    {

        $data = $request->only('name', 'email', 'role', 'identity_card');
        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }
        $user->update($data);
        return response()->json(['message' => 'User updated successfully', 'data' => $user], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {

        $user->delete();

        return response()->json(['message' => 'User deleted successfully'], 200);
    }

    public function changeStatus(User $user)
    {
        $user->status = $user->status === 'active' ? 'inactive' : 'active';
        $user->save();
        return response()->json(['message' => 'User status updated successfully', 'data' => $user], 200);
    }
}
