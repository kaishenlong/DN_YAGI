<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Hotel>
 */
class HotelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->company,
            'slug' => $this->faker->slug,
            'city_id' => \App\Models\City::inRandomOrder()->first()->id,
            'address' => $this->faker->address,
            'email' => $this->faker->safeEmail,
            'phone' => $this->faker->phoneNumber,
            'rating' => $this->faker->randomFloat(1, 1, 5),
            'description' => $this->faker->text,
            'map' => $this->faker->url,
            'image' => $this->faker->imageUrl(),
            'user_id' => \App\Models\User::inRandomOrder()->first()->id,
        ];
    }
}
