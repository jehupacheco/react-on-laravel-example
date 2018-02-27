@extends('base')

@php
    $app = ReactRenderer::reactRenderComponentArray('products.index', [
        'props' => ['products' => $products, 'cart' => Cart::content()],
    ]);
@endphp

@section('extra-css')
    {!! $app['componentCss'] !!}
@endsection

@section('content')
    {!! $app['componentHtml'] !!}
@endsection
