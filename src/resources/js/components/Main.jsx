import React from 'react';
import Router from '../router/Router';
import Sidebar from './Sidebar';

const Main = () => {
    return (
        <div className='main-block p-3'>
            <Sidebar />
            <div className='content'>
                <Router />
            </div>
        </div>
    );
}

export default Main;
