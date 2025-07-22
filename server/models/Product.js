import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  stock: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // References the User model
    required: true,
  },
});

const Product = mongoose.model('Product', productSchema);
export default Product;
