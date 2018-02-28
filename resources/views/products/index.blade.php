@extends('base')

@php
    Debugbar::info($products);
    Debugbar::info(Cart::content());

    $app = ReactRenderer::reactRenderComponentArray('products.index', [
        'props' => [
            'products' => $products,
            'cart' => Cart::content(),
            'total' => Cart::total(),
        ],
        'trace' => true,
    ]);

@endphp

@section('extra-css')
    {!! $app['componentCss'] !!}
@endsection

@section('content')
    {!! $app['componentHtml'] !!}
@endsection
