<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class CartController extends Controller
{
    public function addProduct(Request $request)
    {
        $request->validate([
            'id' => 'required',
        ]);

        $product = Product::find($request->input('id'));
        \Cart::add($product->id, $product->name, 1, $product->price);

        return json_encode(\Cart::content());
    }
}
