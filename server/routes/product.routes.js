import express from 'express';
import Product from '../models/Product.js';
import User from '../models/User.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

// Fetch all products with user details
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('user', 'name email');
    res.json(products);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Create a product linked to the logged-in user
router.post('/', verifyToken, async (req, res) => {
  try {
    console.log('Request body:', req.body);

    const product = new Product({
      ...req.body,
      user: req.user.id, // Attach logged-in user ID
    });

    await product.save();

    // Push product ID to the user's products array
    await User.findByIdAndUpdate(req.user.id, {
      $push: { products: product._id },
    });

    res.status(201).json(product);
  } catch (err) {
    console.error('Create error:', err);
    res.status(500).json({ error: 'Failed to add product', details: err.message });
  }
});

export default router;
