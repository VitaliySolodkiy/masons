import React, { useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import AuthUserContext from '../../../contexts/AuthUserContext';


const OrderThank = () => {
    const { state: { orderId } } = useLocation();
    const [authUser, setAuthUser] = useContext(AuthUserContext);
    return (
        <div className="order-thank">
            <div className="order-thank__container _container">
                <div className="order-thank__title"><h4>Order successfully accepted</h4></div>
                <div className="order-thank__body">
                    <p>You order number is:  {orderId}.</p>
                    {
                        authUser
                            ? <p>Go to the <Link to={"/profile"}>Profile</Link> page to see all you orders and details.</p>
                            : <p><Link to={"/login"}>Login</Link> to see all you orders and details.</p>
                    }

                </div>
            </div>
        </div>

    );
}

export default OrderThank;
