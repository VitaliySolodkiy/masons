import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Modal, Select } from 'antd';
import moment from 'moment';
import axios from 'axios';

const EditOrderInfo = ({ order, setOrder }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deliveryMethods, setDeliveryMethods] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState([]);

    useEffect(() => {
        getDeliveryMethods();
        getPaymentMethods();
    }, []);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const getDeliveryMethods = async () => {
        const { data } = await axios.get('/api/delivery-methods');
        const items = data.map(item => { return { value: item.name, label: item.name } })
        setDeliveryMethods(items);
    }

    const getPaymentMethods = async () => {
        const { data } = await axios.get('/api/payment-methods');
        const items = data.map(item => { return { value: item.name, label: item.name } })
        setPaymentMethods(items);
    }

    const submitHandler = async (values) => {
        console.log(values)
        const response = await axios.put('/api/orders/' + order.id, values);
        setOrder({
            ...order,
            'user_email': values.user_email,
            "user_phone": values.user_phone,
            "user_city": values.user_city,
            "payment_method": values.payment_method,
            "delivery_method": values.delivery_method,
            "post_office": values.post_office,
            "updated_at": moment()
        })
        handleCancel();
    }

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Edit order info
            </Button>
            <Modal title="Edit order info"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                {/* <FormProduct
                    handleCancel={handleCancel}
                    addProduct={addProduct}
                /> */}

                <Form
                    initialValues={order}
                    onFinish={submitHandler}

                >
                    <Form.Item
                        label="Email"
                        name="user_email"
                        rules={[
                            {
                                required: true
                            },
                            {
                                type: 'email',
                                message: 'Incorrect emeil'
                            }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Phone"
                        name="user_phone"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="City"
                        name="user_city"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Payment method"
                        name="payment_method"
                        rules={[{ required: true }]}
                    >
                        <Select
                            style={{
                                width: "100%",
                            }}
                            options={paymentMethods}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Delivery method"
                        name="delivery_method"
                        rules={[{ required: true }]}
                    >
                        <Select
                            style={{
                                width: "100%",
                            }}
                            options={deliveryMethods}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Post office"
                        name="post_office"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Button htmlType="submit" type="primary">Save</Button>
                    </Form.Item>

                </Form>

            </Modal>
        </>
    );
}

export default EditOrderInfo;
