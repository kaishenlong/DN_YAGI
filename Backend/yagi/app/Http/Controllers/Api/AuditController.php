<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Audit;
use Illuminate\Http\Request;

class AuditController extends Controller
{
    public function index(Request $request)
    {

        $modelList = ['City', 'Hotel', 'User', 'CartDetail', 'Cart', 'DetailRoom', 'room', 'payment', 'booking', 'Transaction'];
        $query = Audit::query()->leftJoin('users', 'audits.user_id', '=', 'users.id');

        // Lọc theo model_type nếu có
        if ($request->filled('model_type')) {
            if (!in_array($request->model_type, $modelList)) {
                return response()->json([
                    "errors" => "model không tồn tại.",
                ], 422);
            }
            $query->where("audits.model_type", $request->model_type);
        }

        // Lọc theo model_id nếu có
        if ($request->filled('model_id')) {
            $query->where("audits.model_id", $request->model_id);
        }

    // Lọc theo user_id nếu có
    if ($request->filled('user_id')) {
        $query->where("audits.user_id", $request->user_id)
              ->orWhere("users.name", 'LIKE', '%'.$request->user_id.'%'); // Sửa thành LIKE
    }
        // Lọc theo user_id nếu có
        if ($request->filled('action')) {
            $query->where("audits.action", $request->action);
        }

        // Gộp với bảng users để lấy tên user
        $audits = $query
            ->select('audits.*', 'users.name as user_name') // Lấy thêm tên user
            ->orderBy('audits.id','DESC')
            ->get();

        return response()->json([
            "audits" => $audits,
            'status_code' => '200',
            'message' => 'success'
        ],200);
        // return response()->json($request->all()); // Debug
    }
    public function show($id)
    {
        $audit = Audit::find($id);
        return response()->json([
            "audit" => $audit,
        ],200);
    }
}
