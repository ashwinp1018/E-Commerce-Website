import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: [String], default: [] }, // Store multiple images
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to user
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
