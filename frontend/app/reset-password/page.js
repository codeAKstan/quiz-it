'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    setError('');
    
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/password-reset/`, 
        { email }
      );
      
      setMessage('If the email exists in our system, you will receive a password reset link shortly.');
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error('Password reset error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

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
          Reset Password
        </h1>
        <p className="text-[#46178F] mb-8 text-center">
          We'll email you a link to reset your password.
          Ensure the email address is associated with your account
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
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded-lg border border-[#46178F4D] text-gray-900"
              placeholder="Email"
              required
            />
          </div>
          
          {/* Request Link Button with Logo */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#46178F] text-[#FBFCD8] px-4 py-3 rounded-[10px] text-lg font-semibold shadow-lg flex items-center justify-between"
          >
            <span>{isSubmitting ? 'Sending...' : 'Request link'}</span>
            <img src="/signup-icon.png" alt="Sign Up" className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
}