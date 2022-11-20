import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';

const EditOrderProducts = ({ orderProducts, setOrderProducts }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editedProducts, setEditedProducts] = useState([]);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        setEditedProducts(orderProducts)
    }, [orderProducts]);


    const submitHandler = async () => {

        const response = await axios.post('/api/order-products-update', { editedProducts });
        setOrderProducts(editedProducts.filter(product => product.product_amount !== 0 ? product : ''))
        handleCancel();
    }

    const decrementProduct = (id) => {
        setEditedProducts(editedProducts.map(product => {
            if (product.id === id && product.product_amount !== 1) {
                return { ...product, 'product_amount': product.product_amount -= 1 }
            }
            return product
        }));
    }

    const incrementProduct = (id) => {
        setEditedProducts(editedProducts.map(product => {
            if (product.id === id) {
                return { ...product, 'product_amount': product.product_amount += 1 }
            }
            return product
        }));
    }

    const removeProduct = (id) => {
        setEditedProducts(editedProducts.map(product => {
            if (product.id === id) {
                return { ...product, 'product_amount': product.product_amount = 0 }
            }
            return product
        }));
    }


    return (
        <>
            <Button type="primary" onClick={showModal}>
                Edit order products
            </Button>
            <Modal title="Edit order info"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >

                <div>
                    {editedProducts?.map(item => (
                        item.product_amount !== 0
                            ?
                            <div key={item.id} className="product-item" >
                                <div style={{ justifySelf: "flex-start" }}>{item.product_name}</div>
                                <div className='controls dec' onClick={() => decrementProduct(item.id)}>–</div>
                                <div>{item.product_amount}</div>
                                <div className='controls inc' onClick={() => incrementProduct(item.id)}>+</div>

                                <div>{item.product_price * item.product_amount}</div>
                                <div onClick={() => removeProduct(item.id)}><a > X </a></div>
                            </div>
                            : ''
                    ))}
                </div>

                <Button type="primary" onClick={submitHandler}>
                    Save
                </Button>
            </Modal>
        </>
    );
}

export default EditOrderProducts;
