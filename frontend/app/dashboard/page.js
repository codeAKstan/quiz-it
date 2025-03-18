"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#FBFCD8] px-4 py-6 flex flex-col items-center">
      {/* Header */}
      <div className="relative w-full max-w-md">
        <div className="absolute top-2 left-2">
          <span className="bg-[#46178F] text-white px-3 py-1 rounded-full text-xs flex items-center">
            Explorer <span className="ml-1">⭐</span>
          </span>
        </div>
        <div className="absolute top-2 right-2">
          <span className="relative">
            <Image src="/notification-icon.png" alt="Notifications" width={24} height={24} />
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">2</span>
          </span>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-[#46178F] text-white p-6 rounded-2xl w-full max-w-md text-center mt-8">
        <div className="flex flex-col items-center">
          <Image src="/profile.png" alt="Profile" width={80} height={80} className="rounded-full border-4 border-white" />
          <h2 className="text-lg font-bold mt-2">Hello, Chiamaka</h2>
          <p className="text-sm">Earn through quizit</p>
        </div>
        <div className="flex justify-around mt-4">
          <div className="text-center">
            <p className="font-bold">10</p>
            <p className="text-xs">Points</p>
          </div>
          <div className="text-center">
            <p className="font-bold">2,345</p>
            <p className="text-xs">Rank</p>
          </div>
          <div className="text-center">
            <p className="font-bold">1</p>
            <p className="text-xs">Badges</p>
          </div>
        </div>
      </div>

      {/* Quiz Section */}
      <div className="w-full max-w-md mt-6">
        <h3 className="text-gray-800 font-bold">Your Quiz</h3>
        <div className="bg-white p-4 rounded-lg mt-2 shadow">
          <p className="font-bold">Blockchain</p>
          <p className="text-xs text-gray-600">Question: 15</p>
        </div>
        <div className="bg-white p-4 rounded-lg mt-2 shadow">
          <p className="font-bold">Health</p>
          <p className="text-xs text-gray-600">Question: 25</p>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="w-full max-w-md mt-6">
        <h3 className="text-gray-800 font-bold">Top rank of the week</h3>
        <div className="bg-white p-4 rounded-lg mt-2 shadow flex justify-between">
          <p className="font-bold">Davio Victor</p>
          <p className="text-xs text-gray-600">505 Pt</p>
        </div>
        <div className="bg-white p-4 rounded-lg mt-2 shadow flex justify-between">
          <p className="font-bold">Mayor Fred</p>
          <p className="text-xs text-gray-600">501 Pt</p>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="fixed bottom-0 w-full max-w-md bg-[#46178F] shadow-lg py-3 px-4 flex justify-around rounded-t-2xl">
        <Link href="/home">
          <Image src="/home-icon.png" alt="Home" width={28} height={28} />
        </Link>
        <Link href="/coin-history">
          <Image src="/coin-icon.png" alt="Coin History" width={28} height={28} />
        </Link>
        <div className="bg-purple-700 text-white w-12 h-12 rounded-full flex items-center justify-center">
          <span className="text-xl">+</span>
        </div>
        <Link href="/wallet">
          <Image src="/wallet-icon.png" alt="Wallet" width={28} height={28} />
        </Link>
        <Link href="/profile">
          <Image src="/profile-icon.png" alt="Profile" width={28} height={28} />
        </Link>
      </div>
    </div>
  );
}
