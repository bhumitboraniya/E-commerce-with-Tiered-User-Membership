const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./User');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/products', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Middleware to authenticate user
const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Access denied.');

    jwt.verify(token, 'your_jwt_secret', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Product Schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String },
    sku: { type: String, unique: true },
    stockQuantity: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviews: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        reviewText: { type: String },
        rating: { type: Number }
    }],
    discount: { type: Number, default: 0 },
    trending: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    returnPolicy: { type: String },
    shippingInfo: { type: String },
    subscriptionOptions: { type: Boolean, default: false }
});

const Product = mongoose.model('Product', productSchema);

// Signup Route
app.post('/api/signup', async (req, res) => {
    const { username, password, primeCode } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const isPrime = primeCode === 'MAQ';

    const newUser = new User({ username, password: hashedPassword, isPrime });
    try {
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Login Route
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        const token = jwt.sign({ id: user._id, isPrime: user.isPrime }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token, isPrime: user.isPrime, cart: user.cart }); // Return cart data
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
});

// Protected Route Example
app.get('/api/protected', authenticate, (req, res) => {
    res.send('This is a protected route');
});

// Get Products Route
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get User Info Route
app.get('/api/user', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password from response
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user info' });
    }
});

// Add to Cart Route
app.post('/api/add-to-cart', authenticate, async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        const user = await User.findById(req.user.id);
        const itemIndex = user.cart.findIndex(item => item.productId.toString() === productId);

        if (itemIndex > -1) {
            user.cart[itemIndex].quantity += quantity;
        } else {
            user.cart.push({ productId, quantity });
        }

        await user.save();
        res.status(200).json(user.cart);
    } catch (error) {
        res.status(500).json({ message: 'Error adding to cart', error });
    }
});

// Remove from Cart Route
app.post('/api/remove-from-cart', authenticate, async (req, res) => {
    const { productId } = req.body;
    try {
        const user = await User.findById(req.user.id);
        user.cart = user.cart.filter(item => item.productId.toString() !== productId);
        await user.save();
        res.status(200).json(user.cart);
    } catch (error) {
        res.status(500).json({ message: 'Error removing from cart', error });
    }
});

// Get Cart Route
app.get('/api/cart', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('cart.productId');
        res.status(200).json(user.cart);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart', error });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});