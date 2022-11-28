import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import CartContext from '../../contexts/CartContext';
import { CompassOutlined } from '@ant-design/icons';

const Product = () => {

    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [amount, setAmount] = useState(1);
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

    return (
        <div className="product">
            <div className='product__container _container'>
                <div className="product__main">
                    <div className="product__image"><img src={product.image} alt={product.name} /></div>
                    <div className="product__info">
                        <h2 className='product__title'>{product.name}</h2>
                        <p className='product__price'>{product.price} UAH</p>
                        <div className="product__properties">
                            {(!product.product_sizes || product.product_sizes?.length === 0)
                                ? ''
                                : <>
                                    <span>Size:</span>
                                    <select
                                        name="size"
                                        id="size"
                                        onChange={(e) => setProperties({ ...properties, size: e.target.value })}
                                    >
                                        {product.product_sizes && product.product_sizes.map(size => <option value={size.size_name} key={size.id}>{size.size_name}</option>)}
                                    </select>
                                </>
                            }

                            {(!product.product_colors || product.product_colors?.length === 0)
                                ? ''
                                : <>
                                    <span>Color:</span>
                                    <select
                                        name="color"
                                        id="color"
                                        onChange={(e) => setProperties({ ...properties, color: e.target.value })}
                                    >
                                        {product.product_colors && product.product_colors.map(color => <option value={color.color_name} key={color.id}>{color.color_name}</option>)}
                                    </select>
                                </>
                            }


                        </div>
                        <InputGroup className="my-3">
                            <InputGroup.Text id="basic-addon1">{product.price}$</InputGroup.Text>
                            <Form.Control
                                type="number"
                                name="amount"
                                value={properties.amount}
                                min="1"
                                onChange={({ target }) => setProperties({ ...properties, amount: target.value })}
                            />
                            <Button variant="warning" id="button-addon2" onClick={() => { addCartItem({ ...product, properties }); modalShow() }}>
                                Add to cart
                            </Button>
                        </InputGroup>
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
