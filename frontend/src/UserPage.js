
// src/UserPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Product from './components/Product';
import './UserPage.css'; // Import the CSS file

const UserPage = ({ token, setCartItems, setWishlistItems }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [trendingProducts, setTrendingProducts] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                setProducts(response.data);

                // Filter trending and featured products
                const trending = response.data.filter(product => product.trending);
                const featured = response.data.filter(product => product.featured);

                setTrendingProducts(trending);
                setFeaturedProducts(featured);
                setFilteredProducts(response.data); // Initialize filtered products
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        filterProducts(e.target.value, selectedCategory, selectedBrand, minPrice, maxPrice);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        filterProducts(searchTerm, e.target.value, selectedBrand, minPrice, maxPrice);
    };

    const handleBrandChange = (e) => {
        setSelectedBrand(e.target.value);
        filterProducts(searchTerm, selectedCategory, e.target.value, minPrice, maxPrice);
    };

    const handlePriceChange = () => {
        filterProducts(searchTerm, selectedCategory, selectedBrand, minPrice, maxPrice);
    };

    const filterProducts = (search, category, brand, min, max) => {
        let filtered = products;

        if (search) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (category) {
            filtered = filtered.filter(product => product.category === category);
        }

        if (brand) {
            filtered = filtered.filter(product => product.brand === brand);
        }

        if (min) {
            filtered = filtered.filter(product => product.price >= min);
        }

        if (max) {
            filtered = filtered.filter(product => product.price <= max);
        }

        setFilteredProducts(filtered);
    };

    return (
        <div className="user-page">
            <h1>Products</h1>

            <div className="filters">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <select value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">All Categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Fitness">Fitness</option>
                </select>
                <select value={selectedBrand} onChange={handleBrandChange}>
                    <option value="">All Brands</option>
                    <option value="AudioTech">AudioTech</option>
                    <option value="TechBrand">TechBrand</option>
                    <option value="RunFast">RunFast</option>
                </select>
                <input
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
                <button onClick={handlePriceChange}>Apply Price Filter</button>
            </div>
            <div className="product-list">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <Product
                            key={product._id}
                            product={product}
                            token={token}
                            setCartItems={setCartItems}
                            setWishlistItems={setWishlistItems}
                        />
                    ))
                ) : (
                    <p>No products available.</p>
                )}
            </div>
            <section className="trending-products">
                <h2>Trending Products</h2>
                <div className="product-list">
                    {trendingProducts.length > 0 ? (
                        trendingProducts.map(product => (
                            <Product
                                key={product._id}
                                product={product}
                                token={token}
                                setCartItems={setCartItems}
                                setWishlistItems={setWishlistItems}
                            />
                        ))
                    ) : (
                        <p>No trending products available.</p>
                    )}
                </div>
            </section>

            <section className="featured-products">
                <h2>Featured Products</h2>
                <div className="product-list">
                    {featuredProducts.length > 0 ? (
                        featuredProducts.map(product => (
                            <Product
                                key={product._id}
                                product={product}
                                token={token}
                                setCartItems={setCartItems}
                                setWishlistItems={setWishlistItems}
                            />
                        ))
                    ) : (
                        <p>No featured products available.</p>
                    )}
                </div>
            </section>

          
        </div>
    );
};

export default UserPage;
