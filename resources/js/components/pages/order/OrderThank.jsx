import React from 'react';
import { useLocation } from 'react-router-dom'

const OrderThank = () => {
    const { state: { orderId } } = useLocation()
    return (
        <div className='container mt-3'>
            <h5>Thank! You order number is:  {orderId}</h5>

        </div>
    );
}

export default OrderThank;
