<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductColors;
use App\Models\ProductSizes;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::with('category', 'productColors', 'productSizes')->get();
        return $products;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // dd(json_decode($request->product_colors[0]));
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'price' => 'required|numeric',
            'category_id' => 'required|numeric',
            'image_file' => 'mimes:jpg,bmp,png,webp',
        ]);

        $product = Product::create($request->all());

        if ($request->image_file) {
            $path = $request->image_file->store('products', ['disk' => 'public']); //сохранение файла на сервер
            $product->image = '/uploads/' . $path; //записываем путь к картинке в продукт
            $product->save(); //сохраняем в БД
        }

        $product->category = $product->category;
        $product->image = $product->image; //когда создали товар и сохранили его, у нас нет картинки и данные возвращаются без изображения. Свойство со значением undefined в JSON не преобразовывается. Мы тут явно говорим что у продукта явно будет свойство image. при обращении к свойству image у модели отрабатывает геттер ($product->image), который проверяет есть ли в базе данных путь к картине, если есть - возвращается путь, если нет - возвращается картинка заглушка. 

        foreach ($request->product_colors as $color) {
            $encodedColor = json_decode($color);
            $productColor = new ProductColors();
            $productColor->color_name = $encodedColor->name;
            $productColor->color_id = $encodedColor->id;
            $productColor->product_id = $product->id;
            $productColor->save();
        }

        foreach ($request->product_sizes as $size) {
            $encodedSize = json_decode($size);
            $productSize = new ProductSizes();
            $productSize->size_name = $encodedSize->name;
            $productSize->size_id = $encodedSize->id;
            $productSize->product_id = $product->id;
            $productSize->save();
        }

        return response()->json([
            'success' => true,
            'data' => $product
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        // dd($request);
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'price' => 'required|numeric',
            'category_id' => 'required|numeric',
            'image_file' => 'mimes:jpg,bmp,png,webp',
        ]);

        $product = Product::findOrFail($id);

        $product->update($request->all());

        if ($request->image_file) {
            $path = $request->image_file->store('products', ['disk' => 'public']); //сохранение файла на сервер
            $product->image = '/uploads/' . $path; //записываем путь к картинке в продукт
            $product->save(); //сохраняем в БД
        }

        $product->category = $product->category;

        $oldColors = ProductColors::where("product_id", $id)->get();
        foreach ($oldColors as $oldColor) {
            $productColor = ProductColors::findOrFail($oldColor->id);
            $productColor->delete();
        }

        if ($request->product_colors) {
            $newColors = array_map(fn ($color) => json_decode($color), $request->product_colors);
            foreach ($newColors as $color) {
                $productColor = new ProductColors();
                $productColor->color_name = $color->color_name;
                $productColor->color_id = $color->color_id;
                $productColor->product_id = $product->id;
                $productColor->save();
            }
            $product->product_colors = $newColors;
        }

        $oldSizes = ProductSizes::where("product_id", $id)->get();
        foreach ($oldSizes as $oldSize) {
            $productSize = ProductSizes::findOrFail($oldSize->id);
            $productSize->delete();
        }

        if ($request->product_sizes) {
            $newSizes = array_map(fn ($size) => json_decode($size), $request->product_sizes);
            foreach ($newSizes as $size) {
                $productSize = new ProductSizes();
                $productSize->size_name = $size->size_name;
                $productSize->size_id = $size->size_id;
                $productSize->product_id = $product->id;
                $productSize->save();
            }
            $product->product_sizes = $newSizes;
        }

        return response()->json([
            'success' => true,
            'data' => $product
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json([
            'message' => 'Product deleted successfully!'
        ]);
    }
}
