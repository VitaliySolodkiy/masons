import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import "bootstrap/dist/js/bootstrap.min.js";
import CartProvider from './providers/CartProvider';
import AuthUserProvider from './providers/AuthUserProvider';
import FavoritesProvider from './providers/FavoritesProvider';



ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthUserProvider>
            <CartProvider>
                <FavoritesProvider>
                    <App />
                </FavoritesProvider>
            </CartProvider>
        </AuthUserProvider>
    </BrowserRouter>
)