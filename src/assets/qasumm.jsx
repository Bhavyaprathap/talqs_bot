import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ExploreModelsFlow = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const handleqaclick = () => {
    navigate("/api/search");
  };

  const handlesumclick = () => {
    navigate("/api/summarize");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % 2);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isMobile]);

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

  const cards = [
    {
      id: 'qa',
      emoji: '💬',
      title: 'Legal Q/A Model',
      gradient: 'from-fuchsia-300 to-pink-300',
      border: 'border-fuchsia-400/50',
      button: 'from-fuchsia-500 to-pink-600 hover:from-fuchsia-400 hover:to-pink-500',
      shadow: 'hover:shadow-fuchsia-500/30',
      description: 'Get precise answers to your legal questions with our AI-powered question answering system.',
      action: handleqaclick,
      buttonText: 'Ask Legal Questions'
    },
    {
      id: 'sum',
      emoji: '📝',
      title: 'Legal Summarization',
      gradient: 'from-green-300 to-teal-300',
      border: 'border-green-400/50',
      button: 'from-green-500 to-teal-600 hover:from-green-400 hover:to-teal-500',
      shadow: 'hover:shadow-green-500/30',
      description: 'Quickly digest lengthy legal documents with AI-generated summaries highlighting key points.',
      action: handlesumclick,
      buttonText: 'Summarize Text'
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#0a0e17] flex flex-col items-center justify-start px-4 py-8 md:py-16 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <FloatingLegalElements />
        <div className="absolute inset-0 bg-grid-white/[0.02]"></div>
      </div>

      {/* Flow SVG Lines - Hidden on mobile */}
      {!isMobile && (
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

          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1, strokeDashoffset: -20 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            d="M800,240 C700,320 580,440 400,540"
            stroke="url(#qaLine)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            filter="url(#glow)"
            strokeDasharray="10 10"
          />

          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1, strokeDashoffset: -20 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.3, ease: "linear" }}
            d="M800,240 C900,320 1020,440 1200,540"
            stroke="url(#sumLine)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            filter="url(#glow)"
            strokeDasharray="10 10"
          />
        </svg>
      )}

      {/* Center Node */}
      <motion.div 
        className="z-10 mb-8 md:mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-[#121a2a]/90 border-2 border-cyan-400/50 rounded-xl p-6 md:p-8 shadow-2xl backdrop-blur-lg w-80 md:w-96 h-40 md:h-48 flex items-center justify-center text-center">
          <motion.h1 
            className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent"
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

      {/* Cards Container */}
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-20 z-10 mt-8 md:mt-12 px-4 relative">
        {/* Mobile Carousel */}
        {isMobile ? (
          <div className="w-full overflow-hidden relative">
            <motion.div
              className="flex"
              animate={{
                x: `-${activeIndex * 100}%`,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {cards.map((card) => (
                <div key={card.id} className="w-full flex-shrink-0 px-2">
                  <motion.div 
                    className="w-full h-72 bg-[#121a2a]/90 border-2 rounded-2xl p-6 text-center backdrop-blur-lg shadow-xl"
                    style={{ borderColor: card.border }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex justify-center mb-3">
                      <div className="text-4xl">{card.emoji}</div>
                    </div>
                    <h2 className={`text-2xl font-bold mb-3 bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}>
                      {card.title}
                    </h2>
                    <p className="text-base mb-4 text-white/80">
                      {card.description}
                    </p>
                    <motion.button
                      onClick={card.action}
                      className={`w-full py-2 rounded-lg bg-gradient-to-r ${card.button} text-white font-medium shadow-lg ${card.shadow} transition-all`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {card.buttonText}
                    </motion.button>
                  </motion.div>
                </div>
              ))}
            </motion.div>
            
            {/* Carousel Indicators */}
            <div className="flex justify-center mt-4 gap-2">
              {cards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${activeIndex === index ? 'bg-white w-6' : 'bg-white/30'}`}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Desktop Layout */
          <>
            {cards.map((card) => (
              <motion.div 
                key={card.id}
                className="w-full max-w-md lg:w-[30rem] h-72 lg:h-80 bg-[#121a2a]/90 border-2 rounded-2xl p-6 lg:p-8 text-center backdrop-blur-lg shadow-xl"
                style={{ borderColor: card.border }}
                initial={{ opacity: 0, x: card.id === 'qa' ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: card.id === 'qa' ? 0.5 : 0.8 }}
                whileHover={{ y: -10 }}
              >
                <div className="flex justify-center mb-4">
                  <div className="text-4xl lg:text-5xl">{card.emoji}</div>
                </div>
                <h2 className={`text-2xl lg:text-3xl font-bold mb-3 lg:mb-4 bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}>
                  {card.title}
                </h2>
                <p className="text-base lg:text-lg mb-4 lg:mb-6 text-white/80">
                  {card.description}
                </p>
                <motion.button
                  onClick={card.action}
                  className={`w-full py-2 lg:py-3 rounded-lg bg-gradient-to-r ${card.button} text-white font-medium shadow-lg ${card.shadow} transition-all`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {card.buttonText}
                </motion.button>
              </motion.div>
            ))}
          </>
        )}
      </div>

      {/* Decorative animated elements */}
      <motion.div 
        className="hidden md:block absolute top-1/4 left-1/4 text-6xl text-white/20"
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
        className="hidden md:block absolute bottom-1/4 right-1/4 text-6xl text-white/20"
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
