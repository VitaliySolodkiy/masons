<h1>Hello, {{ $user->name }}!</h1>
<h3>We have new products:</h3>
<ul>
    @foreach ($products as $product)
        <li><a href="{{ asset('product/' . $product->id) }}">
                {{ $product->name }}
            </a></li>
    @endforeach
</ul>
