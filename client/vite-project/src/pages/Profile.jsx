import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    API.get('/auth/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setUser(res.data);
        setNewName(res.data.name);
        setProfileImage(res.data.profileImage || '');
      })
      .catch((err) => console.error('Profile fetch error:', err));
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await API.post('/upload', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setProfileImage(res.data.url);
      toast.success('Profile image updated!');
    } catch (err) {
      console.error(err);
      toast.error('Image upload failed.');
    }
  };

  const handleSave = async () => {
    try {
      await API.put(
        '/auth/profile',
        { name: newName, profileImage },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setUser((prev) => ({ ...prev, name: newName, profileImage }));
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update profile.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  if (!localStorage.getItem('token')) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen  text-center px-4">
        <h2 className="text-2xl font-bold text-black mb-4 bg-white">
          ❌ Login to view profile
        </h2>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 bg-black text-white hover:bg-gray-800 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="px-6 py-2 border border-black hover:bg-gray-100 transition"
          >
            Register New User
          </button>
        </div>
      </div>
    );
  }

  if (!user) return <p className="text-center mt-10">Loading profile...</p>;

  const avatar =
    profileImage ||
    `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}&backgroundType=gradient`;

  return (
      <div className="flex justify-center items-center min-h-screen px-4 pt-20">
    <div className="max-w-6xl w-full flex flex-col md:flex-row border border-black bg-white shadow">
        {/* Sidebar */}
        <aside className="w-full md:w-64 border-r border-black p-6 flex flex-col items-center text-center md:text-left">
          <div className="relative w-24 h-24 mb-4">
            <img
              src={avatar}
              alt="Profile"
              className="w-24 h-24 border border-black object-cover shadow-md"
            />
            {isEditing && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
              />
            )}
          </div>
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-gray-700 text-sm">{user.email}</p>
          <div className="mt-6 w-full space-y-3 text-center">
            <NavLink
              to="/profile"
              className="block border border-black px-4 py-2 hover:bg-black hover:text-white transition"
            >
              Profile
            </NavLink>
            <NavLink
              to="/orders"
              className="block border border-black px-4 py-2 hover:bg-black hover:text-white transition"
            >
              Orders
            </NavLink>
            <NavLink
              to="/cart"
              className="block border border-black px-4 py-2 hover:bg-black hover:text-white transition"
            >
              Cart
            </NavLink>
            <button
              onClick={handleLogout}
              className="w-full border border-black px-4 py-2 bg-red-500 text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold border-b border-black pb-3 mb-6">
            Profile Details
          </h1>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Username</label>
            {isEditing ? (
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="border border-black px-3 py-2 w-full max-w-sm"
              />
            ) : (
              <p className="font-medium">{user.name}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Email Address</label>
            <p className="font-medium">{user.email}</p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Products Added</label>
            <p className="font-medium">{user.products?.length || 0}</p>
          </div>

          {isEditing ? (
            <div className="space-x-4">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-black text-white hover:bg-gray-800 transition"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-black hover:bg-gray-100 transition"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-black text-white hover:bg-gray-800 transition"
            >
              Edit Profile
            </button>
          )}

        
        
        </main>
      </div>
    </div>
  );
};

export default Profile;
