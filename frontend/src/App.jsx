import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Lenis from 'lenis';

// Layout components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

// State
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';

import './index.css';

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
    const { admin } = useAuth();
    if (!admin) return <Navigate to = "/login"
    replace / > ;
    return children;
};

// Layout with conditional navbar/footer
const Layout = ({ children }) => {
    const location = useLocation();
    const hideNavFooter = ['/login', '/dashboard'].includes(location.pathname);

    return ( <
        div style = {
            { display: 'flex', flexDirection: 'column', minHeight: '100vh' } } > {!hideNavFooter && < Navbar / > } <
        main style = {
            { flex: 1 } } > { children } < /main> {!hideNavFooter && < Footer / > } <
        /div>
    );
};

export default function App() {
    return ( <
        AuthProvider >
        <
        CartProvider >
        <
        Router >
        <
        Layout >
        <
        Routes >
        <
        Route path = "/"
        element = { < Home / > }
        /> <
        Route path = "/about"
        element = { < About / > }
        /> <
        Route path = "/menu"
        element = { < Menu / > }
        /> <
        Route path = "/contact"
        element = { < Contact / > }
        /> <
        Route path = "/cart"
        element = { < Cart / > }
        /> <
        Route path = "/login"
        element = { < Login / > }
        /> <
        Route path = "/dashboard"
        element = { < ProtectedRoute > < Dashboard / > < /ProtectedRoute>} / >
            <
            /Routes> <
            /Layout> <
            /Router> <
            /CartProvider> <
            /AuthProvider>
        );
    }