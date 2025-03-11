// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css'; // Import the CSS file

const Profile = ({ token, setToken, setIsPrime }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/user', {
                    headers: {
                        Authorization: `Bearer ${token}` // Include the token in the request headers
                    }
                });
                setUserInfo(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user info:', error);
                setLoading(false);
            }
        };

        if (token) {
            fetchUserInfo();
        }
    }, [token]);

    const handleLogout = () => {
        setToken(null); // Clear the token
        setIsPrime(false); // Reset premium status
        alert('You have been logged out.');
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!userInfo) {
        return <p>Please log in to view your profile.</p>;
    }

    return (
        <div className="profile">
            <h2>User Profile</h2>
            <p><strong>Username:</strong> {userInfo.username}</p>
            <p><strong>Premium User:</strong> {userInfo.isPrime ? 'Yes' : 'No'}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Profile;