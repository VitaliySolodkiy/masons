<?php

namespace App\Http\Controllers;

use App\Mail\OrderShipped;
use App\Models\Order;
use App\Models\OrderItems;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class OrderController extends Controller
{

    public function index()
    {
        return Order::all();
    }

    function placeOrder(Request $request)
    {
        // dd($request->cartItems);

        $order = new Order();
        $order->user_name = $request->formValues['user_name'];
        $order->user_email = $request->formValues['user_email'];
        $order->user_phone = $request->formValues['user_phone'];
        $order->user_city = $request->formValues['user_city'];
        $order->post_office = $request->formValues['post_office'];
        $order->delivery_method = $request->formValues['delivery_method'];
        $order->payment_method = $request->formValues['payment_method'];
        /*         $order->total_sum = array_reduce($request->cartItems, function ($carry, $item) {
            return $carry += $item['price'] * $item['amount'];
        }); */
        $order->save();

        foreach ($request->cartItems as $item) {
            $orderItem = new OrderItems();
            $orderItem->order_id = $order->id;
            $orderItem->product_id = $item['id'];
            $orderItem->product_name = $item['name'];
            $orderItem->product_price = $item['price'];
            $orderItem->product_amount = $item['properties']['amount'];
            $orderItem->product_size = $item['properties']['size'];
            $orderItem->product_color = $item['properties']['color'];
            $orderItem->save();
        };

        //Mail
        Mail::to('majestis777@gmail.com')->send(new OrderShipped($order));

        return response()->json(['order_id' => $order->id]);
    }

    public function orderDetails($id)
    {
        $orderProducts = Order::with('orderProducts')->where('id', $id)->get();
        return response()->json($orderProducts[0]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'user_email' => 'required',
            'user_phone' => 'required|numeric',
        ]);

        $order = Order::findOrFail($id);
        $order->user_email = $request['user_email'];
        $order->user_phone = $request['user_phone'];
        $order->save();

        return response()->json([
            'success' => true,
            'data' => $order
        ]);
    }

    public function updateOrderProducts(Request $request)
    {

        // dd($request->editedProducts);

        foreach ($request->editedProducts as $item) {
            $orderItem = OrderItems::findOrFail($item['id']);
            if ($item['product_amount'] === 0) {
                $orderItem->delete();
            } else {
                $orderItem->product_amount = $item['product_amount'];
                $orderItem->save();
            }
        };

        return response()->json([
            'success' => true,
            'data' => $request->editedProducts
        ]);
    }

    public function destroy(Order $order)
    {
        $order->delete();
        return response()->json([
            'message' => 'Order deleted successfully!'
        ]);
    }
    public function userOrders($email)
    {
        // dd($email);
        $userOrders = Order::with('orderProducts')->where('user_email', $email)->get();
        return response()->json($userOrders);
    }
    public function userLastOrderProducts($email)
    {
        $lastOrder = Order::with('orderProducts')->where('user_email', $email)->orderBy('created_at', 'desc')->first();
        foreach ($lastOrder->orderProducts as $order_product) {
            $products[] = Product::where('id', $order_product->product_id)->first();
        }
        return response()->json($products);
    }
}
