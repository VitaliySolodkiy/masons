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

    const setColor = (id, value) => {
        console.log(id, ' ', value);
        setEditedProducts(editedProducts.map(product => {
            if (product.id === id) {
                return { ...product, 'product_color': value }
            }
            return product
        }));
    }

    const setSize = (id, value) => {
        setEditedProducts(editedProducts.map(product => {
            if (product.id === id) {
                return { ...product, 'product_size': value }
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
                width={700}
            >

                <div>
                    {editedProducts?.map(item => (
                        item.product_amount !== 0
                            ?
                            <div key={item.id} className="product-item" >
                                <div className="product-item__name">{item.product_name}</div>
                                {item.available_sizes.length === 0
                                    ? ""
                                    : <div className='product-item__select'>
                                        <select
                                            name="size"
                                            id="size"
                                            defaultValue={item.product_size}
                                            onChange={(e) => setSize(item.id, e.target.value)}
                                        >
                                            {item.available_sizes && item.available_sizes.map(size => <option value={size.size_name} key={size.size_id}>{size.size_name}</option>)}
                                        </select>
                                    </div>
                                }
                                {item.available_colors.length === 0
                                    ? ""
                                    : <div className='product-item__select'>
                                        <select
                                            name="color"
                                            id="color"
                                            defaultValue={item.product_color}
                                            onChange={(e) => setColor(item.id, e.target.value)}
                                        >
                                            {item.available_colors && item.available_colors.map(color => <option value={color.color_name} key={color.color_id}>{color.color_name}</option>)}
                                        </select>
                                    </div>}
                                <div className='controls dec' onClick={() => decrementProduct(item.id)}>–</div>
                                <div>{item.product_amount}</div>
                                <div className='controls inc' onClick={() => incrementProduct(item.id)}>+</div>

                                <div>{item.product_price * item.product_amount}</div>
                                <div onClick={() => removeProduct(item.id)}><button className='delete-btn delete-btn-modal' > <img src="../../icons/delete.png" alt="" /> </button></div>
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
