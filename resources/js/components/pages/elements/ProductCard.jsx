import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div className="top-sales-card product-card">
            <Link to={`/product/${product.id}`}>
                <div className="product-card__image"><img src={product.image} alt="" /></div>
                <div className="product-card__title">{product.name}</div>
                <div className="product-card__price">{product.price}₴</div>
            </Link>
        </div>
    );
}

export default ProductCard;
