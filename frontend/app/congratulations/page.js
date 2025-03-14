'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Congratulations() {
  const router = useRouter();

  // Redirect to the Signup Page after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/signup');
    }, 5000); 

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div
      className="flex flex-col items-center justify-center h-screen p-6"
      style={{ backgroundColor: '#46178F' }}
    >
      {/* Verified Icon */}
      <img
        src="/verified.png"
        alt="Verified"
        className="w-16 h-16 mb-4"
      />

      {/* Congratulations Message */}
      <h1 className="text-4xl font-bold text-white mb-4 text-center">
        Congratulations,
      </h1>
      <p className="text-2xl text-white mb-8 font-bold text-center">
        your <span className="text-[#FFD700]">recommended questions</span> are ready
      </p>
    </div>
  );
}