import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';

dotenv.config();

const app = express();
app.use('/api/auth', authRoutes);      
app.use('/api/products', productRoutes); 
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.get('/', (req, res) => res.send('API Running'));

app.listen(5000, () => console.log('Server running on port 5000'));
