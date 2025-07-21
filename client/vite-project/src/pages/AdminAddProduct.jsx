import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import API from '../api/axios';
import toast from 'react-hot-toast';

const AdminAddProduct = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    stock: '',
  });
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/products', form);
      toast.success('✅ Product added successfully');
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
      toast.error('❌ Failed to add product');
    }
  };

  // Upload to Cloudinary
  const uploadImageToCloudinary = async (file) => {
    const data = new FormData();
    data.append('file', file);

    setUploading(true);
    try {
      const res = await API.post('/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setForm((prev) => ({ ...prev, image: res.data.url }));
      toast.success('✅ Image uploaded successfully');
    } catch (err) {
      console.error(err);
      toast.error('❌ Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  // Dropzone
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles[0]) {
      uploadImageToCloudinary(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="max-w-2xl mx-auto p-6 mt-24 border border-black bg-white shadow-lg">
      <h1 className="text-3xl font-bold text-center text-black mb-6 border-b border-black pb-3">
        Add New Product
      </h1>

      {/* Image Preview */}
      {form.image && (
        <div className="mb-4 flex justify-center">
          <img
            src={form.image}
            alt="Preview"
            className="w-40 h-40 object-cover border border-black shadow-md"
          />
        </div>
      )}

      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`mb-4 border-2 border-dashed p-6 text-center cursor-pointer transition ${
          isDragActive ? 'border-black bg-gray-100' : 'border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <p className="text-gray-600">Uploading...</p>
        ) : (
          <p className="text-gray-600">
            Drag & drop an image here, or click to select
          </p>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {['name', 'description', 'price', 'category', 'stock'].map((field) => (
          <div key={field} className="flex flex-col">
            <label htmlFor={field} className="mb-1 font-semibold text-black capitalize">
              {field}
            </label>
            <input
              id={field}
              name={field}
              type={field === 'price' || field === 'stock' ? 'number' : 'text'}
              placeholder={`Enter ${field}`}
              value={form[field]}
              onChange={handleChange}
              className="border border-black px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black transition"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-black text-white py-3 font-semibold hover:bg-gray-800 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AdminAddProduct;
