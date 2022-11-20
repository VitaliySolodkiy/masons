import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import CartContext from '../../contexts/CartContext';

const Product = () => {

    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [amount, setAmount] = useState(1);
    const { addCartItem, modalShow } = useContext(CartContext);

    useEffect(() => {
        getProductPageData();
    }, [id]);

    const getProductPageData = async () => {
        await axios.get(`/api/product/${id}`)
            .then(({ data }) => {
                setProduct(data.product);
            })
    }

    return (
        <div className='container product-container'>
            <h2 className='my-3'>{product.name}</h2>
            <div className="product-img my-3"><img src={product.image} alt={product.name} /></div>

            <InputGroup className="my-3">
                <InputGroup.Text id="basic-addon1">{product.price}$</InputGroup.Text>
                <Form.Control
                    type="number"
                    name="amount"
                    value={amount}
                    min="1"
                    onChange={({ target }) => setAmount(target.value)}
                />
                <Button variant="warning" id="button-addon2" onClick={() => { addCartItem({ ...product, amount }); modalShow() }}>
                    Add to cart
                </Button>
            </InputGroup>
            <div className="product_description">{product.description}</div>
        </div >
    );
}

export default Product;
