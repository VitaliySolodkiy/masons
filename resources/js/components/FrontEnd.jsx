import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';

const FrontEnd = () => {
    return (
        <>
            <Header />
            <div className='main-block p-3'>
                <Sidebar />
                <div className='content'>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default FrontEnd;
