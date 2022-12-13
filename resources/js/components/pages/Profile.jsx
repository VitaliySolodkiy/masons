import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import AuthUserContext from '../../contexts/AuthUserContext';
import FavoritesContext from '../../contexts/FavoritesContext';
import { useNavigate, Link } from "react-router-dom";

const Profile = () => {
    const [authUser, setAuthUser] = useContext(AuthUserContext);
    const { favoriteItems, modalFavoriteShow } = useContext(FavoritesContext);
    const [latestOrderItems, setLatestOrderItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getUserOrders();

    }, []);

    const getUserOrders = async () => {
        await axios.get(`/api/user-last-order-products/${authUser.email}`)
            .then(({ data }) => {
                setLatestOrderItems(data);
            });
    }

    const logoutHandler = async () => {
        await axios.post('/api/logout');
        localStorage.removeItem('authUser');
        setAuthUser(null);
        navigate('/');

    }
    return (
        <div className='profile'>
            <div className="profile__container _container">
                <div className="profile__title"><h4>Profile</h4></div>
                <div className="profile__logout-link" ><button onClick={logoutHandler}>Logout</button></div>
                <div className="profile__main">
                    <div className="orders">
                        <button className="profile-btn" onClick={() => navigate('/order-history')}>Orders history</button>

                        <div className="profile-items-list">
                            <p className='profile-items-list__clue'>Items from last order (max. 3 pcs):</p>
                            {latestOrderItems && latestOrderItems.map((item, index) => {
                                if (index < 3) {
                                    return (
                                        <div className="profile-list-item" key={item.id}>
                                            <div className="profile-list-item__image"><img src={item.image} alt="" /></div>
                                            <div className="profile-list-item__info">
                                                <div className="profile-list-item__info-title"><Link to={`/product/${item.id}`}>{item.name}</Link></div>
                                                <div className="profile-list-item__info-price">{item.price} uah</div>
                                            </div>
                                        </div>
                                    )
                                }
                            })}

                        </div>
                    </div>
                    <div className="favorites">
                        <button className="profile-btn" onClick={modalFavoriteShow}>Favorites</button>
                        <div className="profile-items-list">
                            <p className='profile-items-list__clue'>Favorites (max. 3 pcs):</p>
                            {favoriteItems && favoriteItems.map((item, index) => {
                                if (index < 3) {
                                    return (
                                        <div className="profile-list-item" key={item.id}>
                                            <div className="profile-list-item__image"><img src={item.image} alt="" /></div>
                                            <div className="profile-list-item__info">
                                                <div className="profile-list-item__info-title"><Link to={`/product/${item.id}`}>{item.name}</Link></div>
                                                <div className="profile-list-item__info-price">{item.price} uah</div>
                                            </div>
                                        </div>
                                    )
                                }
                            })}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
