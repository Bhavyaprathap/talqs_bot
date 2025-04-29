import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaUser, FaUserTie, FaChild, FaUserPlus, FaChevronLeft } from 'react-icons/fa';

const NetflixStyleWelcome = ({ onComplete }) => {
  const controls = useAnimation();
  const [displayText, setDisplayText] = useState('');
  const fullText = 'TALQS';

  useEffect(() => {
    const animate = async () => {
      // Initial delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Letter by letter reveal
      for (let i = 0; i <= fullText.length; i++) {
        setDisplayText(fullText.substring(0, i));
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      
      // Bounce animation
      await controls.start({
        scale: [1, 1.1, 1],
        transition: { duration: 0.5 }
      });
      
      // Final delay before proceeding
      await new Promise(resolve => setTimeout(resolve, 1000));
      onComplete();
    };
    
    animate();
  }, [controls, onComplete]);

  return (
    <div className="fixed inset-0 bg-[#0a0e17] flex flex-col items-center justify-center z-50 overflow-hidden">
      {/* Floating legal icons with curved paths */}
      {['⚖️', '📜', '🔨', '👨‍⚖️', '🏛️'].map((icon, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl"
          initial={{
            x: -100,
            y: window.innerHeight / 2,
            opacity: 0
          }}
          animate={{
            x: [null, window.innerWidth / 2, window.innerWidth + 100],
            y: [
              window.innerHeight / 2,
              window.innerHeight / 3,
              window.innerHeight / 2
            ],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3 + index,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: index * 0.5,
            times: [0, 0.5, 1]
          }}
        >
          {icon}
        </motion.div>
      ))}
      
      {/* Main logo reveal */}
      <motion.div
        className="relative"
        animate={controls}
      >
        <motion.h1 
          className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          style={{ 
            fontFamily: "'Bebas Neue', cursive",
            textShadow: '0 0 20px rgba(102, 126, 234, 0.5)'
          }}
        >
          {displayText.split('').map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.3,
                delay: i * 0.3
              }}
              style={{ display: 'inline-block' }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>
        
        {/* Subtitle */}
        {displayText === fullText && (
          <motion.p 
            className="text-center text-white/80 mt-4 text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            Your Legal Intelligence Platform
          </motion.p>
        )}
      </motion.div>
      
      {/* Loading bar */}
      <motion.div 
        className="absolute bottom-20 left-0 right-0 mx-auto h-1 bg-white/20 max-w-md"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 3, delay: 0.5 }}
      >
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-400 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 3, delay: 0.5 }}
        />
      </motion.div>
    </div>
  );
};

const carouselItems = [
  {
    src: 'https://img.icons8.com/external-filled-outline-wichaiwi/256/external-law-legal-filled-outline-wichaiwi-7.png',
    alt: 'Law Book',
    caption: 'Comprehensive Legal Knowledge'
  },
  {
    src: 'https://img.icons8.com/external-filled-outline-wichaiwi/256/external-contract-legal-filled-outline-wichaiwi-10.png',
    alt: 'Contract',
    caption: 'Smart Contract Analysis'
  },
  {
    src: 'https://img.icons8.com/external-filled-outline-wichaiwi/256/external-judge-legal-filled-outline-wichaiwi-9.png',
    alt: 'Judge',
    caption: 'Case Law Insights'
  },
];

