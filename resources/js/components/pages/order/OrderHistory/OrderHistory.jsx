import React, { useContext, useEffect, useState } from 'react';
import AuthUserContext from '../../../../contexts/AuthUserContext';
import getColumns from './columns';
import { Table } from 'antd';


const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [authUser, setAuthUser] = useContext(AuthUserContext);

    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = async () => {
        const response = await axios.get(`/api/user-orders/${authUser.email}`);
        setOrders(response.data);
        console.log(response.data);

    }

    return (
        <div className='order-history'>
            <div className="order-history__container _container">
                <div className="order-history__title"><h4>Order History</h4></div>
                <Table dataSource={orders} columns={getColumns()} rowKey='id' />

            </div>
        </div>
    );
}

export default OrderHistory;
