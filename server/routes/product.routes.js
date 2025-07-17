import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

router.post('/', async (req, res) => {
  try {
    console.log('Request body:', req.body); // debug
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error('Create error:', err);
    res.status(500).json({ error: 'Failed to add product', details: err.message });
  }
});

export default router;
