import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from './elements/ProductCard';

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
                console.log(data)
                setCategory(data.category);
                setProducts(data.products);
            })
    }

    const productsMaps = (product) => {
        return (
            <div className="category-list-item">
                <ProductCard product={product} />
            </div>
        )
    }

    return (
        <div className="category">
            <div className="category__container _container">
                <h3>{category.name}</h3>
                <h5>{category.description}</h5>
                <div className="category__list">
                    {products.map(productsMaps)}
                </div>
            </div>
        </div>
    );
}

export default Category;
