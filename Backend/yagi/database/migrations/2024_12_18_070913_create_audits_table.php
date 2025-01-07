<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('audits', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable(); // ID người thực hiện
            $table->string('model_type'); // Tên lớp model (vd: App\Models\Room)
            $table->unsignedBigInteger('model_id'); // ID của bản ghi model
            $table->string('action'); // Hành động: create, update, delete
            $table->json('changes')->nullable(); // Thay đổi dữ liệu
            $table->timestamps(); // Thời gian thực hiện
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audits');
    }
};
