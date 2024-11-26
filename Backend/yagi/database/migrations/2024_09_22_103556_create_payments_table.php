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
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Khoá ngoại nối với user 
            $table->date('paymen_date'); //ngày đặt
            $table->string('firstname')->nullable();
            $table->string('lastname')->nullable();
            $table->string('phone')->nullable();
            $table->enum('method',['VNPAY','MoMo','QR']); // thẻ ngân hàng - ví điện từ  - QR
            $table->decimal('total_amount',15,2); // tổng tiền 
            $table->enum('status payment', [0, 1])->default(0); // 0: chưa tính tiền, 1: đã thanh toán
            $table->enum('status',['pending','complete','failed'])->default('pending'); // trạng thái đơn hàng
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