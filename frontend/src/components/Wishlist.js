import React from 'react';
import './WishList.css';

const Wishlist = ({ wishlistItems, setWishlistItems }) => {
    const handleRemoveItem = (itemName) => {
        setWishlistItems(prev => prev.filter(item => item.name !== itemName));
    };

    return (
        <div className="wishlist-container">
            <h2>Your Wishlist</h2>
            {wishlistItems.length === 0 ? (
                <p>Your wishlist is empty.</p>
            ) : (
                <div className="wishlist-items">
                    {wishlistItems.map((item, index) => (
                        <div key={index} className="wishlist-item">
                            <h3>{item.name}</h3>
                            <p>Price: ${item.price.toFixed(2)}</p>
                            <button onClick={() => handleRemoveItem(item.name)}>
                                Remove from Wishlist
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;