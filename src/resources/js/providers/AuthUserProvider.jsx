import React, { useState } from 'react';
import AuthUserContext from '../contexts/AuthUserContext';

const AuthUserProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('authUser')));

    return (
        <AuthUserContext.Provider value={[authUser, setAuthUser]}>
            {children}
        </AuthUserContext.Provider>
    );
}

export default AuthUserProvider;
