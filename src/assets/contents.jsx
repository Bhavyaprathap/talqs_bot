import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBalanceScale, FaGavel, FaBook, FaUserTie, FaRobot, FaLightbulb } from 'react-icons/fa';

const ExploreModelsFlow = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);

  // Sample legal Q&A data
  const legalQuestions = [
    {
      id: 1,
      question: "How to make the most of chatbots for lawyers?",
      answer: "To leverage chatbots effectively, law firms should clearly define the chatbot\'s role, provide regular updates, integrate it with their systems, and monitor its performance.",
      icon: <FaUserTie className="text-yellow-400" />
    },
    {
      id: 2,
      question: 'Benefits of chatbots for lawyers',
      answer: 'They save time, improve client experience, provide 24/7 support, reduce operational costs, and enhance access to justice by making legal information more accessible.',
      icon: <FaLightbulb className="text-pink-400" />
    },
    {
      id: 3,
      question: 'Applications of chatbots for lawyers',
      answer: 'Legal chatbots can be used for client intake, answering FAQs, scheduling appointments, document review, and even preliminary legal advice in some cases.',
      icon: <FaBook className="text-purple-400" />
    },
    {
      id: 4,
      question: 'Ethical considerations for using chatbots for lawyers',
      answer: 'Lawyers must ensure that the chatbot respects client confidentiality, avoids unauthorized practice of law, and provides clear disclaimers about the bot\'s limitations.',
      icon: <FaBalanceScale className="text-green-400" />
    },
    {
      id:5,
      question: 'How to make the most of chatbots for lawyers',
    answer: 'To leverage chatbots effectively, law firms should clearly define the chatbot\'s role, provide regular updates, integrate it with their systems, and monitor its performance.',
    icon: <FaUserTie className="text-yellow-400" />
    },
    {
      id:6,
      question: 'Your law firm can benefit from using chatbots',
      answer: 'Chatbots can streamline law firm operations, provide better client engagement, and act as the first point of contact for potential clients, improving lead conversion.',
      icon: <FaGavel className="text-blue-400" />

    }
  ];

  // Enhanced floating legal elements for background
  const FloatingLegalElements = () => {
    const legalSymbols = ['⚖️', '🔨', '📜', '📚', '👨‍⚖️', '👩‍⚖️', '🏛️'];
    return (
      <>
        {[...Array(20)].map((_, i) => {
          const randomSymbol = legalSymbols[Math.floor(Math.random() * legalSymbols.length)];
          return (
            <motion.div
              key={i}
              className="absolute text-white/30"
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
                opacity: [0, 0.8, 0],
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
    <div className="w-full min-h-screen bg-[#0a0e17] flex flex-col items-center justify-start px-4 py-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <FloatingLegalElements />
        
        {/* Animated grid overlay */}
        <div className="absolute inset-0 bg-grid-white/[0.02]"></div>
        
        {/* Pulsing scales of justice */}
        <motion.div 
          className="absolute top-1/4 left-1/4 text-8xl text-white/20"
          animate={{ 
            rotate: [0, 15, -15, 0],
            y: [0, -30, 30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            repeatType: "mirror" 
          }}
        >
          ⚖️
        </motion.div>
        
        {/* Hammering gavel animation */}
        <motion.div 
          className="absolute bottom-1/3 right-1/4 text-7xl text-white/20"
          animate={{ 
            y: [0, 20, 0],
            rotate: [-30, 0, -30],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        >
          🔨
        </motion.div>
      </div>

      {/* Header */}
      <motion.div 
        className="z-10 mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="text-5xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent mb-4"
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
          Legal Q&A Knowledge Base
        </motion.h1>
        <p className="text-xl text-white/70 max-w-2xl">
          Browse common legal questions and their detailed answers. Click on any question to view the answer.
        </p>
      </motion.div>

      {/* Q&A Container */}
      <div className="w-full max-w-4xl z-10">
        {/* Questions List */}
        <div className="grid gap-4 mb-12">
          {legalQuestions.map((item) => (
            <motion.div
              key={item.id}
              className={`rounded-xl p-6 cursor-pointer transition-all ${activeQuestion === item.id ? 'bg-[#1e293b] border-l-4 border-cyan-400' : 'bg-[#121a2a]/90 hover:bg-[#121a2a]'}`}
              onClick={() => setActiveQuestion(item.id === activeQuestion ? null : item.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start">
                <div className={`mr-4 text-2xl ${activeQuestion === item.id ? 'text-cyan-300' : 'text-white/50'}`}>
                  {activeQuestion === item.id ? '📜' : '❓'}
                </div>
                <div>
                  <h3 className={`text-xl font-semibold mb-2 ${activeQuestion === item.id ? 'text-cyan-200' : 'text-white'}`}>
                    {item.question}
                  </h3>
                  {activeQuestion === item.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="prose prose-invert max-w-none text-white/80">
                        <p>{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected Answer Display (for larger screens) */}
        {activeQuestion && (
          <motion.div 
            className="hidden lg:block bg-[#121a2a] rounded-xl p-8 border border-cyan-400/30 shadow-lg mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-6">
              <div className="text-3xl mr-4 text-cyan-300">📜</div>
              <h3 className="text-2xl font-bold text-cyan-200">
                {legalQuestions.find(q => q.id === activeQuestion)?.question}
              </h3>
            </div>
            <div className="prose prose-invert max-w-none text-white/80 pl-16">
              <p>{legalQuestions.find(q => q.id === activeQuestion)?.answer}</p>
            </div>
          </motion.div>
        )}

        {/* Legal Disclaimer */}
        <motion.div 
          className="bg-[#121a2a]/50 border border-white/10 rounded-lg p-6 text-center text-white/60 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          ⚖️ Disclaimer: This information is for educational purposes only and does not constitute legal advice. Consult a qualified attorney for legal guidance.
        </motion.div>
      </div>

      {/* Decorative animated elements */}
      <motion.div 
        className="absolute bottom-1/4 left-1/4 text-6xl text-white/20"
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
        📚
      </motion.div>
    </div>
  );
};

export default ExploreModelsFlow;