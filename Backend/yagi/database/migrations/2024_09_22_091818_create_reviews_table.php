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
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('hotel_id')->constrained()->onDelete('cascade'); // Khóa ngoại nối với hotel 
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Khoá ngoại nối với user
            $table->integer('rating'); // Rating từ 1 đến 5
            $table->text('comment')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
