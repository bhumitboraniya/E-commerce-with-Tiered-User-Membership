// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserPage from './UserPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Login from './components/Login';
import Cart from './components/Cart';
import PremiumProducts from './components/PremiumProducts';
import Profile from './components/Profile';
import Wishlist from './components/Wishlist';
import './App.css';

const App = () => {
    const [token, setToken] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [isPrime, setIsPrime] = useState(false);

    // Function to add to wishlist
    const addToWishlist = (product) => {
        setWishlistItems(prevItems => {
            const existingItem = prevItems.find(item => item.name === product.name);
            if (!existingItem) {
                return [...prevItems, product];
            }
            return prevItems;
        });
    };

    return (
        <Router>
            <div className="App">
            <Navbar isPrime={isPrime} token={token} handleLogout={() => setToken(null)} />

                <Routes>
                    <Route 
                        path="/" 
                        element={
                            <UserPage 
                                token={token} 
                                setCartItems={setCartItems}
                                setWishlistItems={setWishlistItems}
                            />
                        } 
                    />
                    <Route path="/signup" element={<Signup setIsPrime={setIsPrime} />} />
                    <Route path="/login" element={<Login setToken={setToken} setIsPrime={setIsPrime} />} />
                    <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
                    <Route 
                        path="/premium" 
                        element={
                            <PremiumProducts 
                                token={token} 
                                setCartItems={setCartItems}
                                addToWishlist={addToWishlist}
                            />
                        } 
                    />
                    <Route 
                        path="/profile" 
                        element={
                            <Profile 
                                token={token} 
                                setToken={setToken} 
                                setIsPrime={setIsPrime} 
                            />
                        } 
                    />
                    <Route 
                        path="/wishlist" 
                        element={
                            <Wishlist 
                                wishlistItems={wishlistItems}
                                setWishlistItems={setWishlistItems}
                            />
                        } 
                    />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;