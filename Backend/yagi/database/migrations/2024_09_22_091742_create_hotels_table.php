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
        Schema::create('hotels', function (Blueprint $table) {
            $table->id();
            $table->string('name')->default('Hotel Yagi'); // Tên hotel
            $table->foreignId('city_id')->constrained()->onDelete('cascade');  // khóa ngoại với tỉnh-thành phố
            $table->string('address'); // địa chỉ cụ thể
            $table->string('email')->nullable(); // Email khách sạn
            $table->string('phone')->nullable(); // số điện thoại liên hệ với chủ
            $table->decimal('rating',2,1); // Số * của khách sạn
            $table->text('description'); // Mô tả
            $table->string('map'); // Google maps
            $table->string('image')->nullable(); // Ảnh
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hotels');
    }
};
