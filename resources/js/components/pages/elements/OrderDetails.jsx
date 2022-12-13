import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Table } from 'antd';
import moment from 'moment';
import EditOrderInfo from '../../admin/pages/AdminOrder/EditOrderInfo';
import EditOrderProducts from '../../admin/pages/AdminOrder/EditOrderProducts';


const OrderDetails = ({ enableEditButtons }) => {
    const { id } = useParams();
    const [order, setOrder] = useState([]);
    const [orderProducts, setOrderProducts] = useState([]);

    useEffect(() => {
        getOrderData();

    }, [id]);

    const getOrderData = () => {
        axios.get(`/api/order-details/${id}`)
            .then(({ data }) => {
                setOrder(data);
                setOrderProducts(data.order_products);
                console.log(data)
            })
    }

    const columns = [
        {
            title: "Product Name",

            key: "product_name",
            render: (orderProducts) => <Link to={`/product/${orderProducts.product_id}`}>{orderProducts.product_name}</Link>
        },
        {
            title: "Size",
            dataIndex: "product_size",
            key: "product_size",
        },
        {
            title: "Color",
            dataIndex: "product_color",
            key: "product_color",
        },
        {
            title: "Price",
            dataIndex: "product_price",
            key: "product_price",
        },
        {
            title: "Quantity",
            dataIndex: "product_amount",
            key: "product_amount",
        },
        {
            title: "Total",
            key: "total",
            render: (orderProducts) => orderProducts.product_price * orderProducts.product_amount
        },

    ];

    const dateFormat = (str = '') => {
        return moment(str).utc().format("YYYY-MM-DD, HH:mm:ss")
    }

    return (
        <>
            <div className="order-history-details__title"><h4>Order №{order.id} details</h4></div>

            <hr></hr>
            <div className="order-history-details__main-info">
                <h5>Main info:</h5>
                <p><b>Name:</b> <span>{order.user_name}</span></p>
                <p><b>Email:</b> <span>{order.user_email}</span></p>
                <p><b>Phone:</b> <span>{order.user_phone}</span></p>
                <p><b>City:</b> <span>{order.user_city}</span></p>
                <p><b>Payment method:</b> <span>{order.payment_method}</span></p>
                <p><b>Delivery method:</b> <span>{order.delivery_method} {order?.post_office ? `(post office: ${order.post_office})` : ''}</span></p>
                <p><b>Created at:</b> <span>{dateFormat(order.created_at)}</span></p>
            </div>
            {
                enableEditButtons === false
                    ? ''
                    : <EditOrderInfo order={order} setOrder={setOrder} />
            }
            <hr></hr>
            <div className="order-history-details__order-products">
                <h5>Order Products:</h5>
                <Table dataSource={orderProducts} columns={columns} rowKey='id'
                    footer={() => {
                        const total = orderProducts.reduce((sum, elem) => sum + (elem.product_price * elem.product_amount), 0);
                        return <div className='order-total'><span>Total: {total}</span></div>
                    }}
                />
                {
                    enableEditButtons === false
                        ? ''
                        : <EditOrderProducts orderProducts={orderProducts} setOrderProducts={setOrderProducts} />
                }
            </div>
        </>
    );
}

export default OrderDetails;