// app/signup/page.js
import React from 'react';
import Link from 'next/link';

export default function Signup() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-6"
      style={{ backgroundColor: '#46178F' }}
    >
      {/* Title */}
      <h1 className="text-3xl font-bold text-white mb-4 text-center">
        Child. You're almost there.
      </h1>
      <p className="text-lg text-white mb-8 text-center">
        Create an account so you can be able to answer questions from your list of recommended topics.
      </p>

      {/* Signup Form */}
      <div className="w-full max-w-md">
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
            User Name
          </label>
          <input
            type="text"
            id="username"
            className="w-full p-2 rounded-lg bg-white text-gray-800"
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 rounded-lg bg-white text-gray-800"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-6">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
            Password (8+ characters)
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 rounded-lg bg-white text-gray-800"
            placeholder="Enter your password"
          />
        </div>

        <button
          className="w-full bg-[#FFD700] text-[#0D0022] px-8 py-3 rounded-full text-lg font-semibold shadow-lg text-center"
        >
          Sign Up
        </button>

        {/* Or Sign Up With */}
        <p className="text-sm text-white text-center mt-4">
          Or sign up with
        </p>

        {/* Terms and Conditions */}
        <p className="text-xs text-white text-center mt-4">
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