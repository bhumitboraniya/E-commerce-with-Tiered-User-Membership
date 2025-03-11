// src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import './Auth.css'; // Import the CSS file

const Signup = ({ setIsPrime }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [primeCode, setPrimeCode] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/signup', { username, password, primeCode });
            alert(response.data.message);
            // Set isPrime based on the prime code
            if (primeCode === 'MAQ') {
                setIsPrime(true);
            }
            navigate('/login'); // Redirect to login after successful signup
        } catch (error) {
            alert('Error signing up: ' + error.response.data.message);
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSignup}>
                <h2>Signup</h2>
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
                <input
                    type="text"
                    placeholder="Prime Code (if any)"
                    value={primeCode}
                    onChange={(e) => setPrimeCode(e.target.value)}
                />
                <button type="submit">Sign Up</button>
                <p className="login-text">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;
