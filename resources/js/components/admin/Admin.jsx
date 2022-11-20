import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

const Admin = () => {
    return (
        <>

            <div className='main-block p-3'>
                <AdminSidebar />
                <div className='content'>
                    <Outlet />
                </div>
            </div>

        </>
    );
}

export default Admin;
