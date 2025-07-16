import { useState } from 'react';
import API from '../api/axios';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', { name, email, password });
      alert('Registration successful');
    } catch (err) {
      alert('Email already exists');
    }
  };

  return (
    <form onSubmit={handleRegister} className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold">Register</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} className="block border p-2 w-full my-2" placeholder="Name" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} className="block border p-2 w-full my-2" placeholder="Email" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="block border p-2 w-full my-2" placeholder="Password" />
      <button className="bg-green-600 text-white px-4 py-2">Register</button>
    </form>
  );
}
