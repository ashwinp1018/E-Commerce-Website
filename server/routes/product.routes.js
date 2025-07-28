import express from 'express';
import Product from '../models/Product.js';
import { verifyToken } from '../middleware/verifyToken.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Get products - logged-in users won't see their own products
router.get('/', async (req, res) => {
  try { 
   let userId = null;

    // Check if token is provided (user logged in)
    if (req.headers.authorization) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.id;
      } catch (err) {
        console.warn('Invalid or missing token. Returning all products.');
      }
    }

    // Filter out user's own products if logged in
    const query = userId ? { user: { $ne: userId } } : {};
    const products = await Product.find(query);

    res.json(products);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Add product (requires login)
router.post('/', verifyToken, async (req, res) => {
  try {
    // Fetch the logged-in user's details
    const user = await User.findById(req.user.id);

    // Restrict product addition to only the specific email
    if (!user || user.email !== 'ashwinparashar1018@gmail.com') {
      return res.status(403).json({ error: 'You are not allowed to add products.' });
    }

    const product = new Product({
      ...req.body,
      user: req.user.id, // Save which user added the product
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error('Create error:', err);
    res.status(500).json({ error: 'Failed to add product', details: err.message });
  }
});

export default router;
