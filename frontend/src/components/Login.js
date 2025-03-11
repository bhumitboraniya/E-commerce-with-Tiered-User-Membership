// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // Import the CSS file

const Login = ({ setToken, setIsPrime, setCartItems }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', { username, password });
            setToken(response.data.token);
            setIsPrime(response.data.isPrime);
            alert('Login successful!');

            // Fetch cart items
            // const cartResponse = await axios.get('http://localhost:5000/api/cart', {
            //     headers: { Authorization: `Bearer ${response.data.token}` }
            // });
            // setCartItems(cartResponse.data);

            navigate('/cart'); // Redirect to cart page
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred during login';
            alert(`Error logging in: ${errorMessage}`);
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleLogin}>
                <h2>Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;