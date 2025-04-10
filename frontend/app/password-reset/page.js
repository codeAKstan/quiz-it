'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function ResetPasswordConfirm({ params }) {
  const router = useRouter();
  const [passwords, setPasswords] = useState({
    password: '',
    password_confirm: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  // Get UID and token from URL params
  const uid = params?.uid || '';
  const token = params?.token || '';
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (passwords.password !== passwords.password_confirm) {
      setError('Passwords do not match');
      return;
    }
    
    setIsSubmitting(true);
    setMessage('');
    setError('');
    
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/password-reset/confirm/`, 
        { 
          uid,
          token,
          password: passwords.password,
          password_confirm: passwords.password_confirm
        }
      );
      
      setMessage('Your password has been reset successfully.');
      
      // Redirect to login page after 3 seconds
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred. The link may be invalid or expired.');
      console.error('Password reset confirm error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Validate that we have uid and token
  useEffect(() => {
    if (!uid || !token) {
      setError('Invalid password reset link');
    }
  }, [uid, token]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-6"
      style={{ backgroundColor: '#FBFCD8' }}
    >
      {/* Back Icon */}
      <div className="absolute top-6 left-6">
        <Link href="/login">
          <img
            src="/back-icon.png"
            alt="Back"
            className="w-6 h-6 cursor-pointer"
          />
        </Link>
      </div>
      
      {/* Title */}
      <div className='absolute top-20'>
        <h1 className="text-2xl text-[#46178F] font-bold mb-4 text-center">
          Set New Password
        </h1>
        <p className="text-[#46178F] mb-8 text-center">
          Please enter your new password below
        </p>
        
        {/* Reset password Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          {message && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {message}
            </div>
          )}
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          
          <div className="mb-4">
            <input
              type="password"
              id="password"
              name="password"
              value={passwords.password}
              onChange={handleChange}
              className="w-full p-2 rounded-lg border border-[#46178F4D] text-gray-900"
              placeholder="New Password"
              required
              minLength={8}
            />
          </div>
          
          <div className="mb-4">
            <input
              type="password"
              id="password_confirm"
              name="password_confirm"
              value={passwords.password_confirm}
              onChange={handleChange}
              className="w-full p-2 rounded-lg border border-[#46178F4D] text-gray-900"
              placeholder="Confirm New Password"
              required
              minLength={8}
            />
          </div>
          
          {/* Reset Password Button */}
          <button
            type="submit"
            disabled={isSubmitting || !uid || !token}
            className="w-full bg-[#46178F] text-[#FBFCD8] px-4 py-3 rounded-[10px] text-lg font-semibold shadow-lg flex items-center justify-between"
          >
            <span>{isSubmitting ? 'Processing...' : 'Set New Password'}</span>
            <img src="/signup-icon.png" alt="Reset Password" className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
}