// Sample profiles data
const sampleProfiles = [
  { id: 1, name: 'Bhavya reddy', role: 'Attorney', icon: <FaUserTie className="text-blue-400" /> },
  { id: 2, name: 'MsDhoni', role: 'Lawyer', icon: <FaChild className="text-purple-400" /> },
];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  const [newProfileRole, setNewProfileRole] = useState('Attorney');
  const [showWelcome, setShowWelcome] = useState(false);
  const navigate = useNavigate();

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    navigate('/');
  };

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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Simulate successful login
      const data = { token: 'simulated_token', username: email };
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('account_email', email);
      setIsAuthenticated(true);
      
      // Load profiles for this account
      setProfiles(sampleProfiles);
    } catch (err) {
      console.error('Login Error:', err);
      alert('Server error.');
    }
  };

  const handleProfileSelect = (profileId) => {
    localStorage.setItem('current_profile_id', profileId);
    localStorage.setItem('current_profile_name', profiles.find(p => p.id === profileId).name);
    setShowWelcome(true);
  };

  const handleAddProfile = (e) => {
    e.preventDefault();
    if (!newProfileName.trim()) return;
    
    const newProfile = {
      id: profiles.length + 1,
      name: newProfileName,
      role: newProfileRole,
      icon: newProfileRole === 'Child' ? <FaChild className="text-purple-400" /> : <FaUserTie className="text-blue-400" />
    };
    
    setProfiles([...profiles, newProfile]);
    setNewProfileName('');
    setShowProfileForm(false);
  };

  const BackgroundAnimations = () => (
    <div className="absolute inset-0 overflow-hidden z-0">
      <FloatingLegalElements />
      
      <motion.div 
        className="absolute top-1/4 left-1/4 text-8xl text-white/30"
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
      
      <motion.div 
        className="absolute bottom-1/3 right-1/4 text-7xl text-white/30"
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
      
      <motion.div 
        className="absolute top-1/3 right-1/5 text-6xl text-white/25"
        animate={{ 
          y: [0, -40, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      >
        📚
      </motion.div>
      
      <motion.div 
        className="absolute inset-0 bg-grid-white/[0.02]"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%']
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      ></motion.div>
    </div>
  );

  if (showWelcome) {
    return <NetflixStyleWelcome onComplete={handleWelcomeComplete} />;
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0e17] px-4 py-10 overflow-hidden relative">
        <BackgroundAnimations />
        
        {/* Profile selection container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col bg-[#121a2a]/95 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden max-w-md w-full border border-[#2a3a5a] relative z-10 p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <motion.div 
              className="text-4xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent"
            >
              Select Profile
            </motion.div>
            <button 
              onClick={() => {
                localStorage.removeItem('token');
                setIsAuthenticated(false);
              }}
              className="text-sm text-blue-300 hover:text-blue-200"
            >
              Sign out
            </button>
          </div>
          
          <motion.p 
            className="text-center text-white/70 mb-8"
          >
            Who's using this account?
          </motion.p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            {profiles.map(profile => (
              <motion.div
                key={profile.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center justify-center p-4 bg-[#1e293b]/80 rounded-xl border border-[#334155] cursor-pointer hover:border-blue-400/50 transition-all"
                onClick={() => handleProfileSelect(profile.id)}
              >
                <div className="w-16 h-16 flex items-center justify-center text-3xl bg-[#0f172a] rounded-full mb-3">
                  {profile.icon}
                </div>
                <h3 className="text-white font-medium">{profile.name}</h3>
                <p className="text-xs text-white/60">{profile.role}</p>
              </motion.div>
            ))}
            
            {!showProfileForm && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center justify-center p-4 bg-[#1e293b]/30 rounded-xl border border-dashed border-[#334155] cursor-pointer hover:border-blue-400/50 transition-all"
                onClick={() => setShowProfileForm(true)}
              >
                <div className="w-16 h-16 flex items-center justify-center text-3xl text-white/60 bg-[#0f172a] rounded-full mb-3">
                  <FaUserPlus />
                </div>
                <h3 className="text-white/80 font-medium">Add Profile</h3>
              </motion.div>
            )}
          </div>
          
          {showProfileForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium">Add New Profile</h3>
                <button 
                  onClick={() => setShowProfileForm(false)}
                  className="text-white/60 hover:text-white"
                >
                  <FaChevronLeft />
                </button>
              </div>
              
              <form onSubmit={handleAddProfile}>
                <div className="mb-4">
                  <label className="block text-sm text-white/80 mb-2">Profile Name</label>
                  <input
                    type="text"
                    value={newProfileName}
                    onChange={(e) => setNewProfileName(e.target.value)}
                    className="w-full px-4 py-2 bg-[#1e293b]/80 text-white placeholder-white/40 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/30 transition-all"
                    placeholder="Enter profile name"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm text-white/80 mb-2">Profile Type</label>
                  <select
                    value={newProfileRole}
                    onChange={(e) => setNewProfileRole(e.target.value)}
                    className="w-full px-4 py-2 bg-[#1e293b]/80 text-white rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/30 transition-all"
                  >
                    <option value="Attorney">Attorney</option>
                    <option value="Paralegal">Paralegal</option>
                    <option value="Child">Child</option>
                    <option value="Guest">Guest</option>
                  </select>
                </div>
                
                <button
                  type="submit"
                  className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 transition-all text-white font-medium shadow-lg hover:shadow-blue-500/30"
                >
                  Create Profile
                </button>
              </form>
            </motion.div>
          )}
          
          <p className="text-xs text-center text-white/50 mt-6">
            Each profile maintains separate settings and preferences.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0e17] px-4 py-10 overflow-hidden relative">
      <BackgroundAnimations />

      {/* Login form container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row bg-[#121a2a]/95 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden max-w-5xl w-full border border-[#2a3a5a] relative z-10"
      >
        {/* Carousel section */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-gradient-to-br from-[#0f172a]/90 to-[#1e293b]/90 p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
              TALQS Legal Assistant
            </h3>
            <Carousel
              autoPlay
              infiniteLoop
              showThumbs={false}
              showStatus={false}
              showIndicators={false}
              interval={4000}
              transitionTime={800}
              swipeable
              emulateTouch
              className="w-full max-w-xs"
            >
              {carouselItems.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  className="flex flex-col items-center justify-center h-64"
                  whileHover={{ scale: 1.03 }}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-40 object-contain filter drop-shadow-lg"
                  />
                  <motion.p 
                    className="mt-4 text-white/80 text-center px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {item.caption}
                  </motion.p>
                </motion.div>
              ))}
            </Carousel>
            <motion.p 
              className="mt-6 text-white/70 text-sm text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Your AI-powered legal research assistant
            </motion.p>
          </motion.div>
        </div>

        {/* Form section */}
        <div className="w-full md:w-1/2 p-8 md:p-10 text-white">
          <motion.div 
            className="flex items-center justify-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div 
              className="text-5xl mr-3"
              animate={{ 
                rotate: [0, 10, -10, 0],
                y: [0, -5, 5, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "mirror"
              }}
            >
              ⚖️
            </motion.div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
              Legal Portal
            </h2>
          </motion.div>
          
          <motion.p 
            className="text-center text-white/70 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Access your legal research tools
          </motion.p>
          
          <form className="space-y-5" onSubmit={handleLogin}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="legal@firm.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#1e293b]/80 text-white placeholder-white/40 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/30 transition-all"
                required
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
            >
              <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#1e293b]/80 text-white placeholder-white/40 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/30 transition-all"
                required
              />
            </motion.div>

            <motion.div 
              className="flex justify-between items-center text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <label className="flex items-center text-white/70">
                <input 
                  type="checkbox" 
                  className="mr-2 bg-[#1e293b] border-[#334155] rounded text-blue-400 focus:ring-blue-400/50" 
                />
                Remember credentials
              </label>
              <Link 
                to="/forgot-password" 
                className="text-blue-300 hover:text-blue-200 transition-colors"
              >
                Forgot password?
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 transition-all text-white font-medium shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2 group"
              >
                <span>Authenticate</span>
                <motion.svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                  animate={{
                    x: [0, 5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                >
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </motion.svg>
              </button>
            </motion.div>
          </form>

          <motion.div 
            className="mt-8 pt-5 border-t border-[#334155]/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            <p className="text-sm text-center text-white/60">
              Not registered yet?{' '}
              <Link 
                to="/signup" 
                className="text-blue-300 hover:text-blue-200 font-medium transition-colors hover:underline"
              >
                Request access
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}