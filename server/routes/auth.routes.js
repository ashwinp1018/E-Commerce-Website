import express from "express";
import { register, login } from "../controllers/auth.js";
import User from "../models/User.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Get Profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .populate('products'); // Fetch full product details

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});


// Update Profile
router.put('/profile', verifyToken, async (req, res) => {
  try {
    const { name, profileImage } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, profileImage },
      { new: true, runValidators: true, select: '-password' }
    );

    if (!updatedUser) return res.status(404).json({ error: 'User not found' });

    res.json(updatedUser);
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

export default router;
