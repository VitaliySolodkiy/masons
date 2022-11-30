import React, { useContext, useEffect } from 'react';
import AuthUserContext from '../contexts/AuthUserContext';
import axios from 'axios';

import { Link } from "react-router-dom";

const UserMenu = () => {
    const [authUser, setAuthUser] = useContext(AuthUserContext);


    const logoutHandler = async () => {
        await axios.post('/api/logout');
        localStorage.removeItem('authUser');
        setAuthUser(null);
    }

    const component = () => {
        if (authUser) {
            return (
                <>
                    <li /* className="user-panel-dropdown-menu-item" */> Hi, {authUser.name}</li>
                    <li ><Link to="/admin">Admin</Link></li>
                    <li><a onClick={logoutHandler}>Logout</a></li>
                </>
            )
        }

        return (
            <>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li >
                    <Link to="/registration">Registration</Link>
                </li>
            </>
        );
    }

    return component();


}

export default UserMenu;
