"use client";
import React from 'react';

export default function Dashboard() {
  const user = {
    name: 'Chiamaka',
    points: 10,
    rank: 245,
    badges: 1,
    profileImage: '/profile.svg'
  };

  const quizCategories = [
    {
      name: 'Blockchain',
      questions: 15,
      icon: '/blockchain-icon.svg'
    },
    {
      name: 'Health',
      questions: 25,
      icon: '/health-icon.svg'
    }
  ];

  const topRanks = [
    {
      name: 'Davio Victor',
      title: 'Streak Saver',
      points: 505
    },
    {
      name: 'Mayor Fred',
      title: 'Goal Getter',
      points: 501
    }
  ];

  return (
    <div className="bg-[#FBFCD8] min-h-screen p-4 relative">
      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-4">
        <img
          src="/explorer-icon.svg"
          alt="Explorer"
          className="w-15 h-15"
        />
        <img
          src="/notification-icon.svg"
          alt="Notifications"
          className="w-6 h-6"
        />
      </div>

      {/* Header with Profile */}
      <div
        className="bg-cover bg-center text-white rounded-4xl p-4 mb-4 relative"
        style={{ backgroundImage: "url('/curve-bg.svg')" }}
      >
        <div className="absolute inset-x-0 top-[-50px] flex justify-center">
          <img
            src={user.profileImage}
            alt={`${user.name}'s profile`}
            className="w-28 h-28 rounded-full border-2 border-[#ffffff]"
          />
        </div>

        <div className="text-center mt-16">
          <h1 className="text-xl font-bold">Hello, {user.name}</h1>
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
        {quizCategories.map((quiz, index) => (
          <div
            key={index}
            className=" p-4 mb-2 flex items-center shadow-sm"
          >
            <img
              src={quiz.icon}
              alt={`${quiz.name} icon`}
              className="w-12 h-12 mr-4"
            />
            <div className="flex-grow ">
              <h3 className="font-bold text-[#000]">{quiz.name}</h3>
              <p className="text-gray-500">Questions: {quiz.questions}</p>
            </div>
            <img
              src="/next-icon.svg"
              alt="Next"
              className="w-2 h-2"
            />
          </div>
        ))}
        </div>
      </div>


      {/* Top Rank of the Week */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-[#000] font-bold">Top Rank of the Week</h2>
          <button className="text-[#46178F58] text-sm">See all</button>
        </div>
        {topRanks.map((rank, index) => (
          <div
            key={index}
            className="bg-[#46178F08] rounded-lg p-4 mb-2 flex items-center shadow-sm"
          >
            <div className={`mr-4 text-xl font-bold ${index === 0 ? 'text-[#46178F]' : 'text-yellow-500'}`}>
              {index + 1}
            </div>
            <div className="flex-grow">
              <h3 className="font-bold">{rank.name}</h3>
              <p className="text-gray-500">{rank.title}</p>
            </div>
            <p className="font-bold text-[#46178F]">{rank.points} Pt</p>
          </div>
        ))}
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