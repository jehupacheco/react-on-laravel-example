@extends('base')

@section('content')
    {!! @reactComponent('products.index', ['props' => ['products' => $products]]) !!}
@endsection
