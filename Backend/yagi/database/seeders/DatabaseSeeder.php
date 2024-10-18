<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\City::factory(10)->create();
        \App\Models\User::factory(20)->create();
        \App\Models\Hotel::factory(5)->create();
        \App\Models\Room::factory(10)->create();
        \App\Models\DetailRoom::factory(20)->create();
        \App\Models\Booking::factory(30)->create();
        \App\Models\Payment::factory(30)->create();
        \App\Models\Review::factory(50)->create();
        
    }
}
