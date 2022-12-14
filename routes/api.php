<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ColorController;
use App\Http\Controllers\DeliveryOptionsController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentOptionsController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\SizeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//это отдельный машршрут (будет переписываться на группу):
// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// }); 

//группа маршрутов для зарегистрированных пользователей
Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::post('logout', [LoginController::class, 'logout']);
});

//определяем маршрут

//resourse
Route::resource('categories', CategoryController::class);
Route::resource('products', ProductController::class);
Route::resource('orders', OrderController::class);
Route::resource('colors', ColorController::class);
Route::resource('sizes', SizeController::class);
Route::resource('reviews', ReviewController::class);
Route::resource('delivery-methods', DeliveryOptionsController::class);
Route::resource('payment-methods', PaymentOptionsController::class);
//other

Route::get('/home', [HomeController::class, 'index']);
Route::get('/home-latest', [HomeController::class, 'latestProducts']);
Route::get('/category/{category}', [HomeController::class, 'category']);
Route::get('/product/{product}', [HomeController::class, 'product']);
Route::get('search', [HomeController::class, 'search']);

Route::post('login', [LoginController::class, 'authentificate']);
Route::post('registration', [LoginController::class, 'registration']);

Route::post('products/{id}', [ProductController::class, 'update']);

Route::post('/order', [OrderController::class, 'placeOrder']);
Route::get('order-details/{id}', [OrderController::class, 'orderDetails']);
Route::post('order-products-update', [OrderController::class, 'updateOrderProducts']);
Route::get('user-orders/{email}', [OrderController::class, 'userOrders']);
Route::get('user-last-order-products/{email}', [OrderController::class, 'userLastOrderProducts']);
