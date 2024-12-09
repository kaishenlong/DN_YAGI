<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCartDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cart_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('cart_id');
            $table->unsignedBigInteger('detail_room_id');
            $table->integer('quantity');
            $table->decimal('price', 15, 2);
            $table->timestamps();

            // Thiết lập khóa ngoại cho cart_id
            $table->foreign('cart_id')->references('id')->on('cart')->onDelete('cascade');
            // Thiết lập khóa ngoại cho detail_room_id
            $table->foreign('detail_room_id')->references('id')->on('detail_rooms')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cart_details');
    }
}