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
    <div className="p-6" style={{ backgroundColor: '#FBFCD8' }}>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Browsing 10+ questions under each category you choose
      </h1>

      {/* List of Selected Topics */}
      <div className="space-y-4 mb-8">
        {selectedTopics.map((topic, index) => (
          <div
            key={index}
            className="p-4 bg-white rounded-lg text-gray-800 shadow-sm"
          >
            {topic}
          </div>
        ))}
      </div>

      {/* Update My Topics and Maybe Later Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white shadow-lg">
        <Link
          href={{
            pathname: '/topics',
            query: { topics: selectedTopics.join(',') }, // Pass selectedTopics back to topics screen
          }}
          className="w-full bg-[#FFD700] text-[#0D0022] px-8 py-3 rounded-full text-lg font-semibold shadow-lg text-center block mb-2"
        >
          Update My Topics
        </Link>
        <Link
          href="/congratulations"
          className="text-sm text-[#0D0022] text-center cursor-pointer hover:underline block"
        >
          Maybe Later
        </Link>
      </div>
    </div>
  );
}