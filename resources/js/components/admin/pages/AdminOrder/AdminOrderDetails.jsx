import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'antd';
import EditOrderInfo from './EditOrderInfo';
import EditOrderProducts from './EditOrderProducts';
import moment from 'moment';

const AdminOrderDetails = () => {
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
                setOrderProducts(data.order_products)
            })
    }



    const columns = [
        {
            title: "Product Name",
            dataIndex: "product_name",
            key: "product_name",
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
        <div className='container'>
            <h2 className='my-3'>Order №{id}</h2>
            <hr></hr>
            <h4>Main info:</h4>
            <p><b>Email:</b> {order.user_email}</p>
            <p><b>Phone:</b> {order.user_phone}</p>
            <p><b>Created at:</b> {dateFormat(order.created_at)}</p>
            <p><b>Updated at:</b> {dateFormat(order.updated_at)}</p>

            <EditOrderInfo order={order} setOrder={setOrder} />
            <hr></hr>
            <h4>Order Products:</h4>
            <Table dataSource={orderProducts} columns={columns} rowKey='id'
                footer={() => {
                    const total = orderProducts.reduce((sum, elem) => sum + (elem.product_price * elem.product_amount), 0);
                    return <div className='order-total'><span>Total: {total}</span></div>
                }}
            />
            <EditOrderProducts orderProducts={orderProducts} setOrderProducts={setOrderProducts} />

        </div>
    );
}

export default AdminOrderDetails;
