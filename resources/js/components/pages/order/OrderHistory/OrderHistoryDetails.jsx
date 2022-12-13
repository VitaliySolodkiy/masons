import React from 'react';
import OrderDetails from '../../elements/OrderDetails';

const OrderHistoryDetails = () => {

    return (
        <div className='order-history-details'>
            <div className="order-history-details__container _container">
                <OrderDetails enableEditButtons={false} />
            </div>
        </div>
    );
}

export default OrderHistoryDetails;
