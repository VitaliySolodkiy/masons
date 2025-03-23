import React, { useContext } from 'react';
import CartContext from '../../../contexts/CartContext';
import Button from 'react-bootstrap/Button';

const MiniCart = () => {
    const { cartItems, modalShow } = useContext(CartContext);
    return (
        <div>
            {cartItems.map(item => (
                <div key={item.id + item.properties.size + item.properties.color} className="mini-cart-item" >
                    <div>
                        <img src={item.image} alt={item.image} />
                    </div>
                    <div>{item.name}</div>
                    <div>{item.properties.amount}</div>
                    <div>{item.price * item.properties.amount}</div>

                </div>
            ))}
            <Button variant="secondary" onClick={() => modalShow()}>Edit Cart</Button>
        </div>
    );
}

export default MiniCart;
