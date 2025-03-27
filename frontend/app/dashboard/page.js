"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [quizCategories, setQuizCategories] = useState([]);
  const [topRanks, setTopRanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch('http://localhost:8000/api/user/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        // Fetch quiz categories
        const categoriesResponse = await fetch('http://localhost:8000/api/quiz-categories/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        // Fetch top ranks
        const ranksResponse = await fetch('http://localhost:8000/api/top-ranks/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        // Check if all responses are okay
        if (!userResponse.ok || !categoriesResponse.ok || !ranksResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        // Parse responses
        const userData = await userResponse.json();
        const categoriesData = await categoriesResponse.json();
        const ranksData = await ranksResponse.json();

        // Update state
        setUser(userData);
        setQuizCategories(categoriesData);
        setTopRanks(ranksData);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard. Please try again.');
        setLoading(false);
        localStorage.removeItem('token');
        router.push('/login');
      }
    };

    fetchData();
  }, [router]);

  // Loading state
  if (loading) {
    return (
      <div className="bg-[#FBFCD8] min-h-screen flex items-center justify-center">
        <p className="text-[#46178F] text-xl">Loading Dashboard...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-[#FBFCD8] min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  // Ensure user data exists before rendering
  if (!user) {
    return null;
  }

  return (
    <div className="bg-[#FBFCD8] min-h-screen p-4 relative">
      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-4">
        <img
          src="/explorer-icon.svg"
          alt="Explorer"
          className="w-25 h-25"
        />
        <img
          src="/notification-icon.svg"
          alt="Notifications"
          className="w-8 h-8"
        />
      </div>

      {/* Header with Profile */}
      <div
        className="bg-cover bg-center text-white rounded-4xl p-4 mb-4 relative"
        style={{ backgroundImage: "url('/curve-bg.svg')" }}
      >
        <div className="absolute inset-x-0 top-[-50px] flex justify-center">
          <img
            src={user.profile_image || '/profile.svg'}
            alt={`${user.username}'s profile`}
            className="w-28 h-28 rounded-full border-2 border-[#ffffff]"
          />
        </div>

        <div className="text-center mt-16">
          <h1 className="text-xl font-bold">Hello, {user.username}</h1>
          <p>Earn through quizit</p>
        </div>

        {/* User Stats */}
        <div className="flex justify-between text-[#4B208DB2] text-center mt-4 bg-[#FBFCD8] p-4 rounded-4xl ">
          <div className="flex items-center space-x-2">
            <div className="bg-[#46178F] w-10 h-10 rounded-2xl flex items-center justify-center">
              <img
                src="/points-icon.svg"
                alt="Points"
                className="w-6 h-6"
              />
            </div>
            <div>
              <p className="text-sm text-gray-600">Points</p>
              <p className="font-bold">{user.points}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-[#46178F] w-10 h-10 rounded-2xl flex items-center justify-center">
              <img
                src="/ranks-icon.svg"
                alt="Rank"
                className="w-6 h-6"
              />
            </div>
            <div>
            <p className="text-sm text-gray-600">Rank</p>
            <p className="font-bold">{user.rank}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-[#46178F] w-10 h-10 rounded-2xl flex items-center justify-center">
              <img
                src="/badges-icon.svg"
                alt="Badges"
                className="w-6 h-6"
              />
            </div>
            <div>
            <p className="text-sm text-gray-600">Badges</p>
            <p className="font-bold">{user.badges}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Your Quiz Section */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-[#000] font-bold">Your Quiz</h2>
          <button className="text-[#46178F58] text-sm">See all</button>
        </div>
        <div className='bg-[#46178F08] rounded-lg p-2'>
        {quizCategories.length > 0 ? (
          quizCategories.map((quiz, index) => (
            <div
              key={index}
              className="p-4 mb-2 flex items-center shadow-sm"
            >
              <img
                src={quiz.icon || '/default-quiz-icon.svg'}
                alt={`${quiz.name} icon`}
                className="w-12 h-12 mr-4"
              />
              <div className="flex-grow">
                <h3 className="font-bold text-[#000]">{quiz.name}</h3>
                <p className="text-gray-500">Questions: {quiz.questions}</p>
              </div>
              <img
                src="/next-icon.svg"
                alt="Next"
                className="w-6 h-6"
              />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No quiz categories available</p>
        )}
        </div>
      </div>

      {/* Top Rank of the Week */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-[#000] font-bold">Top Rank of the Week</h2>
          <button className="text-[#46178F58] text-sm">See all</button>
        </div>
        {topRanks.length > 0 ? (
          topRanks.map((rank, index) => (
            <div
              key={index}
              className="bg-[#46178F08] rounded-lg p-4 mb-2 flex items-center shadow-sm"
            >
              <div className={`mr-4 text-xl font-bold ${index === 0 ? 'text-[#46178F]' : 'text-yellow-500'}`}>
                {index + 1}
              </div>
              <div className="flex-grow">
                <h3 className="font-bold">{rank.username}</h3>
                <p className="text-gray-500">{rank.title}</p>
              </div>
              <p className="font-bold text-[#46178F]">{rank.points} Pt</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No top ranks available</p>
        )}
      </div>

      {/* Bottom Navigation */}
      <div
        className="fixed bottom-0 left-0 right-0 flex justify-around p-2 shadow-lg bg-cover bg-center"
        style={{ backgroundImage: "url('/bottom-bg.svg')" }}
      >
        <img src="/home-icon.svg" alt="Home" className="w-6 h-6" />
        <img src="/coin-icon.svg" alt="Coin History" className="w-6 h-6" />
        <div className="bg-[#46178F] text-white rounded-full w-8 h-8 flex items-center justify-center absolute top-[-20px] left-1/2 transform -translate-x-1/2">
          <img
            src="/add.svg"
            alt="Add"
            className="w-6 h-6"
          />
        </div>
        <img src="/wallet-icon.svg" alt="My Wallet" className="w-6 h-6" />
        <img src="/profile-icon.svg" alt="Profile" className="w-6 h-6" />
      </div>
    </div>
  );
}