import React, { useEffect, useState } from "react";
import {
  FaGavel,
  FaBalanceScale,
  FaBook,
  FaUserTie
} from "react-icons/fa";

const HeroSection = () => {
  const [username, setUsername] = useState("Guest");

  useEffect(() => {
    const storedName = localStorage.getItem("talqsUser");
    if (storedName) {
      setUsername(storedName);
    }
  }, []);

  return (
    <section className="min-h-screen w-full bg-[#0a0a0a] text-white px-6 sm:px-10 pt-24 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-start justify-between h-full pt-12">
        
        {/* Left Side - Fade In Animation */}
        <div className="w-full md:w-3/5 text-left mb-12 md:mb-0 mt-10 animate-fade-in">
          <br/><br/><br/>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 leading-tight">
            Welcome, <span className="text-[#00ffff] drop-shadow-[0_0_25px_#00ffff]">{username}</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-6 max-w-2xl leading-relaxed">
            Navigate your legal world with intelligence. Smart legal Q&A. Precise document summarization. AI powered. Secure.
          </p>
          <ul className="text-gray-400 text-lg sm:text-xl mb-8 list-disc list-inside space-y-2">
            <li>Real-time AI Legal Support</li>
            <li>Trusted Summaries with Legal Context</li>
            <li>Confidential & Encrypted Sessions</li>
          </ul>
          <button className="mt-4 px-6 sm:px-8 py-4 text-lg sm:text-xl rounded-xl text-[#00ffff] border-2 border-[#00ffff] bg-transparent hover:bg-[#00ffff1a] hover:scale-105 transition duration-300 shadow-xl">
            Get Started
          </button>
        </div>

        {/* Right Side - Lawyer Icons */}
        <div className="w-full md:w-2/5 flex flex-col items-center justify-start mt-10">
          <div className="relative w-full max-w-md aspect-[3/4] flex items-center justify-center">
            <div className="absolute bottom-0 w-[80%] h-14 sm:h-16 bg-[#1a1a1a] rounded-full shadow-[0_0_90px_rgba(0,255,255,0.3)] border-2 border-cyan-400"></div>
            <div className="absolute top-[10%] left-1/2 transform -translate-x-1/2 text-[5rem] sm:text-[6rem] text-white drop-shadow-xl z-10 animate-float">
              <FaUserTie className="text-[#cccccc]" />
            </div>
            <div className="absolute bottom-[38%] left-[5%] text-[4rem] sm:text-[5rem] text-white hover:animate-book-flip">
              <FaBook />
            </div>
            <div className="absolute bottom-[40%] left-1/2 transform -translate-x-1/2 text-[5rem] sm:text-[6rem] text-white rotate-[20deg]">
              <FaGavel />
            </div>
            <div className="absolute bottom-[38%] right-[5%] text-[4rem] sm:text-[5rem] text-white hover:animate-bounce">
              <FaBalanceScale />
            </div>
            <div className="absolute top-[25%] left-[10%] w-20 h-20 border-t-2 border-l-2 border-cyan-500 animate-pulse hidden sm:block"></div>
            <div className="absolute bottom-[20%] right-[8%] w-16 h-16 border-b-2 border-r-2 border-cyan-500 animate-pulse hidden sm:block"></div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(-50%, 0); }
          50% { transform: translate(-50%, -10px); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes bookFlip {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(10deg); }
          100% { transform: rotateY(0deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .hover\\:animate-bounce:hover {
          animation: bounce 0.8s ease-in-out infinite;
        }
        .hover\\:animate-book-flip:hover {
          animation: bookFlip 1.5s ease-in-out infinite;
          transform-origin: left;
        }
        .animate-fade-in {
          animation: fadeIn 1.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
