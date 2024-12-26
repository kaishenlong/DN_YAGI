<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Audit;
use Illuminate\Http\Request;

class AuditController extends Controller
{
    public function index(Request $request)  {
        $modelList=['City','Hotel','User','CartDetail','Cart','DetailRoom','room','payment','booking','Transaction'];
        $query=Audit::query();
        if ($request->filled('model_type')) {
            if (!in_array($request->model_type,$modelList)) {
                return response()->json([
                    "errors"=>"model không tồn tại.",
                ],422);
            }
            $query->where("model_type",$request->model_type);
        }
        if ($request->filled('model_id')) {
            $query->where("model_id",$request->model_id);
        }
        $audits=$query->get();
        return response()->json([
            "audits"=>$audits,
        ]);
    }
}
