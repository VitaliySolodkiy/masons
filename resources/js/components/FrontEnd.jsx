import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

const FrontEnd = () => {
    return (
        <>
            <Header />
            <div className='main-block'>
                <Outlet />
            </div>
            <Footer />
        </>
    );
}

export default FrontEnd;
