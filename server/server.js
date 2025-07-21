import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cartRoutes from './routes/cart.routes.js';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import uploadRoutes from './routes/upload.routes.js';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use('/api/cart', cartRoutes);
app.use('/api', uploadRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);


app.get('/', (req, res) => res.send('API Running'));


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => {
  console.error('MongoDB connection error:', err.message);
});
