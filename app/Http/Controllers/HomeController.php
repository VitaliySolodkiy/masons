<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Color;
use App\Models\Product;
use App\Models\ProductColors;
use App\Models\ProductSizes;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {

        $categories = Category::all();
        return response()->json([ //объект response
            'categories' => $categories,
        ], 200);
    }

    public function category(Category $category)
    {
        $products = Product::where('category_id', $category->id)->get();

        return response()->json([
            'category' => $category,
            'products' => $products,
        ], 200);
    }

    public function product($id)
    {
        $product = Product::with('productColors', 'productSizes', 'review')->where("id", $id)->first();
        return response()->json([
            'product' => $product,
        ], 200);
    }

    public function latestProducts()
    {
        $latestProducts = Product::latest()->take(4)->get();
        return response()->json([ //объект response
            'latestProducts' => $latestProducts,
        ], 200);
    }
    public function search(Request $request)
    {
        $searchText = $request->q;
        $products = Product::where('name', 'LIKE', "%$searchText%")->get();
        return response()->json($products, 200);
    }
}
