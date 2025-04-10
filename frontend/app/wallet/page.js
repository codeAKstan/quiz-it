"use client"

import { ArrowLeft, Bell, Eye, Home, Plus, User } from "lucide-react"
import { useState } from "react"
import Link from 'next/link';

export default function MobileWallet() {
  const [showBalance, setShowBalance] = useState(true)

  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-[#0e0525] text-white font-sans">

      {/* Header */}
      <div className="px-6 py-4 flex justify-between items-center">
        <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#4b3b82] text-[#6e5bab]">
          <ArrowLeft size={24} />
        </button>
        <button className="w-10 h-10 flex items-center justify-center text-[#6e5bab]">
          <Bell size={24} />
        </button>
      </div>

      {/* Points Display */}
      <div className="px-6 mt-4 flex items-center gap-2">
        <div className="w-12 h-12 rounded-full bg-gradient-to-b from-[#8a7fc7] to-[#4b3b82] flex items-center justify-center border-2 border-[#6e5bab]">
          <span className="text-xl font-bold text-[#6e5bab]">$</span>
        </div>
        <span className="text-4xl font-bold text-[#f0e9c9]">10pt</span>
      </div>

      {/* Balance */}
      <div className="px-6 mt-8">
        <div className="text-lg text-[#9a8fc7]">Available Balance</div>
        <div className="flex items-center mt-1">
          <div className="text-6xl font-bold text-[#f0e9c9]">$0.01</div>
          <button className="ml-2 text-[#9a8fc7]" onClick={() => setShowBalance(!showBalance)}>
            <Eye size={24} />
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 mt-8 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full border border-[#4b3b82] flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17 8H7C5.9 8 5 8.9 5 10V16C5 17.1 5.9 18 7 18H17C18.1 18 19 17.1 19 16V10C19 8.9 18.1 8 17 8ZM17 16H7V10H17V16Z"
              fill="white"
            />
            <path
              d="M12 0C5.4 0 0 5.4 0 12C0 18.6 5.4 24 12 24C18.6 24 24 18.6 24 12C24 5.4 18.6 0 12 0ZM12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12C22 17.5 17.5 22 12 22Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="flex-1 h-16 rounded-full bg-[#1a1142] border border-[#4b3b82] flex items-center justify-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19 9H5V5H19M19 3H5C3.89 3 3 3.89 3 5V19C3 20.11 3.89 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.89 20.11 3 19 3Z"
              fill="white"
            />
          </svg>
          <span className="text-xl font-semibold">Request</span>
        </div>
        <div className="flex-1 h-16 rounded-full bg-[#1a1142] border border-[#4b3b82] flex items-center justify-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 9L17 5V8H10V10H17V13M7 11L3 15L7 19V16H14V14H7V11Z" fill="white" />
          </svg>
          <span className="text-xl font-semibold">Transfer</span>
        </div>
      </div>

      {/* Info Text */}
      <div className="px-6 mt-6 space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#9a8fc7]"></div>
          <span className="text-[#9a8fc7]">Minimum redeemable amount is $5.0 (5000 Pt)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#9a8fc7]"></div>
          <span className="text-[#9a8fc7]">Payout will take 3 - 5 working days</span>
        </div>
      </div>

      {/* Transaction History */}
      <div className="mt-6 flex-1 bg-[#f9f5d7] rounded-t-3xl px-6 pt-6 pb-20">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#333]">Transaction history</h2>
          <button className="text-[#666] underline">See all</button>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center mt-8">
          <div className="relative w-64 h-64">
            {/* Sparkles */}
            <div className="absolute top-0 left-1/4 text-purple-300">✦</div>
            <div className="absolute top-1/4 right-0 text-purple-300">✦</div>
            <div className="absolute bottom-0 right-1/4 text-purple-300">✦</div>
            <div className="absolute bottom-1/4 left-0 text-purple-300">✦</div>

            {/* Document with X */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-32 h-40 bg-[#5d28e0] rounded-lg transform rotate-3 flex flex-col p-3 gap-2">
                  <div className="w-full h-1.5 bg-[#ff8a9e] rounded-full"></div>
                  <div className="w-3/4 h-1.5 bg-[#f0e9c9] rounded-full"></div>
                  <div className="w-full h-1.5 bg-[#f0e9c9] rounded-full"></div>
                  <div className="w-2/3 h-1.5 bg-[#f0e9c9] rounded-full"></div>
                  <div className="w-full h-1.5 bg-[#f0e9c9] rounded-full"></div>
                  <div className="w-3/4 h-1.5 bg-[#f0e9c9] rounded-full"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-[#ff8a9e]/30 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full border-4 border-[#ff8a9e] flex items-center justify-center">
                      <div className="w-12 h-1.5 bg-[#ff8a9e] rounded-full transform rotate-45"></div>
                      <div className="w-12 h-1.5 bg-[#ff8a9e] rounded-full transform -rotate-45 absolute"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-[#333] mt-4">No Transaction!</h3>
          <p className="text-[#666] text-center mt-1">
            Participate in more quiz
            <br />
            challenges champ
          </p>
        </div>
      </div>

    
          {/* Bottom Navigation */}
          <div
            className="fixed bottom-0 left-0 right-0 flex justify-around p-2 shadow-lg bg-cover bg-center"
            style={{ backgroundImage: "url('/bottom-bg.svg')" }}
          >
            <Link href="/dashboard" className="text-[#46178F58] flex flex-col items-center">
              <img src="/home-icon.svg" alt="Home" className="w-6 h-6" />
              <p className="text-xs text-[#FBFCD8]">Home</p>
            </Link>
            
            <Link href="/coin-history" className="text-[#46178F58] flex flex-col items-center">
              <img src="/coin-icon.svg" alt="Coin History" className="w-6 h-6" />
              <p className="text-xs text-[#FBFCD8]">Coin History</p>
            </Link>
            
            <Link href="/quiz" className="relative flex flex-col items-center">
              <div className="bg-[#46178F] text-white rounded-full w-8 h-8 flex items-center justify-center absolute top-[-20px] left-[-10px]">
                <img src="/add.svg" alt="Add" className="w-6 h-6" />
              </div>
              <p className="text-xs mt-5 text-[#46178F58]">Add</p>
            </Link>
            
            <Link href="/wallet" className="text-[#46178F58] flex flex-col items-center">
              <img src="/wallet-icon.svg" alt="My Wallet" className="w-6 h-6" />
              <p className="text-xs text-[#FBFCD8]">My Wallet</p>
            </Link>
            
            <Link href="/myprofile" className="text-[#46178F] flex flex-col items-center">
              <img src="/profile-icon.svg" alt="Profile" className="w-6 h-6" />
              <p className="text-xs text-[#FBFCD8]">Profile</p>
            </Link>
          </div>
        </div>
      );
    }