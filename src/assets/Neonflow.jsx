import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LegalFlowPage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Neon floating legal documents with more dynamic effects
  const FloatingDocuments = () => {
    const docs = ['⚖️', '📜', '🔖', '📑', '📃', '🗂️', '📚', '🔍', '🧾'];
    return (
      <>
        {[...Array(18)].map((_, i) => {
          const randomDoc = docs[Math.floor(Math.random() * docs.length)];
          const colorHue = Math.floor(Math.random() * 60) + 200; // Blue-purple range
          return (
            <motion.div
              key={i}
              className="absolute pointer-events-none"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 16 + 12}px`, // Reduced base size
                zIndex: 0,
                filter: `drop-shadow(0 0 8px hsla(${colorHue}, 100%, 50%, 0.7))`,
                color: `hsl(${colorHue}, 100%, 70%)`
              }}
              animate={{
                y: [window.innerHeight + 100, -150],
                x: [0, (Math.random() - 0.5) * 200], // Reduced horizontal movement
                rotateX: [0, Math.random() * 360],
                rotateZ: [0, Math.random() * 720],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: Math.random() * 25 + 20,
                repeat: Infinity,
                repeatDelay: Math.random() * 15,
                ease: "linear",
              }}
            >
              {randomDoc}
            </motion.div>
          );
        })}
      </>
    );
  };

  // Sections data with neon color themes
  const sections = [
    {
      title: "⚡ Empower Your Legal Mind",
      description: "Unlock the power of AI-driven insights and take charge of your legal research with TALQS",
      image: "src/assets/WhatsApp Image 2025-04-23 at 13.05.07_43d1ca11.jpg",
      color: "purple",
      gradient: "from-purple-600 via-blue-500 to-cyan-400",
      path: "/qachatbot",
      icon: "💡"
    },
    {
      title: "🌀 Simplify Legal Complexity",
      description: "Our modular architecture gives you the flexibility to create or use packages that fit your needs",
      image: "src/assets/WhatsApp Image 2025-04-23 at 14.09.21_46f30497.jpg",
      color: "blue",
      gradient: "from-blue-500 via-indigo-500 to-purple-600",
      path: "/api/summarize",
      reverse: true,
      icon: "🧩"
    },
    {
      title: "🔮 Law at Your Fingertips",
      description: "Ask, search, and explore IPC sections, legal summaries, and more — effortlessly",
      image: "src/assets/WhatsApp Image 2025-04-23 at 14.08.07_27b14471.jpg",
      color: "cyan",
      gradient: "from-cyan-400 via-blue-500 to-indigo-600",
      path: "/explore",
      icon: "✨"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans relative overflow-hidden">
      {/* Animated background layers */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <FloatingDocuments />
        
        {/* Animated neon scales - Hidden on mobile */}
        <motion.div 
          className="hidden sm:block absolute top-1/3 left-1/4 text-6xl sm:text-8xl"
          style={{
            filter: "drop-shadow(0 0 12px rgba(139, 92, 246, 0.7))",
            color: "#8b5cf6"
          }}
          animate={{ 
            rotate: [0, 15, -15, 0],
            y: [0, -40, 40, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity, 
            repeatType: "mirror" 
          }}
        >
          ⚖️
        </motion.div>
        
        {/* Pulsing neon gavel - Hidden on mobile */}
        <motion.div 
          className="hidden sm:block absolute bottom-1/3 right-1/4 text-5xl sm:text-7xl"
          style={{
            filter: "drop-shadow(0 0 10px rgba(6, 182, 212, 0.7))",
            color: "#06b6d4"
          }}
          animate={{ 
            scale: [1, 1.4, 1],
            rotate: [-20, 10, -20]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        >
          🔨
        </motion.div>
        
        {/* Animated connection lines - Hidden on mobile */}
        <svg className="hidden sm:block absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M100,100 C300,50 500,150 700,100"
            stroke="url(#neonGradient1)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="10 5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1, strokeDashoffset: [0, -100] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M50,300 C200,400 600,200 800,350"
            stroke="url(#neonGradient2)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="8 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1, strokeDashoffset: [0, -80] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 5 }}
          />
          <defs>
            <linearGradient id="neonGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="neonGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero section */}
        <motion.header 
          className="pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 md:px-8 lg:px-16 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-3xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-4 sm:mb-6 leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Legal<span className="text-white">Flow</span>
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            Revolutionizing legal research with AI-powered tools and neon-inspired interfaces
          </motion.p>
          
          {/* Animated scanning line */}
          <motion.div 
            className="h-px w-0 mx-auto mt-8 sm:mt-12 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            initial={{ width: 0 }}
            animate={{ width: "80%" }}
            transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
          />
        </motion.header>

        {sections.map((section, index) => (
          <React.Fragment key={index}>
            {/* Animated neon divider */}
            {index > 0 && (
              <motion.div 
                className={`w-full h-px my-12 sm:my-24 bg-gradient-to-r from-transparent via-${section.color}-400 to-transparent`}
                style={{
                  boxShadow: `0 0 15px ${section.color === 'purple' ? '#8b5cf6' : section.color === 'blue' ? '#3b82f6' : '#06b6d4'}`
                }}
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
              />
            )}

            {/* Section */}
            <motion.section 
              className={`flex flex-col ${section.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center justify-center py-8 sm:py-16 px-4 md:px-8 lg:px-16 gap-6 sm:gap-12 max-w-7xl mx-auto`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            >
              {/* Text content */}
              <motion.div 
                className="max-w-md sm:max-w-xl relative px-2 sm:px-0"
                whileHover={{ x: section.reverse ? -10 : 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute -left-4 sm:-left-6 -top-4 sm:-top-6 text-2xl sm:text-4xl opacity-70">
                  {section.icon}
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {section.title}
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8">
                  {section.description}
                </p>
                
              </motion.div>

              {/* Image card with neon border */}
              <motion.div 
                className={`relative w-full max-w-xs sm:max-w-md h-48 sm:h-64 md:h-80 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-${section.color}-400/50 shadow-[0_0_20px_${section.color}-500/20] sm:shadow-[0_0_30px_${section.color}-500/30] group`}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img 
                  src={section.image} 
                  alt={section.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-${section.color}-900/70 via-transparent to-transparent`}></div>
                <div className={`absolute inset-0 border-2 border-${section.color}-400/30 rounded-xl sm:rounded-2xl m-1 pointer-events-none`}></div>
                <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${section.gradient}`}></div>
                {/* Animated border effect */}
                <div className={`absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-transparent group-hover:border-${section.color}-400/50 group-hover:shadow-[0_0_15px_${section.color}-500/30] sm:group-hover:shadow-[0_0_20px_${section.color}-500/50] transition-all duration-500 pointer-events-none`}></div>
              </motion.div>
            </motion.section>
          </React.Fragment>
        ))}
      </div>

      {/* Floating CTA with particle effect */}
      <motion.div 
        className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <button 
          className="px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white text-sm sm:text-base font-medium shadow-lg hover:shadow-purple-500/40 transition-all flex items-center gap-2 relative overflow-hidden group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="relative z-10 flex items-center">
            Back to Top
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ↑
            </motion.div>
          </span>
          {/* Particle burst effect on hover */}
          <span className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute block w-1 h-1 bg-white rounded-full"
                initial={{ opacity: 0 }}
                whileHover={{
                  opacity: [0, 0.8, 0],
                  x: Math.cos((i * 45) * Math.PI / 180) * 20,
                  y: Math.sin((i * 45) * Math.PI / 180) * 20,
                  transition: { duration: 0.7 }
                }}
                style={{
                  left: '50%',
                  top: '50%',
                }}
              />
            ))}
          </span>
        </button>
      </motion.div>

      {/* Footer with animated connection nodes */}
      <footer className="relative py-8 sm:py-12 px-4 md:px-8 lg:px-16 text-center border-t border-gray-800 mt-12 sm:mt-24">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Ready to Transform Your Legal Research?
          </h3>
          <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8">
            Join thousands of legal professionals who are already using LegalFlow to streamline their workflow
          </p>
          
        </div>
        
        {/* Connection nodes - Hidden on mobile */}
        <div className="hidden sm:block absolute top-0 left-1/2 w-3 h-3 rounded-full bg-cyan-400 transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_#06b6d4]"></div>
        <div className="hidden sm:block absolute top-0 left-1/4 w-2 h-2 rounded-full bg-purple-400 transform -translate-y-1/2 shadow-[0_0_10px_#8b5cf6]"></div>
        <div className="hidden sm:block absolute top-0 right-1/4 w-2 h-2 rounded-full bg-blue-400 transform -translate-y-1/2 shadow-[0_0_10px_#3b82f6]"></div>
      </footer>
    </div>
  );
};

export default LegalFlowPage;
