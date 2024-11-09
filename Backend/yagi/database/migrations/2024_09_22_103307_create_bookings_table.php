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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');  // Người giữ chỗ
            $table->foreignId('detail_room_id')->constrained()->onDelete('cascade');  // Phòng được giữ chỗ
            $table->date('check_in');          // Ngày dự kiến check-in
            $table->date('check_out');         // Ngày dự kiến check-out
            $table->integer('guests')->default(0)->change();         // Số lượng  tổng khách dự kiến
            $table->integer('adult');          //Số lượng người lớn
            $table->integer('children')->nullable();  //số lượng trẻ em 
            $table->integer('quantity'); //Số lượng phòng đặt
            $table->float('total_price')->nullable(); // Tổng giá tiền 
            $table->enum('status', ['pending', 'confirmed', 'cancelled'])->default('pending');  // Trạng thái 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};