import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CartContext from '../../contexts/CartContext';

const Product = () => {

    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [properties, setProperties] = useState({});
    const { addCartItem, modalShow } = useContext(CartContext);

    useEffect(() => {
        getProductPageData();

    }, [id]);

    const getProductPageData = async () => {
        await axios.get(`/api/product/${id}`)
            .then(({ data }) => {
                setProduct(data.product);
                setProperties({
                    amount: 1,
                    size: (data.product.product_sizes.length !== 0 ? data.product.product_sizes[0].size_name : []),
                    color: (data.product.product_colors.length !== 0 ? data.product.product_colors[0].color_name : []),
                });
            });
    }

    const decrementProduct = () => {
        if (properties.amount === 1) return;
        let newAmount = properties.amount - 1
        setProperties({ ...properties, amount: newAmount })
    }

    const incrementProduct = () => {
        console.log('increment in product')
        let newAmount = properties.amount + 1
        setProperties({ ...properties, amount: newAmount })
    }

    return (
        <div className="product">
            <div className='product__container _container'>
                <div className="product__main">
                    <div className="product__image"><img src={product.image} alt={product.name} /></div>
                    <div className="product__info">
                        <h2 className='product__title'>{product.name}</h2>
                        <p className='product__price'>{product.price} UAH</p>
                        <div className="product-properties">
                            {(!product.product_sizes || product.product_sizes?.length === 0)
                                ? ''
                                : <div className="product-properties__item">
                                    <span>Size:</span>
                                    <select
                                        name="size"
                                        id="size"
                                        onChange={(e) => setProperties({ ...properties, size: e.target.value })}
                                    >
                                        {product.product_sizes && product.product_sizes.map(size => <option value={size.size_name} key={size.id}>{size.size_name}</option>)}
                                    </select>
                                </div>
                            }

                            {(!product.product_colors || product.product_colors?.length === 0)
                                ? ''
                                : <div className="product-properties__item">
                                    <span>Color:</span>
                                    <select
                                        name="color"
                                        id="color"
                                        onChange={(e) => setProperties({ ...properties, color: e.target.value })}
                                    >
                                        {product.product_colors && product.product_colors.map(color => <option value={color.color_name} key={color.id}>{color.color_name}</option>)}
                                    </select>
                                </div>
                            }
                            <div className="product-properties__item product-properties__item-amount">
                                <span>Amount:</span>
                                <div className="product-properties__item-amount-controls">
                                    <div className='controls dec' onClick={() => decrementProduct()}>–</div>
                                    <div className='amount'>{properties.amount}</div>
                                    <div className='controls inc' onClick={() => incrementProduct()}>+</div>
                                </div>
                            </div>
                        </div>
                        <div className="product-buy">
                            <button className='buy' onClick={() => { addCartItem({ ...product, properties }); modalShow() }}>Buy</button>
                            <button className='favorites'><img src="../icons/fav.png" alt="" /></button>
                        </div>

                    </div>

                </div>

                <div className="product__description">
                    <h4>Description:</h4>
                    {product.description}</div>
            </div>
        </div>
    );
}

export default Product;
