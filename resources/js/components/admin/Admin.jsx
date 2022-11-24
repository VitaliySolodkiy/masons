import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
// import 'antd/dist/antd.css';

const Admin = () => {
    return (
        <>

            <div className='main-block main-block-admin p-3'>
                <AdminSidebar />
                <div className='content'>
                    <Outlet />
                </div>
            </div>

        </>
    );
}

export default Admin;
