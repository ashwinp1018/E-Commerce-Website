import { useState } from 'react';
import API from '../api/axios';

const AdminAddProduct = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    stock: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/products', form);
      alert('✅ Product added successfully');
      setForm({
        name: '',
        description: '',
        price: '',
        image: '',
        category: '',
        stock: '',
      });
    } catch (err) {
      console.error(err);
      alert('❌ Failed to add product');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border p-2 w-full" />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border p-2 w-full" />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} className="border p-2 w-full" />
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} className="border p-2 w-full" />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} className="border p-2 w-full" />
        <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} className="border p-2 w-full" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AdminAddProduct;
