<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::inRandomOrder()->first()->id,
            'detail_room_id' => \App\Models\DetailRoom::inRandomOrder()->first()->id,
            'check_in' => $this->faker->date(),
            'check_out' => $this->faker->date(),
            // 'guests' => $this->faker->numberBetween(1, 10),
            'adult' => $this->faker->numberBetween(1, 5),
            'children' => $this->faker->numberBetween(0, 5),
            'quantity' => $this->faker->numberBetween(1, 3),
            'total_price' => $this->faker->randomFloat(2, 100, 1000),
            'status' => $this->faker->randomElement(['pending', 'confirmed', 'cancelled']),
        ];
    }
}
