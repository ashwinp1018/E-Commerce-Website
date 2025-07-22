import { useState } from 'react';
import API from '../api/axios';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/auth/login', { email, password });

      // Store user data
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userEmail', res.data.user.email);
      localStorage.setItem('userName', res.data.user.name);

      toast.success('✅ Logged in successfully!');
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error(err);
      toast.error('❌ Invalid credentials!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="w-full max-w-lg bg-white border border-black shadow-lg p-8 ">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-black border-b border-black pb-2">
          Welcome Back
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-black font-semibold mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block border border-black w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition"
              placeholder="Enter your email"
              type="email"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-black font-semibold mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block border border-black w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition"
              placeholder="Enter your password"
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
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Additional Links */}
        <div className="text-center mt-6 text-sm text-gray-700">
          <p>
            New here?{' '}
            <a href="/register" className="text-black font-bold hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
