
'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-6"
      style={{ backgroundColor: '#FBFCD8' }}
    >
      {/* Back Icon */}
      <div className="absolute top-6 left-6">
        <Link href="/">
          <img
            src="/back-icon.png" // Add the back icon
            alt="Back"
            className="w-6 h-6 cursor-pointer"
          />
        </Link>
      </div>

      {/* Title */}
      <h1 className="text-2xl text-[#46178F] font-bold mb-4 text-center">
        Log in
      </h1>

      {/* Login Form */}
      <div className="w-full max-w-md">
        <div className="mb-4">
          <input
            type="text"
            id="username"
            className="w-full p-2 rounded-lg border border-[#46178F4D] text-gray-900"
            placeholder="Email or Username"
          />
        </div>

        <div className="mb-6 relative">
          <input
            type={showPassword ? 'text' : 'password'} // Toggle input type
            id="password"
            className="w-full p-2 rounded-lg border border-[#46178F4D] text-gray-800 pr-10" // Add padding for the eye icon
            placeholder="Password"
          />
          {/* Eye Icon */}
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
          >
            <img
              src={showPassword ? '/eye-icon.png' : '/eye-off-icon.png'} // Toggle eye icon
              alt="Toggle Password Visibility"
              className="w-6 h-6"
            />
          </button>
        </div>

        {/* Log In Button with Logo */}
        <button
          className="w-full bg-[#46178F] text-[#FBFCD8] px-4 py-3 rounded-[10px] text-lg font-semibold shadow-lg flex items-center justify-between"
        >
          <span>Log In</span>
          <img src="/signup-icon.png" alt="Sign Up" className="w-6 h-6" />
        </button>

        {/* Forgot Password */}
        <p className="text-sm text-[#46178F] text-center mt-4">
          <Link href="/forgot-password" className="hover:underline">
            Forgot Password?
          </Link>
        </p>

        {/* Or Log In With */}
        <p className="text-sm text-[#46178F4D] text-center mt-4">
          Or log in with
        </p>

        {/* Google and Facebook Logos */}
        <div className="flex justify-center space-x-4 mt-4">
          <img
            src="/google-icon.png"
            alt="Google"
            className="w-10 h-10 cursor-pointer"
          />
          <img
            src="/facebook-icon.png"
            alt="Facebook"
            className="w-10 h-10 cursor-pointer"
          />
        </div>

        {/* Terms and Conditions */}
        <p className="text-xs text-[#46178F4D] text-center mt-4">
          By signing up, you accept Quiz It's{' '}
          <Link href="/terms" className="text-[#FFD700] hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-[#FFD700] hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}