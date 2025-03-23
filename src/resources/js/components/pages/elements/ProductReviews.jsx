import React, { useState, useContext } from 'react';
import AuthUserContext from '../../../contexts/AuthUserContext';
import { Modal, Form, Input, Select, Button, Typography } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { Link } from "react-router-dom";

const ProductReviews = ({ product, filledStarPath, unFilledStarPath, ratingMaximum, getRatingIcons }) => {
    const [authUser, setAuthUser] = useContext(AuthUserContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalOpen(true);
        form.setFieldsValue({
            "name": authUser.name,
            "product_id": product.id,
        });
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const submitHandler = async (values) => {
        const { data } = await axios.post('/api/reviews', values);
        if (data.success === true) {
            product.review.unshift(data.data)
            handleCancel();
        }
    }


    return (
        <div className="product-reviews">
            <div className="product-reviews__main">
                <h4>Reviews</h4>
                <button className="product-reviews__btn product-btn" onClick={showModal}>Write review</button>
            </div>
            <Modal title={`Write Review for: "${product.name}"`} open={isModalOpen} onCancel={handleCancel} footer={null}>
                {!authUser
                    ? <p>You must be <Link to="/login">logged in</Link> to write a review</p>
                    : <>
                        <Form

                            form={form}
                            onFinish={submitHandler}
                        >
                            <Form.Item
                                label="Username"
                                name="name"
                                rules={[{ required: true, message: 'Please input username' }]}
                                hidden={true}

                            >
                                <Input />
                            </Form.Item>

                            <Typography>
                                <pre>User Name: {authUser.name}</pre>
                            </Typography>

                            <Form.Item
                                name="content"
                                rules={[{ required: true, message: 'Please input review' }]}
                            >
                                <TextArea
                                    placeholder="Write a review"
                                />
                            </Form.Item>

                            <Form.Item
                                /* label="Rate this product" */
                                name="rating"
                                rules={[{ required: true, message: 'Please rate this product' }]}
                            >
                                <Select
                                    placeholder="Rate this product"
                                    style={{
                                        width: "100%",
                                    }}
                                    options={[
                                        {
                                            value: 1,
                                            label: '1',
                                        },
                                        {
                                            value: 2,
                                            label: '2',
                                        },
                                        {
                                            value: 3,
                                            label: '3',
                                        },
                                        {
                                            value: 4,
                                            label: '4',
                                        },
                                        {
                                            value: 5,
                                            label: '5',
                                        },
                                    ]}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Product"
                                name="product_id"
                                rules={[{ required: true }]}
                                hidden={true}
                            >
                                <Select

                                    style={{
                                        width: "100%",
                                    }}
                                    options={null}
                                />
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button onClick={handleCancel} className="ant-btn-mr-30">Cancel</Button>
                                <Button htmlType="submit">
                                    Save
                                </Button>
                            </Form.Item>
                        </Form>

                    </>
                }


            </Modal>
            <div className="product-reviews__user-reviews">
                {product.review?.map(review => {
                    return (
                        <div className="user-review" key={review.id}>
                            <div className="user-review__avatar">
                                <img src="../icons/user-no-photo.png" alt="" />
                            </div>
                            <div className="user-review__body">
                                <div className="user-review__main-info">
                                    <div className="user-review__user-name">{review.name}</div>
                                    <div className="user-review__rating">
                                        {getRatingIcons(review.rating, filledStarPath, unFilledStarPath, ratingMaximum)
                                            .map(item => item)}
                                    </div>
                                </div>
                                <div className="user-review__content">{review.content}</div>
                            </div>

                        </div>
                    )
                })}

            </div>

        </div>
    );
}

export default ProductReviews;
