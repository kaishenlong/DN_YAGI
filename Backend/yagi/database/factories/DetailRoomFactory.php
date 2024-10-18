<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DetailRoom>
 */
class DetailRoomFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'room_id' => \App\Models\Room::inRandomOrder()->first()->id,
            'hotel_id' => \App\Models\Hotel::inRandomOrder()->first()->id,
            'price' => $this->faker->randomFloat(2, 100, 500),
            'price_surcharge' => $this->faker->randomFloat(2, 10, 100),
            'available' => 'WifiFree',
            'description' => $this->faker->text,
            'image' => $this->faker->imageUrl(),
            // 'gallery_id' => \App\Models\Gallery::factory(),
            'into_money' => $this->faker->randomFloat(2, 100, 500),
        ];
    }
}
