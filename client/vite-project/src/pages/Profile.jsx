import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    API.get('/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => setUser(res.data))
      .catch((err) => console.error('Profile fetch error:', err));
  }, []);

  if (!localStorage.getItem('token')) {
    return <p className="text-center mt-10 text-red-600">❌ You must be logged in to view this page.</p>;
  }

  if (!user) return <p className="text-center mt-10">Loading profile...</p>;

  const avatar = `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}&backgroundType=gradient`;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded shadow p-6 text-center">
      <img
        src={avatar}
        alt="Profile"
        className="w-28 h-28 mx-auto rounded-full shadow mb-4"
      />
      <h2 className="text-2xl font-bold">{user.name}</h2>
      <p className="text-gray-600">{user.email}</p>
    </div>
  );
};

export default Profile;
