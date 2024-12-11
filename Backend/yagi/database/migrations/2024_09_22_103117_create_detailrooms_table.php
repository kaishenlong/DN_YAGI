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
        Schema::create('detail_rooms', function (Blueprint $table) {
            $table->id();
            $table->foreignId('room_id')->constrained()->onDelete('cascade'); // Khóa ngoại nối với loại phòng
            $table->foreignId('hotel_id')->constrained()->onDelete('cascade'); // Khóa ngoại nối với hotel
            $table->decimal('price',15,2); // giá
            $table->decimal('price_surcharge',15,2)->nullable(); // giá phụ thu
            $table->boolean('available')->default(1); // 1 là còn phòng, 0 là hết phòng
            $table->text('description')->nullable(); // Mô tả
            $table->string('image')->nullable(); // Ảnh
            $table->foreignID('gallery_id')->nullable()->onDelete('cascade'); // thư viện ảnh 
            $table->decimal('into_money',15,2); // Tổng tiền
            $table->integer('available_rooms')->default(0);//số phòng còn
            $table->boolean('is_active')->default(1); // 1: phòng còn hoạt động, 0: phòng không hoạt động
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detailrooms');
    }
};