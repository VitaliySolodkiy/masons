import React, { useContext, useEffect, useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
import { Modal, Button } from 'antd';
import CartContext from '../contexts/CartContext';
import FavoritesContext from '../contexts/FavoritesContext';
import ModalCart from "./pages/cart/ModalCart";
import { Link } from "react-router-dom";
import AuthUserContext from '../contexts/AuthUserContext';
import UserMenu from './UserMenu';
import Search from './Search';
import Favorites from './pages/favorites/Favorites';


const Header = (props) => {
    const { cartItems, modalClose, modalShow, showModalState } = useContext(CartContext);
    const { favoriteItems, modalFavoriteClose, modalFavoriteShow, showFavoriteModalState } = useContext(FavoritesContext);
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


    const totalSum = () => cartItems.reduce((sum, item) => sum + item.price * item.properties.amount, 0);
    const isCartEmpty = () => cartItems.length === 0 ? true : false;
    const isFavoriteEmpty = () => favoriteItems.length === 0 ? true : false;

    const cartFooter = (isCartEmpty) => {
        if (isCartEmpty) {
            return (<p>Cart empty. You can go to <Link to={'/'} state={{ scrollToCatalog: true }} onClick={modalClose}> catalog</Link> and select products to buy</p>)
        }
        else {
            return (<div className='cart-item__footer'>
                <p>Total: {totalSum()}</p>
                <Button>
                    <Link to="/order" onClick={modalClose}> Place Order</Link>
                </Button>
            </div>)
        }
    }

    return (
        <>
            <header className="header">
                <div className="header__container _container">
                    <div className="header-logo">
                        <div className="header-logo__search">
                            <form action="">
                                <span className="search-icon"><img src="../icons/search.png" alt="" /></span>
                                <input type="search" name="q" id="search" placeholder="search" />
                            </form>
                        </div>
                        <div className="header-logo__logo">
                            <Link to="/" className='navbar-brand' ><img src="../images/logo.png" alt="" /></Link>
                        </div>
                        <div className="header-logo__user-panel">
                            <ul>
                                <li><button onClick={modalShow}><img src="../icons/cart.svg" alt="" />{!isCartEmpty() ? <small>{cartItems.length}</small> : ''}</button></li>
                                <li><button onClick={modalFavoriteShow}><img src="../icons/favorites.svg" alt="" />{!isFavoriteEmpty() ? <small>{favoriteItems.length}</small> : ''}</button></li>
                                <li className='user-panel-dropdown'><img src="../icons/user.png" alt="" />{/* <Link to={"/admin"}><img src="../icons/user.png" alt="" /></Link> */}
                                    <ul className='user-panel-dropdown-menu'>
                                        <UserMenu />
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div className="header-menu">
                            <ul className="header-menu__main-list">
                                <li className='header-menu__item header-menu__dropdown' ><Link to={'/'} state={{ scrollToCatalog: true }}>Catalog</Link>
                                    <ul className='header-menu__dropdown-menu'>
                                        {categories.map((category) => {
                                            return <li key={category.id} className="header-menu__dropdown-menu-item">
                                                <Link to={`/category/${category.id}`} title={category.name} onClick={modalClose}>
                                                    {category.name}
                                                </Link>

                                            </li>
                                        })}
                                    </ul>

                                </li>
                                <li className='header-menu__item'><a href="" title="About Us">About Us</a></li>
                                <li className='header-menu__item'><a href="" title="Delivery">Delivery</a></li>
                            </ul>
                        </div>
                    </div>

                </div>

                {/*                 <Modal show={showModalState} onHide={modalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cart</Modal.Title>
                    </Modal.Header>
                    {!isCartEmpty()
                        ? <Modal.Body>
                            <ModalCart />
                        </Modal.Body>
                        : ''}

                    <Modal.Footer>
                        {cartFooter(isCartEmpty())}
                    </Modal.Footer>
                </Modal> */}

                <Modal
                    open={showModalState}
                    title="Cart"
                    onOk={modalClose}
                    onCancel={modalClose}
                    footer={null}
                    width={700}
                >
                    {!isCartEmpty()
                        ?
                        <ModalCart />

                        : ''}
                    {cartFooter(isCartEmpty())}
                </Modal>


                <Modal
                    title="Favorites"
                    open={showFavoriteModalState}
                    onCancel={modalFavoriteClose}
                    onOk={modalFavoriteClose}
                    footer={null}
                    width={700}>
                    <Favorites />
                </Modal>
            </header>
        </>
    );
}

export default Header;
