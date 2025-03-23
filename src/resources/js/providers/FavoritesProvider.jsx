// HOC - hight order component (компонет высшего порядка - комонент, который в параметрах принимает другой компонент и возвращает новый компонент)

import { useEffect, useReducer, useState } from "react";
import FavoritesContext from "../contexts/FavoritesContext";
import FavoritesReducer from "../reducers/FavoritesReducer";

const FavoritesProvider = ({ children }) => { /* сюда принимаем компонент App, в свойстве children */

    const initialValues = { favorites: (JSON.parse(localStorage.getItem('favorites')) || []) };
    const [state, dispatch] = useReducer(FavoritesReducer, initialValues);

    //====управление модальным окном=====
    const [showFavoriteModalState, setShow] = useState(false);
    const modalFavoriteClose = () => setShow(false);
    const modalFavoriteShow = () => setShow(true);
    //===========//==========

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(state.favorites))
    }, [state]);

    const value = {
        favoriteItems: state.favorites,
        addFavoriteItem: (product) => {
            dispatch({ type: "addFavorite", product });
        },
        removeFavoriteItem: (product) => {
            dispatch({ type: "removeFavorite", product });
        },
        clearFavorite: () => {
            dispatch({ type: "clearFavorite" });
        },
        modalFavoriteClose,
        modalFavoriteShow,
        showFavoriteModalState,
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    )

}

export default FavoritesProvider;