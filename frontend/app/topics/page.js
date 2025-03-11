// app/topics/page.js
"use client";
// app/topics/page.js
import React, { useState } from 'react';
import Link from 'next/link';

export default function Topics() {
  const [selectedTopics, setSelectedTopics] = useState([]);

  const categories = [
    {
      name: 'Tech',
      topics: ['Blockchain', 'Gadgets', 'Software Development', 'IoT', 'Artificial Intelligence', 'Data Science', 'Cloud Computing', 'Cyber Security'],
    },
    {
      name: 'Science',
      topics: ['Physics', 'Astronomy', 'Physical Sciences', 'Biology', 'Mathematics', 'Ecology', 'Environmental Science', 'Health'],
    },
    {
      name: 'Business and Finance',
      topics: ['Financial Regulations & Compliance', 'Strategic Management', 'Trading', 'Marketing and Advertising', 'Financial Markets', 'Negotiation', 'Investments', 'Tech in Business'],
    },
    {
      name: 'Art',
      topics: ['Graphic Design', 'Ethics in Art', 'Documentary Art', 'Literature', 'World Cultures', 'Music Theory', 'Cinematography', 'Politics'],
    },
  ];

  const handleTopicSelect = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    } else {
      if (selectedTopics.length < 12) {
        setSelectedTopics([...selectedTopics, topic]);
      }
    }
  };

  return (
    <div className="p-6" style={{ backgroundColor: '#0D0022' }}>
      <h1 className="text-3xl font-bold text-[#FBFCD8CC]  mb-4">
        Select <span className='text-[#1E0A3E] '>3 topics</span> from each category to focus on
      </h1>
      <p className="text-lg text-[#FBFCD8CC] mb-8">
        We'll use them to customize your quiz experience
      </p>

      {categories.map((category, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-2xl font-semibold text-[#FBFCD8CC] mb-4">{category.name}</h2>
          <div className="grid grid-cols-2 gap-4">
            {category.topics.map((topic, idx) => (
              <button
                key={idx}
                className={`p-4 rounded-lg text-left ${
                    selectedTopics.includes(topic)
                      ? 'text-[#1E0A3E]' // Dark navy text for selected topics
                      : 'text-white' // Default text color for unselected topics
                  }`}
                  style={{
                    backgroundColor: selectedTopics.includes(topic) ? '#FFD700' : '#1E0A3E', // Gold for selected, dark navy for unselected
                  }}
                onClick={() => handleTopicSelect(topic)}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white shadow-lg">
        <Link
          href={{
            pathname: '/selected',
            query: { topics: selectedTopics.join(',') }, // Pass selectedTopics as a query parameter
          }}
          className="w-full bg-purple-800 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg text-center block"
        >
          Continue
        </Link>
      </div>
    </div>
  );
}