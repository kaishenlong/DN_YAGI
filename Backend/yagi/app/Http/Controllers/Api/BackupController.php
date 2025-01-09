<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Storage;

class BackupController extends Controller
{
    public function getBackups()
    {
        $backups = Storage::disk('local')->files('Laravel'); // Thư mục chứa file backup
        $fileDetails = array_map(function ($file) {
            return [
                'name' => basename($file),
                'size' => Storage::disk('local')->size($file),
                // 'url' => route('api.backups.download', ['file' => $file]),
            ];
        }, $backups);

        return response()->json(['data' => $fileDetails]);
    }
    public function downloadBackup(Request $request, $filename)
    {
        $backupPath = 'Laravel/' . $filename; // Đường dẫn tới file backup
        if (!Storage::disk('local')->exists($backupPath)) {
            return response()->json(['error' => 'File không tồn tại.'], 404);
        }
        return Storage::disk('local')->download($backupPath);
    }
    public function deleteBackup($filename)
    {
        $backupPath = 'Laravel/' . $filename; // Đường dẫn tới file backup

        if (Storage::exists($backupPath)) {
            Storage::delete($backupPath); // Xóa file backup
            return response()->json(['status' => 'success', 'message' => 'Backup deleted successfully']);
        }

        return response()->json(['status' => 'error', 'message' => 'Backup file not found'], 404);
    }

    public function runBackup(): JsonResponse
    {
        // exec('php D:\laragon\www\DN_YAGI-main2-Copy-Copy\DN_YAGI\Backend\yagi\artisan backup:run', $output, $status);
        // exec('php artisan backup:run', $output, $status);
        exec('php ' . base_path('artisan') . ' backup:run', $output, $status);


        if ($status === 0) {
            // Thành công
            return response()->json(['message' => 'Backup completed successfully.','status'=>200]);
        } else {
            // Thất bại
            return response()->json(['message' => 'Backup failed.', 'error' => $output], 500);
        }
    }
}
