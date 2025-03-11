import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Product = ({ product, token, setCartItems, setWishlistItems }) => {
    const navigate = useNavigate();

    const handleAddToCart = () => {
        if (!token) {
            alert('Please log in to add items to your cart.');
            navigate('/login');
        } else {
            setCartItems(prevItems => {
                const existingItem = prevItems.find(item => item.name === product.name);
                if (existingItem) {
                    return prevItems.map(item =>
                        item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
                    );
                } else {
                    return [...prevItems, { ...product, quantity: 1 }];
                }
            });
            alert(`${product.name} added to cart!`);
        }
    };
    const handleAddToWishlist = () => {
        if (!token) {
            alert('Please log in to add items to your wishlist.');
            navigate('/login');
        } else {
            setWishlistItems(prevItems => {
                const existingItem = prevItems.find(item => item.name === product.name);
                if (!existingItem) {
                    return [...prevItems, product];
                }
                return prevItems;
            });
            alert(`${product.name} added to wishlist!`);
        }
    };

    return (
        <div className="product">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>Brand: {product.brand}</p>
            <p>Category: {product.category}</p>
            <p>Rating: {product.rating} ⭐</p>
            <p>Stock: {product.stockQuantity} available</p>
            {product.discount > 0 && <p>Discount: {product.discount}% off</p>}
            <div className="product-buttons">
                <button onClick={handleAddToCart}>Add to Cart</button>
                <button onClick={handleAddToWishlist}>Add to Wishlist</button>
            </div>
        </div>
    );
};

export default Product;