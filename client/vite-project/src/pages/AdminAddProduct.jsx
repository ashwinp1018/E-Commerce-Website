import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import toast from 'react-hot-toast';

const AdminAddProduct = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    images: [],
    category: '',
    stock: '',
  });
  const [uploading, setUploading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();

  // Check authorization
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You must be logged in to access this page.');
      navigate('/login');
      return;
    }

    // Fetch profile to check email
    API.get('/auth/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.data.email === 'ashwinparashar1018@gmail.com') {
          setIsAuthorized(true);
        } else {
          toast.error('You are not authorized to add products.');
        }
      })
      .catch(() => {
        toast.error('Failed to verify user.');
        navigate('/login');
      });
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.images.length === 0) {
      toast.error('Please upload at least one image.');
      return;
    }

    try {
      await API.post('/products', form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      toast.success('✅ Product added successfully');
      setForm({
        name: '',
        description: '',
        price: '',
        images: [],
        category: '',
        stock: '',
      });
    } catch (err) {
      console.error('Error while submitting product:', err);
      toast.error('❌ Failed to add product');
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const data = new FormData();
    data.append('file', file);

    setUploading(true);
    try {
      const res = await API.post('/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setForm((prev) => ({
        ...prev,
        images: [...prev.images, res.data.url],
      }));
      toast.success('✅ Image uploaded successfully');
    } catch (err) {
      console.error(err);
      toast.error('❌ Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      acceptedFiles.forEach((file) => uploadImageToCloudinary(file));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  if (!isAuthorized) {
    return (
      <div className="max-w-xl mx-auto p-8 mt-24 text-center border border-black bg-white shadow-lg">
        <h1 className="text-2xl font-bold text-black mb-4">
          You are not authorized to add products.
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 mt-24 border border-black bg-white shadow-lg">
      <h1 className="text-3xl font-bold text-center text-black mb-8 border-b border-black pb-3">
        Add New Product
      </h1>

      {/* Layout */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Details */}
        <form onSubmit={handleSubmit} className="flex-1 space-y-4 border border-black p-4">
          {['name', 'description', 'price', 'category', 'stock'].map((field) => (
            <div key={field} className="flex flex-col">
              <label
                htmlFor={field}
                className="mb-1 font-semibold text-black capitalize"
              >
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

        {/* Image Upload */}
        <div className="flex-1 border border-black p-4 flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold mb-4">Upload Product Images</h2>
          {form.images.length > 0 && (
            <div className="mb-4 w-full grid grid-cols-2 gap-2">
              {form.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Preview ${idx + 1}`}
                  className="w-full h-32 object-cover border border-black shadow-md"
                />
              ))}
            </div>
          )}
          <div
            {...getRootProps()}
            className={`w-full border-2 border-dashed p-6 text-center cursor-pointer transition ${
              isDragActive ? 'border-black bg-gray-100' : 'border-gray-400'
            }`}
          >
            <input {...getInputProps()} />
            {uploading ? (
              <p className="text-gray-600">Uploading...</p>
            ) : (
              <p className="text-gray-600">
                Drag & drop images here, or click to select
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAddProduct;
