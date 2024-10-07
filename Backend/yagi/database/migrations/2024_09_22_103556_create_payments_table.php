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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('booking_id')->constrained()->onDelete('cascade'); // khóa ngoại nối với đặt phòng
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Khoá ngoại nối với user
            $table->date('paymen_date'); //ngày đặt
            $table->enum('method',['Credit Card','MoMo','QR']); // thẻ ngân hàng - ví điện từ  - QR
            $table->decimal('total_amount',10,2); // tổng tiền 
            $table->enum('status',['pending','complete','failed'])->default('pending'); // trạng thái 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
