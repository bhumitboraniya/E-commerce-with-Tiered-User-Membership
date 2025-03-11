// src/components/PremiumProducts.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Product from './Product';

const PremiumProducts = ({ token, setCartItems }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                // Apply a 20% discount to all products for premium users
                const premiumProducts = response.data.map(product => ({
                    ...product,
                    price: product.price * 0.8 // Apply 20% discount
                }));
                setProducts(premiumProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="premium-products">
            <h1>Premium Products</h1>
            <div className="product-list">
                {products.length > 0 ? (
                    products.map(product => (
                        <Product key={product._id} product={product} token={token} setCartItems={setCartItems} />
                    ))
                ) : (
                    <p>No premium products available.</p>
                )}
            </div>
        </div>
    );
};

export default PremiumProducts;