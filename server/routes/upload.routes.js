import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'products', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const upload = multer({ storage });

// Upload route
router.post('/upload', upload.single('file'), (req, res) => {
  try {
    return res.json({ url: req.file.path });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Image upload failed' });
  }
});

export default router;
