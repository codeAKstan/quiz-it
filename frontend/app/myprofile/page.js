"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function MyProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    bio: ''
  });
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/user/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();
        setUser(userData);
        setFormData({
          username: userData.username || '',
          email: userData.email || '',
          first_name: userData.first_name || '',
          last_name: userData.last_name || '',
          bio: userData.bio || ''
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load profile. Please try again.');
        setLoading(false);
        localStorage.removeItem('token');
        router.push('/login');
      }
    };

    fetchUserData();
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch('http://localhost:8000/api/user/', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-[#FBFCD8] min-h-screen flex items-center justify-center">
        <p className="text-[#46178F] text-xl">Loading Profile...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-[#FBFCD8] min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  // Ensure user data exists before rendering
  if (!user) {
    return null;
  }

  return (
    <div className="bg-[#FBFCD8] min-h-screen p-4 relative">
      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => router.push('/dashboard')} className="flex items-center text-[#46178F]">
          <img
            src="/back-icon.svg"
            alt="Back"
            className="w-6 h-6 mr-2"
          />
          Back
        </button>
        <h1 className="text-xl font-bold text-[#46178F]">My Profile</h1>
        <div className="w-6"></div> {/* Empty div for spacing */}
      </div>

      {/* Profile Header */}
      <div
        className="bg-cover bg-center text-white rounded-4xl p-4 mb-4 relative"
        style={{ backgroundImage: "url('/curve-bg.svg')" }}
      >
        <div className="absolute inset-x-0 top-[-50px] flex justify-center">
          <img
            src={user.profile_image || '/profile.svg'}
            alt={`${user.username}'s profile`}
            className="w-28 h-28 rounded-full border-2 border-[#ffffff]"
          />
        </div>

        <div className="text-center mt-16">
          <h1 className="text-xl font-bold">{user.username}</h1>
          <p className="text-sm">{user.email}</p>
        </div>

        {/* User Stats */}
        <div className="flex justify-between text-[#4B208DB2] text-center mt-4 bg-[#FBFCD8] p-4 rounded-4xl">
          <div className="flex items-center space-x-2">
            <div className="bg-[#46178F] w-10 h-10 rounded-2xl flex items-center justify-center">
              <img
                src="/points-icon.svg"
                alt="Points"
                className="w-6 h-6"
              />
            </div>
            <div>
              <p className="text-sm text-gray-600">Points</p>
              <p className="font-bold">{user.points}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-[#46178F] w-10 h-10 rounded-2xl flex items-center justify-center">
              <img
                src="/ranks-icon.svg"
                alt="Rank"
                className="w-6 h-6"
              />
            </div>
            <div>
              <p className="text-sm text-gray-600">Rank</p>
              <p className="font-bold">{user.rank}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-[#46178F] w-10 h-10 rounded-2xl flex items-center justify-center">
              <img
                src="/badges-icon.svg"
                alt="Badges"
                className="w-6 h-6"
              />
            </div>
            <div>
              <p className="text-sm text-gray-600">Badges</p>
              <p className="font-bold">{user.badges}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Details Section */}
      <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-[#46178F]">Profile Details</h2>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="text-[#46178F] font-medium"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="3"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#46178F] hover:bg-[#3a1275] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div>
            <div className="mb-3">
              <p className="text-gray-500 text-sm">Username</p>
              <p className="font-medium">{user.username}</p>
            </div>
            <div className="mb-3">
              <p className="text-gray-500 text-sm">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div className="mb-3">
              <p className="text-gray-500 text-sm">First Name</p>
              <p className="font-medium">{user.first_name || 'Not set'}</p>
            </div>
            <div className="mb-3">
              <p className="text-gray-500 text-sm">Last Name</p>
              <p className="font-medium">{user.last_name || 'Not set'}</p>
            </div>
            <div className="mb-3">
              <p className="text-gray-500 text-sm">Bio</p>
              <p className="font-medium">{user.bio || 'No bio provided'}</p>
            </div>
          </div>
        )}
      </div>

      {/* Topics Section */}
      <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
        <h2 className="text-lg font-bold text-[#46178F] mb-4">Your Topics</h2>
        {user.topics && user.topics.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {user.topics.map((topic, index) => (
              <div key={index} className="bg-[#46178F20] text-[#46178F] rounded-full px-3 py-1">
                {topic.topic}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No topics selected yet</p>
        )}
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-xl focus:outline-none focus:shadow-outline mb-16"
      >
        Logout
      </button>

      {/* Bottom Navigation */}
      <div
        className="fixed bottom-0 left-0 right-0 flex justify-around p-2 shadow-lg bg-cover bg-center"
        style={{ backgroundImage: "url('/bottom-bg.svg')" }}
      >
        <Link href="/dashboard" className="text-[#46178F58] flex flex-col items-center">
          <img src="/home-icon.svg" alt="Home" className="w-6 h-6" />
          <p className="text-xs text-[#FBFCD8]">Home</p>
        </Link>
        
        <Link href="/coin-history" className="text-[#46178F58] flex flex-col items-center">
          <img src="/coin-icon.svg" alt="Coin History" className="w-6 h-6" />
          <p className="text-xs text-[#FBFCD8]">Coin History</p>
        </Link>
        
        <Link href="/quiz" className="relative flex flex-col items-center">
          <div className="bg-[#46178F] text-white rounded-full w-8 h-8 flex items-center justify-center absolute top-[-20px]">
            <img src="/add.svg" alt="Add" className="w-6 h-6" />
          </div>
          <p className="text-xs mt-5 text-[#46178F58]">Add</p>
        </Link>
        
        <Link href="/wallet" className="text-[#46178F58] flex flex-col items-center">
          <img src="/wallet-icon.svg" alt="My Wallet" className="w-6 h-6" />
          <p className="text-xs text-[#FBFCD8]">My Wallet</p>
        </Link>
        
        <Link href="/myprofile" className="text-[#46178F] flex flex-col items-center">
          <img src="/profile-icon.svg" alt="Profile" className="w-6 h-6" />
          <p className="text-xs text-[#FBFCD8]">Profile</p>
        </Link>
      </div>
    </div>
  );
}