// app/signup/page.js
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8000/api/register/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
        });
        if (response.ok) {
            router.push('/login');
        } else {
            alert('Signup failed');
        }
    };
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen p-6"
            style={{ backgroundColor: '#FBFCD8' }}
        >
            {/* Signup Form */}
            {/* Logo */}
            <img
                src="/Q-logo.svg"
                alt="Quiz-it Logo"
                className="w-16 h-16 mb-4"
            />
            <form onSubmit={handleSignup} className="w-full max-w-md">
                <h1 className="text-2xl text-[#46178F] font-bold mb-4 text-center">
                    Chill. You're almost there.
                </h1>
                <p className="text-[#46178F] mb-8 text-center">
                    Create an account so you can be able to answer questions from your list of recommended topics.
                </p>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="User Name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 rounded-lg border border-[#46178F4D] text-gray-900"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 rounded-lg border border-[#46178F4D] text-gray-800"
                    />
                </div>
                <div className="mb-6 relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        placeholder="Password (8+ characters)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 rounded-lg border border-[#46178F4D] text-gray-800 pr-10"
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
                <button
                    type="submit"
                    className="w-full bg-[#46178F] text-[#FBFCD8] px-4 py-3 rounded-[10px] text-lg font-semibold shadow-lg flex items-center justify-between"
                >
                    Sign Up
                    <img src="/signup-icon.png" alt="Sign Up" className="w-6 h-6" />
                </button>
                {/* Or Sign Up With */}
                <p className="text-sm text-[#46178F4D] text-center mt-4">
                    Or sign up with
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
            </form>
        </div>
    );
}