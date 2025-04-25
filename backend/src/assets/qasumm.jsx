import React from 'react';
import { useNavigate } from 'react-router-dom';

const ExploreModelsFlow = () => {
  const navigate = useNavigate();

  const handleqaclick = () => {
    navigate("/qachatbot");
  };

  const handlesumclick = () => {
    navigate("/summarization");
  };

  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-start px-4 py-16 relative overflow-hidden">

      {/* Flow SVG Lines */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1600 1000" preserveAspectRatio="none">
        <defs>
          <linearGradient id="qaLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00ffff" />
            <stop offset="100%" stopColor="#ff00ff" />
          </linearGradient>
          <linearGradient id="sumLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00ffff" />
            <stop offset="100%" stopColor="#00ff00" />
          </linearGradient>
        </defs>

        {/* C-Shaped Path to Q/A Card */}
        <path
          d="M800,240 C700,320 580,440 400,540"
          stroke="url(#qaLine)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          filter="drop-shadow(0 0 8px #ff00ff)"
        />

        {/* C-Shaped Path to Summarization Card */}
        <path
          d="M800,240 C900,320 1020,440 1200,540"
          stroke="url(#sumLine)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          filter="drop-shadow(0 0 8px #00ff00)"
        />
      </svg>
      

      {/* Center Node */}
      <div className="z-10 mb-20">
        <div className="bg-black bg-opacity-50 border-2 border-cyan-400 rounded-xl p-6 shadow-md backdrop-blur-md w-96 h-48 flex items-center justify-center text-center text-cyan-300 text-3xl font-semibold">
          Explore Models
        </div>
      </div>

      {/* Cards Row */}
      <div className="w-full flex flex-col lg:flex-row items-center justify-around gap-20 z-10 mt-12">
        {/* Q/A Card */}
        <div className="w-[30rem] h-72 bg-black bg-opacity-40 border-2 border-fuchsia-400 rounded-2xl p-6 text-center text-fuchsia-200 backdrop-blur-lg shadow-md">
          <h2 className="text-4xl font-bold mb-2">Q/A Model</h2>
          <br />
          <p className="text-lg mb-4">Interact with legal queries using our intelligent Q/A model that understands your needs.</p>
          <br />
          <button
            onClick={handleqaclick}
            className="px-6 py-3 border border-fuchsia-400 rounded-lg text-fuchsia-200 hover:bg-gradient-to-r from-fuchsia-400 to-pink-500 hover:text-white transition text-lg font-medium"
          >
            Chat Now
          </button>
        </div>

        {/* Summarization Card */}
        <div className="w-[30rem] h-72 bg-black bg-opacity-40 border-2 border-green-400 rounded-2xl p-6 text-center text-green-200 backdrop-blur-lg shadow-md">
          <h2 className="text-4xl font-bold mb-2">Summarization Model</h2>
          <br />
          <p className="text-lg mb-4">Summarize complex legal documents quickly and efficiently using AI-powered summaries.</p>
          <br />
          <button
            onClick={handlesumclick}
            className="px-6 py-3 border border-green-400 rounded-lg text-green-200 hover:bg-gradient-to-r from-green-400 to-lime-500 hover:text-white transition text-lg font-medium"
          >
            Chat Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExploreModelsFlow;
