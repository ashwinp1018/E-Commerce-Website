import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  profileImage: {
    type: String,
    default: '',
  },
  password: String,
  role: { type: String, default: 'User' },

  // Array of product references
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Refers to the Product model
    },
  ],
});

export default mongoose.model('User', userSchema);
