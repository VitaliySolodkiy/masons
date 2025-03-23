<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        /*         \App\Models\User::factory()->create([
            'name' => 'Vitalij',
            'email' => 'majestis777@gmail.com',
            'password' => bcrypt('12345678'),
            'role' => 'admin',
        ]); */
        Category::create([
            'name' => 'T-shirts',
        ]);
        Category::create([
            'name' => 'Hoodie',
        ]);
        Category::create([
            'name' => 'Cups',
        ]);
        Product::create([
            'name' => 'White t-shirt',
            'description' => 'Xiaomi may capture headlines for stunning, high-power smartphones like the Mi Mix and the Mi 6, which are great devices; but arguably the company does low-cost hardware with strong spec lists better. Its latest is the Redmi Note 4X, an update to 2016’s Redmi Note 4, which costs about $160 depending on the color you choose. That’s not very much money for a smartphone today, especially one with features like the Note 4X.',
            'price' => 110,
            'category_id' => 1
        ]);
        Product::create([
            'name' => 'Yellow hoodie',
            'description' => 'With the iPad 9, Apple released the newest version of their cheapest tablet recently. Compared to its predecessor, not much has changed at first sight. But on the inside, there is an important change because now it’s faster than premium tablets from Samsung. However, starting at 329 Dollars we don’t just get top performance but also a couple of weaknesses. In this Apple iPad 9 review, you’ll learn everything you need to know about this tablet.',
            'price' => 550,
            'category_id' => 2
        ]);
    }
}
