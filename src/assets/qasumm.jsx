import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ExploreModelsFlow = () => {
  const navigate = useNavigate();

  const handleqaclick = () => {
    navigate("/qachatbot");
  };

  const handlesumclick = () => {
    navigate("/summarization");
  };

  // Floating legal elements for background
  const FloatingLegalElements = () => {
    const legalSymbols = ['⚖️', '🔨', '📜', '📚', '👨‍⚖️', '👩‍⚖️', '🏛️'];
    return (
      <>
        {[...Array(15)].map((_, i) => {
          const randomSymbol = legalSymbols[Math.floor(Math.random() * legalSymbols.length)];
          return (
            <motion.div
              key={i}
              className="absolute text-white/10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 30 + 20}px`,
                zIndex: 0,
              }}
              animate={{
                y: [window.innerHeight, -100],
                x: [0, (Math.random() - 0.5) * 200],
                rotate: [0, Math.random() * 360],
                opacity: [0, 0.4, 0],
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                repeatDelay: Math.random() * 5,
                ease: "linear",
              }}
            >
              {randomSymbol}
            </motion.div>
          );
        })}
      </>
    );
  };

  return (
    <div className="w-full min-h-screen bg-[#0a0e17] flex flex-col items-center justify-start px-4 py-16 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <FloatingLegalElements />
        
        {/* Animated grid overlay */}
        <div className="absolute inset-0 bg-grid-white/[0.02]"></div>
      </div>

      {/* Flow SVG Lines */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1600 1000" preserveAspectRatio="none">
        <defs>
          <linearGradient id="qaLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7b61ff" />
            <stop offset="100%" stopColor="#ff00ff" />
          </linearGradient>
          <linearGradient id="sumLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7b61ff" />
            <stop offset="100%" stopColor="#00ff99" />
          </linearGradient>
          <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Path to Q/A Card */}
        <motion.path
           initial={{ pathLength: 0 }}
           animate={{ pathLength: 1, strokeDashoffset: -20 }}
           transition={{ 
             duration: 1.5, 
             repeat: Infinity, 
             ease: "linear" 
           }}
           d="M800,240 C700,320 580,440 400,540"
           stroke="url(#qaLine)"
           strokeWidth="4"
           fill="none"
           strokeLinecap="round"
           filter="url(#glow)"
           strokeDasharray="10 10"
            // filter="url(#glow)"
        />

        {/* Path to Summarization Card */}
        <motion.path
          
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1, strokeDashoffset: -20 }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            repeatDelay: 0.3,
            ease: "linear" 
          }}
          d="M800,240 C900,320 1020,440 1200,540"
          stroke="url(#sumLine)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          filter="url(#glow)"
          strokeDasharray="10 10"
        />
        
      </svg>

      {/* Center Node */}
      <motion.div 
        className="z-10 mb-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-[#121a2a]/90 border-2 border-cyan-400/50 rounded-xl p-8 shadow-2xl backdrop-blur-lg w-96 h-48 flex items-center justify-center text-center">
          <motion.h1 
            className="text-4xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "linear",
            }}
          >
            Explore Legal Models
          </motion.h1>
        </div>
      </motion.div>

      {/* Cards Row */}
      <div className="w-full flex flex-col lg:flex-row items-center justify-around gap-12 lg:gap-20 z-10 mt-12 px-4">
        {/* Q/A Card */}
        <motion.div 
          className="w-full max-w-md lg:w-[30rem] h-80 bg-[#121a2a]/90 border-2 border-fuchsia-400/50 rounded-2xl p-8 text-center backdrop-blur-lg shadow-xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          whileHover={{ y: -10 }}
        >
          <div className="flex justify-center mb-4">
            <div className="text-5xl">💬</div>
          </div>
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-fuchsia-300 to-pink-300 bg-clip-text text-transparent">
            Legal Q/A Model
          </h2>
          <p className="text-lg mb-6 text-white/80">
            Get precise answers to your legal questions with our AI-powered question answering system.
          </p>
          <motion.button
            onClick={handleqaclick}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-fuchsia-500 to-pink-600 hover:from-fuchsia-400 hover:to-pink-500 text-white font-medium shadow-lg hover:shadow-fuchsia-500/30 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ask Legal Questions
          </motion.button>
        </motion.div>

        {/* Summarization Card */}
        <motion.div 
          className="w-full max-w-md lg:w-[30rem] h-80 bg-[#121a2a]/90 border-2 border-green-400/50 rounded-2xl p-8 text-center backdrop-blur-lg shadow-xl mt-12 lg:mt-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{ y: -10 }}
        >
          <div className="flex justify-center mb-4">
            <div className="text-5xl">📝</div>
          </div>
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-300 to-teal-300 bg-clip-text text-transparent">
            Document Summarization
          </h2>
          <p className="text-lg mb-6 text-white/80">
            Quickly digest lengthy legal documents with AI-generated summaries highlighting key points.
          </p>
          <motion.button
            onClick={handlesumclick}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-400 hover:to-teal-500 text-white font-medium shadow-lg hover:shadow-green-500/30 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Summarize Documents
          </motion.button>
        </motion.div>
      </div>

      {/* Decorative animated elements */}
      <motion.div 
        className="absolute top-1/4 left-1/4 text-6xl text-white/20"
        animate={{ 
          rotate: [0, 15, -15, 0],
          y: [0, -20, 20, 0] 
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity, 
          repeatType: "mirror" 
        }}
      >
        ⚖️
      </motion.div>
      
      <motion.div 
        className="absolute bottom-1/4 right-1/4 text-6xl text-white/20"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, -15, 15, 0]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      >
        🔨
      </motion.div>
    </div>
  );
};

export default ExploreModelsFlow;