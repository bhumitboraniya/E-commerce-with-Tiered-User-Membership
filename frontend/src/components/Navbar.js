import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isPrime, token, handleLogout }) => { 
    const navigate = useNavigate();

    const handleAuthAction = () => {
        if (token) {
            handleLogout(); // Logout user
            navigate('/login'); // Redirect to login page
        } else {
            navigate('/login'); // Navigate to login page if not logged in
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">E-Commerce</Link>
            </div>
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/shop">Shop</Link></li>
                <li><Link to="/cart">Cart</Link></li>
                {isPrime && <li><Link to="/premium">Premium Deals</Link></li>}
                <li><Link to="/wishlist">Wishlist</Link></li>

                {/* Corrected button for login/logout */}
                <li>
                    <a onClick={handleAuthAction}>
                        {token ? 'Logout' : 'Login'}
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
