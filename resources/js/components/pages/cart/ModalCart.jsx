import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import CartContext from '../../../contexts/CartContext';

const ModalCart = () => {
    const { cartItems, removeCartItem, incrementProduct, decrementProduct, modalClose } = useContext(CartContext);

    return (
        <div>
            {cartItems.map(item => (
                <div key={item.id + item.properties.size + item.properties.color} className="cart-item" >
                    <div className="cart-item__image" >
                        <img src={item.image} alt={item.image} />
                    </div>
                    <div className="cart-item__name"><Link to={`/product/${item.id}`} onClick={modalClose}>{item.name}</Link></div>
                    {item.properties.color.length > 0 && <div>Color: {item.properties.color}</div>}
                    {item.properties.size.length > 0 && <div>Size: {item.properties.size}</div>}
                    <div className='controls dec' onClick={() => decrementProduct(item)}>–</div>
                    <div>{item.properties.amount}</div>
                    <div className='controls inc' onClick={() => incrementProduct(item)}>+</div>

                    <div>{item.price * item.properties.amount}</div>
                    <div ><button className='delete-btn delete-btn-modal' onClick={() => removeCartItem(item)}> <img src="../icons/delete.png" alt="" /> </button></div>
                </div>
            ))}
        </div>
    );
}

export default ModalCart;
