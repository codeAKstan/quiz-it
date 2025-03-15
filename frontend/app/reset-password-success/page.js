// app/reset-password-success/page.js
import React from 'react';
import Link from 'next/link';

export default function ResetPasswordSuccess() {
    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen p-6"
            style={{ backgroundColor: '#FBFCD8' }}
        >
            {/* cancel Icon */}
            <div className="absolute top-6 left-6">
                <Link href="/login">
                    <img
                        src="/cancel.png"
                        alt="Back"
                        className="w-6 h-6 cursor-pointer"
                    />
                </Link>
            </div>
            <div className='absolute top-24 flex flex-col items-center text-center w-full'>
                {/* Checkmark Icon */}
                <img
                    src="/checkmark-icon.png"
                    alt="Success"
                    className="w-16 h-16 mb-6"
                />

                {/* Email Address */}
                <p className="text-lg text-[#46178F] text-center mb-4">
                    We've sent an email to{' '}
                    <span className="font-bold">vic***@gmail**.com</span>
                </p>

                {/* Instructions */}
                <p className="text-sm text-[#46178F4D] text-center mb-8 max-w-md">
                    Click the link in the email. Be sure to check your spam folder if you don't see the email in your inbox.
                </p>

                {/* Go Back to Login Button */}
                <Link
                    href="/login"
                    className="w-full max-w-xs bg-[#46178F] text-[#FBFCD8] px-4 py-3 rounded-[10px] text-lg font-semibold shadow-lg flex items-center justify-between"
                >
                    Go back to login
                    <img src="/signup-icon.png" alt="Sign Up" className="w-6 h-6" />
                </Link>
            </div>
        </div>
    );
}