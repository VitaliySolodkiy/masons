import React from 'react';

import OrderDetails from '../../../pages/elements/OrderDetails';

const AdminOrderDetails = () => {

    return (
        <div className='container'>
            <OrderDetails enableEditButtons={true} />
        </div>
    );
}

export default AdminOrderDetails;
