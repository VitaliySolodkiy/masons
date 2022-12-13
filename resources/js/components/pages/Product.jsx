import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CartContext from '../../contexts/CartContext';
import FavoritesContext from '../../contexts/FavoritesContext';
import ProductReviews from './elements/ProductReviews';

const Product = () => {

    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [properties, setProperties] = useState({});
    const { addCartItem, modalShow } = useContext(CartContext);
    const { favoriteItems, addFavoriteItem, modalFavoriteShow } = useContext(FavoritesContext);
    const [rating, setRating] = useState([]);
    const filledStarPath = '../icons/filled-star.png';
    const unFilledStarPath = '../icons/unfilled-star.png';
    const ratingMaximum = 5;


    useEffect(() => {
        getProductPageData();

    }, [id]);
    const getProductPageData = async () => {
        await axios.get(`/api/product/${id}`)
            .then(({ data }) => {
                setProduct(data.product);
                setProperties({
                    amount: 1,
                    size: (data.product.product_sizes.length !== 0 ? data.product.product_sizes[0].size_name : ""),
                    color: (data.product.product_colors.length !== 0 ? data.product.product_colors[0].color_name : ""),
                });
            });

    }

    useEffect(() => {
        setRating(
            getRatingIcons(
                product.review,
                filledStarPath,
                unFilledStarPath,
                ratingMaximum)
        );
    }, [product]);

    const decrementProduct = () => {
        if (properties.amount === 1) return;
        let newAmount = properties.amount - 1
        setProperties({ ...properties, amount: newAmount })
    }

    const incrementProduct = () => {
        let newAmount = properties.amount + 1;
        setProperties({ ...properties, amount: newAmount })
    }

    const getRatingIcons = (source, filledStarPath, unFilledStarPath, ratingMaximum) => {

        let rating;
        if (typeof source === 'number') {
            rating = source;
        }
        else {
            rating = Math.round(source?.reduce((sum, elem) => sum + elem.rating, 0) / product.review?.length);
        }


        let starsArr = [];
        for (let i = 0; i < ratingMaximum; i++) {
            if (i < rating) {
                starsArr.push(<img src={filledStarPath} key={i} />)
            }
            else {
                starsArr.push(<img src={unFilledStarPath} key={i} />);
            }
        }
        return starsArr;
    }


    return (
        <div className="product">
            <div className='product__container _container'>
                <div className="product__main">
                    <div className="product__image"><img src={product.image} alt={product.name} /></div>
                    <div className="product__info">
                        <h2 className='product__title'>{product.name}</h2>
                        <div className="product__rating">{rating?.map(star => star)}</div>
                        <p className='product__price'>{product.price} UAH</p>
                        <div className="product-properties">
                            {(!product.product_sizes || product.product_sizes?.length === 0)
                                ? ''
                                : <div className="product-properties__item">
                                    <span>Size:</span>
                                    <div className='product-properties__item-select'>
                                        <select
                                            name="size"
                                            id="size"
                                            onChange={(e) => setProperties({ ...properties, size: e.target.value })}
                                        >
                                            {product.product_sizes && product.product_sizes.map(size => <option value={size.size_name} key={size.id}>{size.size_name}</option>)}
                                        </select>
                                    </div>
                                </div>
                            }

                            {(!product.product_colors || product.product_colors?.length === 0)
                                ? ''
                                : <div className="product-properties__item">
                                    <span>Color:</span>
                                    <div className='product-properties__item-select'>
                                        <select
                                            name="color"
                                            id="color"
                                            onChange={(e) => setProperties({ ...properties, color: e.target.value })}
                                        >
                                            {product.product_colors && product.product_colors.map(color => <option value={color.color_name} key={color.id}>{color.color_name}</option>)}
                                        </select>
                                    </div>
                                </div>
                            }
                            <div className="product-properties__item product-properties__item-amount">
                                <span>Amount:</span>
                                <div className="product-properties__item-amount-controls-wrapper">
                                    <div className="product-properties__item-amount-controls">
                                        <div className='controls dec' onClick={() => decrementProduct()}>–</div>
                                        <div className='amount'>{properties.amount}</div>
                                        <div className='controls inc' onClick={() => incrementProduct()}>+</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="product-buy">
                            <button className='buy product-btn' onClick={() => { addCartItem({ ...product, properties }); modalShow() }}>Buy</button>
                            <button className='favorites' onClick={() => { addFavoriteItem({ ...product, properties }); modalFavoriteShow() }}>

                                {favoriteItems.find(item => item.id === +id)
                                    ? <img src="../icons/fav-full.png" alt="" />
                                    : <img src="../icons/fav.png" alt="" />
                                }

                            </button>
                        </div>

                    </div>

                </div>

                <div className="product__description">
                    <h4>Description:</h4>
                    {product.description}
                </div>
                <ProductReviews
                    product={product}
                    setProduct={setProduct}
                    filledStarPath={filledStarPath}
                    unFilledStarPath={unFilledStarPath}
                    ratingMaximum={ratingMaximum}
                    getRatingIcons={getRatingIcons}
                />
            </div>
        </div>
    );
}

export default Product;
