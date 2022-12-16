import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from './elements/ProductCard';

const SearchResult = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');

    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        const { data } = await axios.get(`/api/search?q=${query}`);
        setProducts(data);
    }

    useEffect(() => {
        getProducts();
    }, [query]);

    const productsMaps = (product) => {
        return (
            <div className="category-list-item" key={product.id}>
                <ProductCard product={product} />
            </div>
        )
    }

    return (
        <div className="search-results">
            <div className="search-results__container _container">
                <div className="search-results__title"><h3>Search result for: "{query}"</h3></div>
                <div className="category__list">
                    {products.map(productsMaps)}
                </div>
            </div>
        </div>
    );
}

export default SearchResult;
