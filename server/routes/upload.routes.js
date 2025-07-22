import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer setup (storing file in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload Endpoint
router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("File received:", req.file.originalname);

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      { folder: "ecommerce-products" },
      (error, uploadResult) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return res.status(500).json({ error: "Cloudinary upload failed" });
        }
        return res.json({ url: uploadResult.secure_url });
      }
    );

    // Pipe the buffer to Cloudinary
    result.end(req.file.buffer);
  } catch (err) {
    console.error("Upload route error:", err);
    res.status(500).json({ error: "Image upload failed", details: err.message });
  }
});

export default router;
