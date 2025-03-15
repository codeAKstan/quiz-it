
'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function Login() {

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
            <div className="w-full max-w-md">
                <div className="mb-4">
                    <input
                        type="email"
                        id="email"
                        className="w-full p-2 rounded-lg border border-[#46178F4D] text-gray-900"
                        placeholder="Email"
                    />
                </div>

                {/* Log In Button with Logo */}
                <button
                    className="w-full bg-[#46178F] text-[#FBFCD8] px-4 py-3 rounded-[10px] text-lg font-semibold shadow-lg flex items-center justify-between"
                >
                    <span>Request link</span>
                    <img src="/signup-icon.png" alt="Sign Up" className="w-6 h-6" />
                </button>
            </div>
            </div>
        </div>
    );
}