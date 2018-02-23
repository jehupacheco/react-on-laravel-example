<?php

use Faker\Generator as Faker;

$factory->define(App\Models\Product::class, function (Faker $faker) {
    return [
        'name' => $faker->unique()->word,
        'description' => $faker->text,
        'price' => rand(50, 100),
        'images' => json_encode([
            $faker->imageUrl,
            $faker->imageUrl,
            $faker->imageUrl,
            $faker->imageUrl,
            $faker->imageUrl,
        ]),
    ];
});
