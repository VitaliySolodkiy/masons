import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Input, Row, Col, Radio, Space } from 'antd';
import CartContext from '../../../contexts/CartContext';
import AuthUserContext from '../../../contexts/AuthUserContext';
import { useNavigate, Link } from 'react-router-dom';


const Order = () => {
    const { cartItems, removeCartItem, incrementProduct, decrementProduct, changeProperty, clearCart } = useContext(CartContext);
    const [authUser, setAuthUser] = useContext(AuthUserContext);
    const [cartItemsTotal, setCartItemsTotal] = useState(0)
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [deliveryPrice, setDeliveryPrice] = useState(0);

    useEffect(() => {
        setCartItemsTotal(cartItems.reduce((sum, item) => sum + item.price * item.properties.amount, 0));
    }, [cartItems]);

    useEffect(() => {
        if (authUser) {
            form.setFieldsValue({
                "user_name": authUser.name,
                "user_email": authUser.email,
                "user_phone": authUser.phone,
                "user_city": authUser.city,
            })
        }

    }, []);
    console.log(cartItems)
    const onFinish = (formValues) => {
        console.log(formValues);
        axios.post('/api/order', { formValues, cartItems })
            .then(({ data }) => {
                clearCart();
                navigate('/order-thank', { state: { orderId: data.order_id } });
            });
    }
    return (
        <>
            <div className="order">
                <div className="order__container _container">
                    <div className="order-cart">
                        <div className="order-cart__title"><h4>Cart</h4></div>

                        <div className="order-cart__body">
                            {cartItems.length === 0
                                ? <p>Cart Empty</p>
                                : cartItems.map(product => {
                                    return (
                                        <div className="order-cart-item" key={product.id + product.properties.color + product.properties.size}>
                                            <div className="order-cart-item__image"><img src={product.image} alt={product.name} /></div>
                                            <div className="order-cart-item__main-info"><h5><Link to={`/product/${product.id}`}>{product.name}</Link></h5></div>
                                            <div className="product-properties">
                                                {(!product.product_sizes || product.product_sizes?.length === 0)
                                                    ? ""
                                                    : <div className="product-properties__item">
                                                        <div className='product-properties__item-select'>
                                                            <select
                                                                name="size"
                                                                id="size"
                                                                defaultValue={product.properties.size}
                                                                onChange={(e) => {
                                                                    changeProperty(product, "size", e.target.value)
                                                                }}
                                                            >
                                                                {product.product_sizes && product.product_sizes.map(size => <option value={size.size_name} key={size.id}>{size.size_name}</option>)}
                                                            </select>
                                                        </div>
                                                    </div>}
                                                {(!product.product_colors || product.product_colors?.length === 0)
                                                    ? ""
                                                    : <div className="product-properties__item">
                                                        <div className='product-properties__item-select'>
                                                            <select
                                                                name="color"
                                                                id="color"
                                                                defaultValue={product.properties.color}
                                                                onChange={(e) => changeProperty(product, "color", e.target.value)}
                                                            >
                                                                {product.product_colors && product.product_colors.map(color => <option value={color.color_name} key={color.id}>{color.color_name}</option>)}
                                                            </select>
                                                        </div>
                                                    </div>}
                                                <div className="product-properties__item product-properties__item-amount">

                                                    <div className="product-properties__item-amount-controls-wrapper">
                                                        <div className="product-properties__item-amount-controls">
                                                            <div className='controls dec' onClick={() => decrementProduct(product)}>–</div>
                                                            <div className='amount'>{product.properties.amount}</div>
                                                            <div className='controls inc' onClick={() => incrementProduct(product)}>+</div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="order-cart-item__price">{product.price * product.properties.amount} uah</div>
                                            <div className="order-cart-item__delete"><button className='delete-btn' onClick={() => removeCartItem(product)}><img src="../icons/delete.png" alt="" /></button></div>
                                        </div>

                                    )
                                })
                            }

                        </div>
                    </div>
                    <div className="order-checkout">
                        <div className="order-checkout__title"><h4>Checkout</h4></div>
                        <div className="order-checkout__form">
                            <Form

                                form={form}
                                onFinish={onFinish}
                            >
                                <Row>
                                    <Col span={11}>
                                        <Form.Item

                                            name="user_name"
                                            rules={[{ required: true, message: 'Please input name' }]}
                                        >
                                            <Input placeholder="Your name" />
                                        </Form.Item>
                                        <Form.Item
                                            name="user_email"
                                            rules={[{ required: true, message: 'Please input email' }, { type: 'email', message: 'Invalid email' }]}
                                        >
                                            <Input placeholder="Email" />
                                        </Form.Item>
                                        <Form.Item
                                            name="user_phone"
                                            rules={[{ required: true, message: 'Please input your phone number' }]}
                                        >
                                            <Input placeholder="Phone" type='phone' />
                                        </Form.Item>
                                        <Form.Item
                                            name="user_city"
                                            rules={[{ required: true, message: 'Please input your city' }]}
                                        >
                                            <Input placeholder="City" type='text' />
                                        </Form.Item>
                                        <Form.Item

                                            name="post_office"
                                            rules={[{ required: true, message: 'Please input post office number' }]}
                                        >
                                            <Input placeholder="Post office" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={11}>
                                        <Row>
                                            <Col span={11}>
                                                <Form.Item
                                                    className='order-checkout__form-title'
                                                    name="delivery_method"
                                                    label="Delivery"
                                                    labelCol={{ span: 24 }}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please pick an item!',
                                                        },
                                                    ]}
                                                >
                                                    <Radio.Group onChange={(e) => setDeliveryPrice(e.target.value === 'Self pick up' ? 0 : 50)}>
                                                        <Space direction="vertical">
                                                            <Radio value='Self pick up'>Self pick up</Radio>
                                                            <Radio value='Post delivery'>Post delivery</Radio>

                                                        </Space>
                                                    </Radio.Group>
                                                </Form.Item>
                                            </Col>
                                            <Col span={11}>
                                                <Form.Item
                                                    className='order-checkout__form-title'
                                                    name="payment_method"
                                                    label="Payment"
                                                    labelCol={{ span: 24 }}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please pick an item!',
                                                        },
                                                    ]}
                                                >
                                                    <Radio.Group >
                                                        <Space direction="vertical">
                                                            <Radio value='After delivery payment'>After delivery payment</Radio>
                                                            <Radio value='Card'>Card</Radio>

                                                        </Space>
                                                    </Radio.Group>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <div className="form-total-price">
                                            <div className="form-total-price__products-total">Order: {cartItemsTotal}</div>
                                            <div className="form-total-price__delivery-price">Delivery: {deliveryPrice}</div>
                                            <div className="form-total-price__order-total">Total: <span>{cartItemsTotal + deliveryPrice}</span></div>
                                        </div>
                                        <Form.Item wrapperCol={{ offset: 8, span: 16 }} className="order-checkout__submit-button">
                                            <Button htmlType="submit" >
                                                Place Order
                                            </Button>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Order;
