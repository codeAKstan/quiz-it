// app/signup/page.js
import React from 'react';
import Link from 'next/link';

export default function Signup() {
    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen p-6"
            style={{ backgroundColor: '#FBFCD8' }}
        >
            {/* Logo */}
            <img
                src="/Q-logo.svg"
                alt="Quiz-it Logo"
                className="w-16 h-16 mb-4"
            />

            {/* Title */}
            <h1 className="text-2xl text-[#46178F] font-bold mb-4 text-center">
                Chill. You're almost there.
            </h1>
            <p className="text-[#46178F] mb-8 text-center">
                Create an account so you can be able to answer questions from your list of recommended topics.
            </p>

            {/* Signup Form */}
            <div className="w-full max-w-md">
                <div className="mb-4">
                    <input
                        type="text"
                        id="username"
                        className="w-full p-2 rounded-lg border border-[#46178F4D] text-gray-900"
                        placeholder="User Name"
                    />
                </div>

                <div className="mb-4">
                    <input
                        type="email"
                        id="email"
                        className="w-full p-2 rounded-lg border border-[#46178F4D] text-gray-800"
                        placeholder="Email"
                    />
                </div>

                <div className="mb-6">
                    <input
                        type="password"
                        id="password"
                        className="w-full p-2 rounded-lg border border-[#46178F4D] text-gray-800"
                        placeholder="Password (8+ characters)"
                    />
                </div>

                {/* Sign Up Button with Logo */}
                <button
                    className="w-full bg-[#46178F] text-[#FBFCD8] px-4 py-3 rounded-[10px] text-lg font-semibold shadow-lg flex items-center justify-between"
                >
                    <span>Sign Up</span>
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
            </div>
        </div>
    );
}