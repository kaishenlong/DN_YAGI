<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = User::all();
        return response()->json([
             $user,
                200,
        ]);
    }

    
    

  
    public function show(User $user)
    {
        return response()->json([
            $user,
            200,
        ]);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'string|max:255',
            'email' => 'string|email|max:255|unique:users,email,',
            'password' => 'nullable|string|min:8',
            'role' => 'in:admin,business,user',
        ]);
        $data = $request->only('name', 'email', 'role','identity_card');
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

    public function changeStatus(User $user){
        $user->status = $user->status === 'active' ? 'inactive' : 'active';
        $user->save();
        return response()->json(['message' => 'User status updated successfully', 'data' => $user], 200);
    }
}
