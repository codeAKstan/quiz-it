// app/signup/page.js
import React from 'react';
import Link from 'next/link';

export default function Signup() {
    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen p-6"
            style={{ backgroundColor: '#FBFCD8' }}
        >

            {/* Title */}
            <h1 className="text-2xl text-[#46178F] font-bold mb-4 text-center">
                Login
            </h1>

            {/* Signup Form */}
            <div className="w-full max-w-md">
                <div className="mb-4">
                    <input
                        type="text"
                        id="username"
                        className="w-full p-2 rounded-lg border border-[#46178F4D] text-gray-900"
                        placeholder="Email or Username"
                    />
                </div>

                <div className="mb-6">
                    <input
                        type="password"
                        id="password"
                        className="w-full p-2 rounded-lg border border-[#46178F4D] text-gray-800"
                        placeholder="Password"
                    />
                </div>

                {/* Sign Up Button with Logo */}
                <button
                    className="w-full bg-[#46178F] text-[#FBFCD8] px-4 py-3 rounded-[10px] text-lg font-semibold shadow-lg flex items-center justify-between"
                >
                    <span>Log In</span>
                    <img src="/signup-icon.png" alt="Sign Up" className="w-6 h-6" />
                </button>



                {/* Or Sign Up With */}
                <p className="text-sm text-[#46178F4D] text-center mt-4">
                    Or login with
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