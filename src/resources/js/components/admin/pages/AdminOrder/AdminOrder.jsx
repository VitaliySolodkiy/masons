import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import getColumns from './columns';
import Swal from 'sweetalert2';


const AdminOrder = () => {

    const [orders, setOrders] = useState([]);

    const getOrders = async () => {
        const response = await axios.get('/api/orders');
        setOrders(response.data);

    }

    useEffect(() => {
        getOrders();
    }, []);

    const removeOrder = async (id) => {
        Swal.fire({
            title: `Do you want to delete order №${id}?`,
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {

            if (result.isConfirmed) {
                axios.delete('/api/orders/' + id)
                    .then(({ data }) => {
                        setOrders(orders.filter(o => o.id !== id));
                        Swal.fire({ icon: 'success', title: data.message })
                    });
            }
        })
    }

    return (
        <div className='container'>
            <h2 className='my-3'>Orders</h2>
            <Table dataSource={orders} columns={getColumns(removeOrder)} rowKey='id' />
        </div>
    );
}

export default AdminOrder;
