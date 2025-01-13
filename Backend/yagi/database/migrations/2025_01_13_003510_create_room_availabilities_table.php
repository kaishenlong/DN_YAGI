<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRoomAvailabilitiesTable extends Migration
{
    public function up()
    {
        Schema::create('room_availabilities', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('detail_room_id'); // Đảm bảo có trường khóa ngoại
            $table->date('date');
            $table->integer('available_rooms');
            $table->timestamps();

            // Nếu cần có quan hệ khóa ngoại (nếu bảng 'detail_rooms' tồn tại)
            $table->foreign('detail_room_id')->references('id')->on('detail_rooms')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('room_availabilities');
    }
}