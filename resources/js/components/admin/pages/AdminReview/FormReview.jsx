import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, Col, Row } from 'antd';
import TextArea from 'antd/lib/input/TextArea';


const FormReview = ({ addReview, handleCancel, editedReview, editReview }) => {
    const [products, setProducts] = useState([]);
    const [form] = Form.useForm();
    const initialValues = {};

    const getProducts = async () => {
        const { data } = await axios.get('/api/products');
        const items = data.map(item => { return { value: item.id, label: item.name } })
        setProducts(items);
    }

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        if (editedReview) {
            form.setFieldsValue(editedReview); //если товар существует (редактирование) записываются его данные в форму. Если же мы только создаем товар, то форма пустая
        }


    }, [editedReview, form])

    const submitHandler = async (values) => {
        const { data } = await axios.post('/api/reviews', values);

        if (data.success === true) {
            addReview(data.data);
            handleCancel();
        }
    };

    return (
        <Form
            initialValues={initialValues}
            form={form}
            onFinish={(values) => {
                console.log(values);
                editReview ? editReview(editedReview.id, values) : submitHandler(values);
                handleCancel();
            }}
        /* autoComplete="off" */
        >
            <Form.Item
                label="Username"
                name="name"
                rules={[{ required: true, message: 'Please input username' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Content"
                name="content"
                rules={[{ required: true, message: 'Please input content' }]}
            >
                <TextArea />
            </Form.Item>

            <Form.Item
                label="Rating"
                name="rating"
                rules={[{ required: true }]}
            >
                <Select
                    style={{
                        width: 120,
                    }}
                    options={[
                        {
                            value: '1',
                            label: '1',
                        },
                        {
                            value: '2',
                            label: '2',
                        },
                        {
                            value: '3',
                            label: '3',
                        },
                        {
                            value: '4',
                            label: '4',
                        },
                        {
                            value: '5',
                            label: '5',
                        },
                    ]}
                />
            </Form.Item>

            <Form.Item
                label="Product"
                name="product_id"
                rules={[{ required: true }]}
            >
                <Select
                    style={{
                        width: "100%",
                    }}
                    options={products}
                />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}

export default FormReview;
