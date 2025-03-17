'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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

  // Track the number of selected topics per category
  const selectedTopicsPerCategory = categories.map((category) => {
    return selectedTopics.filter((topic) => category.topics.includes(topic)).length;
  });

  // Check if the user has selected 3 topics from each category
  const isSelectionComplete = selectedTopicsPerCategory.every((count) => count === 3);

  const handleTopicSelect = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    } else {
      if (selectedTopics.length < 12) {
        setSelectedTopics([...selectedTopics, topic]);
      }
    }
  };

  const router = useRouter();

  const handleContinue = () => {
    // Pass selected topics to the Signup page via query parameters
    router.push(`/signup?topics=${selectedTopics.join(',')}`);
  };

  return (
    <div className="p-6" style={{ backgroundColor: '#0D0022' }}>
      <h1 className="text-3xl font-bold text-[#FBFCD8CC] mb-4">
        Select <span className="text-[#46178F]">3 topics</span> from each category to focus on
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
                    ? 'text-[#1E0A3E]'
                    : 'text-white'
                }`}
                style={{
                  backgroundColor: selectedTopics.includes(topic) ? '#FFD700' : '#1E0A3E',
                }}
                onClick={() => handleTopicSelect(topic)}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="fixed bottom-0 left-0 right-0 p-6 shadow-lg">
        <button
          onClick={handleContinue}
          className={`w-full px-8 py-3 rounded-full text-lg font-semibold shadow-lg text-center block ${
            isSelectionComplete
              ? 'bg-[#46178F] text-white' // Enabled state
              : 'bg-[#6A6277] text-white cursor-not-allowed' // Disabled state
          }`}
          disabled={!isSelectionComplete}
        >
          {isSelectionComplete ? 'Continue' : 'Select 3 each'}
        </button>
      </div>
    </div>
  );
}