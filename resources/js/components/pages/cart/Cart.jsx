import React, { useContext } from 'react';
import CartContext from '../../../contexts/CartContext';

const Cart = () => {
    const { cartItems, removeCartItem, incrementProduct, decrementProduct } = useContext(CartContext);
    console.log(cartItems)
    return (
        <div>
            {cartItems.map(item => (
                <div key={item.id + item.properties.size + item.properties.color} className="cart-item" >
                    <div className="cart-item__image" >
                        <img src={item.image} alt={item.image} />
                    </div>
                    <div className="cart-item__name">{item.name}</div>
                    {item.properties.color.length > 0 && <div>Color: {item.properties.color}</div>}
                    {item.properties.size.length > 0 && <div>Size: {item.properties.size}</div>}
                    <div className='controls dec' onClick={() => decrementProduct(item)}>–</div>
                    <div>{item.properties.amount}</div>
                    <div className='controls inc' onClick={() => incrementProduct(item)}>+</div>

                    <div>{item.price * item.properties.amount}</div>
                    <div ><a onClick={() => removeCartItem(item)}> <img src="../icons/delete-32.png" alt="" style={{ width: "24px" }} /> </a></div>
                </div>
            ))}
        </div>
    );
}

export default Cart;
