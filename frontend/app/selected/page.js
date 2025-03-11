// app/questions/page.js
'use client'; // Mark this component as a Client Component
import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'; // Use useSearchParams to get query parameters

export default function Questions() {
  const searchParams = useSearchParams();
  const topics = searchParams.get('topics'); // Retrieve the topics query parameter

  // Convert the topics query parameter into an array
  const selectedTopics = topics ? topics.split(',') : [];

  return (
    <div
      className="min-h-screen p-6 flex flex-col"
      style={{
        backgroundImage: "url('/woman.jpeg')", // Add background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Background Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: '#46178FB2', // Add background color with opacity
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-grow">
        {/* Search Icon */}
        <img
          src="/search.png"
          alt="Search"
          className="w-12 h-12 mb-4"
        />

        {/* Title */}
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Browsing 10+ questions under each category you choose
        </h1>

        {/* List of Selected Topics */}
        <div className="w-full max-w-md space-y-4">
          {selectedTopics.map((topic, index) => (
            <div
              key={index}
              className="flex items-center text-white text-lg"
            >
              {/* Tick Icon */}
              <img
                src="/tick.png"
                alt="Tick"
                className="w-6 h-6 mr-2"
              />
              {/* Topic Name */}
              <span>{topic}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Update My Topics and Maybe Later Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-[#46178FB2] shadow-lg z-20">
        <Link
          href={{
            pathname: '/topics',
            query: { topics: selectedTopics.join(',') }, // Pass selectedTopics back to topics screen
          }}
          className="w-full bg-[#FFD700] text-[#0D0022] px-8 py-3 rounded-[10px] text-lg font-semibold shadow-lg text-center block mb-2"
        >
          Update My Topics
        </Link>
        <Link
          href="/congratulations"
          className="text-sm text-[#ffffff] text-center font-bold cursor-pointer hover:underline block"
        >
          Maybe Later
        </Link>
      </div>
    </div>
  );
}