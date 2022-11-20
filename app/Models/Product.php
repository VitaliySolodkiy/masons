<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'image',
        'description',
        'category_id',
        'price'
    ];
    // public $timestamps = false;

    protected function image(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value ? $value  : '/images/no-image.jpg'
        );
    }
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function galleries()
    {
        return $this->hasMany(Gallery::class);
    }
}
