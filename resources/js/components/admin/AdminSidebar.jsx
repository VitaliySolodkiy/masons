import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
    return (
        <div className='sidebar'>
            <h2 className='my-3'>Admin Sidebar</h2>
            <div className="list-group">
                <Link to={`/admin`} className="list-group-item list-group-item-action " >Home</Link>
                <Link to={`/admin/categories`} className="list-group-item list-group-item-action" >Categories</Link>
                <Link to={`/admin/products`} className="list-group-item list-group-item-action" >Products</Link>
                <Link to={`/admin/orders`} className="list-group-item list-group-item-action" >Orders</Link>

            </div >
            {/* <a href="/">Back to site</a> */}
            <Link to={`/`} className="" >Back to site</Link>
        </div >
    );
}

export default AdminSidebar;
