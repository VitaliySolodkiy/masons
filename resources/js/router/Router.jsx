import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthUserContext from '../contexts/AuthUserContext';
import FrontEnd from '../components/FrontEnd';
import Home from '../components/pages/Home';
import Category from '../components/pages/Category';
import Product from '../components/pages/Product';
import Order from '../components/pages/order/Order';
import OrderThank from '../components/pages/order/OrderThank';
import Login from '../components/pages/Login';
import Registration from '../components/pages/Registration';
import NotFound from '../components/pages/NotFound';
import AdminCategory from '../components/admin/pages/AdminCategory/AdminCategory';
import Admin from '../components/admin/Admin';
import AdminHome from '../components/admin/pages/AdminHome';
import AdminProduct from '../components/admin/pages/AdminProduct/AdminProduct';
import AdminOrder from '../components/admin/pages/AdminOrder/AdminOrder'
import AdminOrderDetails from '../components/admin/pages/AdminOrder/AdminOrderDetails';
import SearchResult from '../components/pages/SearchResult';
import AdminReview from '../components/admin/pages/AdminReview/AdminReview';

const Router = () => {
    const [authUser] = useContext(AuthUserContext);
    const adminRoutes = () =>
        authUser?.role !== 'admin' ? (
            ''
        ) : (
            <Route path="/admin" element={<Admin />} >
                <Route path="" element={<AdminHome />} />
                <Route path="categories" element={<AdminCategory />} />
                <Route path="products" element={<AdminProduct />} />
                <Route path="orders" element={<AdminOrder />} />
                <Route path="orders/:id" element={<AdminOrderDetails />} />
                <Route path="reviews" element={<AdminReview />} />
            </Route>
        );


    return (
        <Routes>
            <Route path="/" element={<FrontEnd />} >
                <Route path="/" element={<Home />} />
                <Route path="/category/:id/*" element={<Category />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/order" element={<Order />} />
                <Route path="/order-thank" element={<OrderThank />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/search" element={<SearchResult />} />
            </Route>
            {adminRoutes()}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default Router;
