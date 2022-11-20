import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

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
            <Card style={{ width: '18rem' }} key={product.id}>
                <Link to={`/product/${product.id}`}>
                    <Card.Img variant="top" src={product.image} />
                    <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>
                            {product.price}$
                        </Card.Text>
                        <Button variant="warning">GO</Button>
                    </Card.Body>
                </Link>
            </Card >
        )
    }

    return (
        <div className='container'>
            <h2 className='my-3'>Search result for: "{query}"</h2>
            {products.length === 0
                ? <p>Nothing found</p>
                : <div className="product_list">
                    {products.map(productsMaps)}
                </div>
            }

        </div>
    );
}

export default SearchResult;
