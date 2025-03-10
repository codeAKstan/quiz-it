// components/OnboardingScreen.js
import React from 'react';
import Link from 'next/link';

const OnboardingScreen = ({ title, subtitle, buttonText, linkText, nextPath, image }) => {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen p-4"
      style={{ backgroundColor: '#FBFCD8' }} 
    >
      {/* Image */}
      <img src={image.src} alt={title} className="w-64 h-64 mb-8" />

      {/* Title */}
      <h1 className="text-3xl font-bold text-purple-800 mb-4 text-center">{title}</h1>

      {/* Subtitle */}
      <p className="text-lg text-purple-800 mb-8 text-center max-w-md">{subtitle}</p>

      {/* Continue Button */}
      <Link
        href={nextPath}
        className="text-white px-20 py-3 rounded-[10px] text-lg font-semibold shadow-lg transition duration-300 mb-4"
        style={{ backgroundColor: '#46178F' }}
      >
        {buttonText}
      </Link>

      {/* Login Link */}
      <p className="text-sm text-black-500">
        {linkText}{' '}
        <span className="text-purple-800 cursor-pointer hover:underline">Log in</span>
      </p>
    </div>
  );
};

export default OnboardingScreen;