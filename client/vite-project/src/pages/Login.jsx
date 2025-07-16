import { useState } from 'react';
import API from '../api/axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      alert('Logged in!');
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold">Login</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} className="block border p-2 w-full my-2" placeholder="Email" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="block border p-2 w-full my-2" placeholder="Password" />
      <button className="bg-blue-600 text-white px-4 py-2">Login</button>
    </form>
  );
}
  