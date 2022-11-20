import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CartContext from '../contexts/CartContext';
import Cart from "./pages/cart/Cart";
import { Link } from "react-router-dom";
import AuthUserContext from '../contexts/AuthUserContext';
import UserMenu from './UserMenu';
import Search from './Search';

const Header = () => {
    const { cartItems, modalClose, modalShow, showModalState } = useContext(CartContext);
    const [categories, setCategories] = useState([]);
    const [authUser, setAuthUser] = useContext(AuthUserContext);

    useEffect(() => {
        getHeaderData();
    }, []);

    const getHeaderData = async () => {
        await axios.get('/api/home')
            .then(({ data }) => {
                setCategories(data.categories);

            })
    }


    const totalSum = () => cartItems.reduce((sum, item) => sum + item.price * item.amount, 0);
    const isCartEmpty = () => cartItems.length === 0 ? true : false;

    const cartFooter = (isCartEmpty) => {
        if (isCartEmpty) {
            return (<p>Cart empty. You can go to <Link to="/" onClick={modalClose}>
                catalog
            </Link> and select products to buy</p>)
        }
        else {
            return (<>
                <p>Total: {totalSum()}</p>
                <Link to="/order" className='btn btn-primary' onClick={modalClose}>
                    Place Order
                </Link>
            </>)
        }
    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link to="/" className='navbar-brand' >MySite</Link>
                    <button className="navbar-toggler me-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarSupportedContent">

                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Catalog
                                </a>
                                <ul className="dropdown-menu">
                                    {categories.map((category) => {
                                        return <li key={category.id}>
                                            <Link to={`/category/${category.id}`} className='dropdown-item' onClick={modalClose}>
                                                {category.name}
                                            </Link>
                                        </li>
                                    })}
                                </ul>
                            </li>
                        </ul>
                        <ul className="navbar-nav me-3 mb-2 mb-lg-0 justify-content-end col">
                            <UserMenu />
                        </ul>
                        <Search />
                    </div>

                    <Button variant="warning" onClick={modalShow} className="cart-btn">
                        <img className='cart-img' src="../icons/shopping-cart.png" alt="" />
                        {!isCartEmpty() ? <small>{cartItems.length}</small> : ''}
                    </Button>

                </div>
            </nav>


            <Modal show={showModalState} onHide={modalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cart</Modal.Title>
                </Modal.Header>
                {!isCartEmpty()
                    ? <Modal.Body>
                        <Cart />
                    </Modal.Body>
                    : ''}

                <Modal.Footer>
                    {cartFooter(isCartEmpty())}
                </Modal.Footer>
            </Modal>
        </header >
    );
}

export default Header;
