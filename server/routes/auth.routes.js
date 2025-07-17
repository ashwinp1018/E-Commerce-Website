import express from "express";
import { register, login } from "../controllers/auth.js";
import User from "../models/User.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Register a new user
router.post('/register', register);

// Login user
router.post('/login', login);

// 🔐 Get logged-in user's profile (requires valid token)
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

export default router;
