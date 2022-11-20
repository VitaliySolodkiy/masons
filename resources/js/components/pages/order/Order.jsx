import React, { useContext } from 'react';
import MiniCart from '../cart/MiniCart';
import { Button, Form, Input } from 'antd';
import CartContext from '../../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/antd.css';

const Order = () => {
    const { cartItems, clearCart } = useContext(CartContext);

    const navigate = useNavigate();

    const onFinish = (formValues) => {
        // console.log(formValues);
        axios.post('/api/order', { formValues, cartItems })
            .then(({ data }) => {
                clearCart();
                navigate('/order-thank', { state: { orderId: data.order_id } });
            });
    }
    return (
        <div className='container'>
            <h2 className="my-3">Checkout </h2>
            <div className="order">
                <div className="contact">
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}

                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Emil"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                                {
                                    type: 'email',
                                    message: 'Incorrect emeil'
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your phone number!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>


                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className="cart">
                    <MiniCart />
                </div>
            </div>

        </div>
    );
}

export default Order;
