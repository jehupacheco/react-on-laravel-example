<?php

namespace App\Http\Controllers;

use App\Models\Product;
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
        $products = Product::paginate(10)->map(function($product) {
            $product->images = json_decode($product->images);

            return $product;
        });

        return view('products.index', compact('products'));
    }

    /**
     * Return a list of products as JSON.
     *
     * @return \Illuminate\Http\Response
     */
    public function list()
    {
        $products = Product::paginate(10);

        $products->each(function($product) {
            $product->images = json_decode($product->images);
        });

        return $products;
    }
}
