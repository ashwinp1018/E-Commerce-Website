import { useState } from 'react';
import API from '../api/axios';
import toast from 'react-hot-toast';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error('❌ Passwords do not match!');
      return;
    }

    setLoading(true);
    try {
      const res = await API.post('/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      toast.success('✅ Registration successful! Please log in.');
      setForm({ name: '', email: '', password: '', confirmPassword: '' });
    } catch (err) {
      console.error(err);
      toast.error('❌ Registration failed! Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen pt-10  px-4">
      <div className="w-full max-w-lg bg-white border border-black shadow-lg p-8">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-black border-b border-black pb-2">
          Create Account
        </h2>
        <form onSubmit={handleRegister} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-black font-semibold mb-1" htmlFor="name">
              Username
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="block border border-black w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition"
              placeholder="Enter your username"
              type="text"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-black font-semibold mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="block border border-black w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition"
              placeholder="Enter your email"
              type="email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-black font-semibold mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="block border border-black w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition"
              placeholder="Enter your password"
              type="password"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-black font-semibold mb-1" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="block border border-black w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition"
              placeholder="Re-enter your password"
              type="password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 font-semibold hover:bg-gray-800 transition disabled:opacity-60"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        {/* Additional Links */}
        <div className="text-center mt-6 text-sm text-gray-700">
          <p>
            Already have an account?{' '}
            <a href="/login" className="text-black font-bold hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
