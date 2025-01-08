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
        Schema::create('cart', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
          
            $table->foreignId('detail_room_id')->constrained()->onDelete('cascade');  // Phòng được giữ chỗ
            $table->date('check_in');          // Ngày dự kiến check-in
            $table->date('check_out');         // Ngày dự kiến check-out
            $table->integer('guests')->default(0);         // Số lượng  tổng khách dự kiến
            $table->integer('adult');          //Số lượng người lớn
            $table->integer('children')->nullable();  //số lượng trẻ em 
            $table->integer('quantity'); //Số lượng phòng đặt
            $table->decimal('total_price', 15, 2)->default(0);
          
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cart');
    }
};