// src/components/Cart.js
import React from 'react';
import './Cart.css'; 
const Cart = ({ cartItems, setCartItems }) => {
    const handleRemoveItem = (itemName) => {
        setCartItems(prevItems => prevItems.filter(item => item.name !== itemName));
    };

    const handleIncreaseQuantity = (itemName) => {
        setCartItems(prevItems => 
            prevItems.map(item => 
                item.name === itemName ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const handleDecreaseQuantity = (itemName) => {
        setCartItems(prevItems => 
            prevItems.map(item => 
                item.name === itemName && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
            )
        );
    };

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleBuyNow = () => {
        alert('Proceeding to checkout...');
        // Implement checkout logic here
    };

    return (
        <div className="cart">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <ul>
                        {cartItems.map((item, index) => (
                            <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                                <h3>{item.name}</h3>
                                <p>Price: ${item.price.toFixed(2)}</p>
                                <p>Quantity: {item.quantity}</p>
                                <button onClick={() => handleIncreaseQuantity(item.name)}>+</button>
                                <button onClick={() => handleDecreaseQuantity(item.name)}>-</button>
                                <button onClick={() => handleRemoveItem(item.name)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
                    <button onClick={handleBuyNow}>Buy Now</button>
                </div>
            )}
        </div>
    );
};

export default Cart;