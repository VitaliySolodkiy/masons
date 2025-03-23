import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import FavoritesContext from '../../../contexts/FavoritesContext';

const Favorites = () => {
    const { favoriteItems, removeFavoriteItem, modalFavoriteClose } = useContext(FavoritesContext);
    console.log(favoriteItems)
    return (
        <div>
            {favoriteItems.length === 0
                ? <p>Favorites list empty. See the <Link to={'/'} state={{ scrollToCatalog: true }} onClick={modalFavoriteClose}> catalog</Link> to add new favorite items.</p>
                : favoriteItems.map(item => (
                    <div key={item.id + item.properties.size + item.properties.color} className="cart-item" >
                        <div className="cart-item__image" >
                            <img src={item.image} alt={item.image} />
                        </div>
                        <div className="cart-item__name"><Link to={`/product/${item.id}`} title={item.name} onClick={modalFavoriteClose} >{item.name}</Link></div>
                        <div ><button className='delete-btn delete-btn-modal' onClick={() => removeFavoriteItem(item)}> <img src="../icons/delete.png" alt="" /> </button></div>
                    </div>
                ))}
        </div>
    );
}

export default Favorites;
