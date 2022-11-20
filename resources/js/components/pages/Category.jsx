import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Category = () => {
    const { id } = useParams();

    const [category, setCategory] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getCategoryPageData();
    }, [id]);

    const getCategoryPageData = async () => {
        await axios.get(`/api/category/${id}`)
            .then(({ data }) => {
                setCategory(data.category);
                setProducts(data.products);
            })
    }

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
            <h2 className='my-3'>{category}</h2>
            <div className="product_list">
                {products.map(productsMaps)}
            </div>
        </div>
    );
}

export default Category;
