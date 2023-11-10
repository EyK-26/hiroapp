<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Position>
 */
class PositionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    // public $uniqueNumbers = [];

    // public function generateUserId()
    // {
    //     $i = 0;
    //     while ($i < 40) {
    //         $randomNumber = fake()->numberBetween(1, 40);
    //         if (!in_array($randomNumber, $this->uniqueNumbers)) {
    //             $this->uniqueNumbers[] = $randomNumber;
    //             $i++;
    //         }
    //     }
    // }


    public function definition(): array
    {
        return [
            'user_id' => fake()->unique()->numberBetween(1, 40),
            'department_id' => fake()->numberBetween(1, 10),
            'grade_id' => fake()->numberBetween(1, 3),
            'name' => fake()->jobTitle(),
            'description' => fake()->paragraph(),
            'hiring' => fake()->boolean(35),
            'start_date' => fake()->boolean(50) ? fake()->dateTimeBetween('now', '+6 months') : null,
            'end_date' => fake()->boolean(50) ? fake()->dateTimeBetween('+12 months', '+3 years') : null,
        ];
    }
}
