// app/congratulations/page.js
import React from 'react';
import Link from 'next/link';

export default function Congratulations() {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen p-6"
      style={{ backgroundColor: '#FBFCD8' }}
    >
      <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
        Congratulations,
      </h1>
      <p className="text-2xl text-gray-600 mb-8 text-center">
        your recommended questions are ready
      </p>

      <Link
        href="/dashboard" // Replace with the next screen path
        className="bg-purple-800 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg"
      >
        Continue
      </Link>
    </div>
  );
}