
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaUser, FaUserTie, FaChild, FaUserPlus, FaChevronLeft } from 'react-icons/fa';

const NetflixStyleWelcome = ({ onComplete }) => {
  const controls = useAnimation();
  const [displayText, setDisplayText] = useState('');
  const [showBrokenLetters, setShowBrokenLetters] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const fullText = 'TALQS';

  useEffect(() => {
    let mounted = true;
    
    const animate = async () => {
      if (!mounted) return;
      
      // Initial delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Letter by letter reveal
      for (let i = 0; i <= fullText.length; i++) {
        if (!mounted) return;
        setDisplayText(fullText.substring(0, i));
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      
      // Bounce animation
      await controls.start({
        scale: [1, 1.1, 1],
        transition: { duration: 0.5 }
      });
      
      // Show broken letters effect
      setShowBrokenLetters(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Final delay before proceeding
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (mounted) {
        setAnimationComplete(true);
      }
    };
    
    animate();
    
    return () => {
      mounted = false;
    };
  }, [controls]);

  useEffect(() => {
    if (animationComplete) {
      onComplete();
    }
  }, [animationComplete, onComplete]);

  return (
    <div className="fixed inset-0 bg-[#0a0e17] flex flex-col items-center justify-center z-50 overflow-hidden">
      {/* Floating legal icons */}
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
          className="text-6xl md:text-9xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
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
        
        {/* Broken letters effect */}
        {showBrokenLetters && (
          <motion.div 
            className="absolute inset-0 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {fullText.split('').map((letter, i) => (
              <motion.div
                key={`broken-${i}`}
                className="text-6xl md:text-9xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mx-1"
                style={{ 
                  fontFamily: "'Bebas Neue', cursive",
                  textShadow: '0 0 20px rgba(102, 126, 234, 0.5)',
                  display: 'inline-block'
                }}
                initial={{ y: 0, opacity: 1 }}
                animate={{ 
                  y: [0, -100 + Math.random() * 200],
                  x: [0, -100 + Math.random() * 200],
                  rotate: [0, -180 + Math.random() * 360],
                  opacity: [1, 0],
                  scale: [1, 0.5 + Math.random() * 1.5]
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.1,
                  ease: "easeOut"
                }}
              >
                {letter}
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {/* Subtitle */}
        {displayText === fullText && (
          <motion.p 
            className="text-center text-white/80 mt-4 text-lg md:text-xl"
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
    src: 'src/pages/image copy 2.png',
    alt: 'Law Book',
    caption: 'Comprehensive Legal Knowledge'
  },
  {
    src: 'src/pages/Screenshot 2025-05-07 130356.png',
    alt: 'Contract',
    caption: 'Smart Contract Analysis'
  },
  {
    src: 'src/pages/image.png',
    alt: 'Judge',
    caption: 'Case Law Insights'
  },
];

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

const BackgroundAnimations = () => (
  <div className="absolute inset-0 overflow-hidden z-0">
    <FloatingLegalElements />
    
    <motion.div 
      className="absolute top-1/4 left-1/4 text-6xl md:text-8xl text-white/30"
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
      className="absolute bottom-1/3 right-1/4 text-5xl md:text-7xl text-white/30"
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
      className="absolute top-1/3 right-1/5 text-4xl md:text-6xl text-white/25"
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

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  const [newProfileRole, setNewProfileRole] = useState('Attorney');
  const [showWelcome, setShowWelcome] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [showUserSelection, setShowUserSelection] = useState(false);
  const navigate = useNavigate();

  // Load users from localStorage on component mount
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('legal_users')) || [];
    setUsers(storedUsers);
  }, []);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    navigate('/'); // Change to your main app route
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Simulate successful login
      const data = { token: 'simulated_token', username: email };
      
      // Check if user exists
      const userExists = users.some(user => user.email === email);
      
      if (!userExists) {
        // Add new user
        const newUser = {
          email,
          token: data.token,
          profiles: [],
          name: email.split('@')[0] // Extract name from email
        };
        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        localStorage.setItem('legal_users', JSON.stringify(updatedUsers));
        setCurrentUser(newUser);
        setIsNewUser(true);
      } else {
        // Set existing user as current
        const existingUser = users.find(user => user.email === email);
        setCurrentUser(existingUser);
        setProfiles(existingUser.profiles || []);
        setIsNewUser(false);
      }
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('account_email', email);
      setIsAuthenticated(true);
      
      // Show user selection if multiple users exist
      if (users.length > 1) {
        setShowUserSelection(true);
      } else {
        // Proceed to profile selection or welcome screen
        if (currentUser?.profiles?.length > 0 || (!isNewUser && profiles.length > 0)) {
          setShowWelcome(true);
        }
      }
    } catch (err) {
      console.error('Login Error:', err);
      alert('Server error.');
    }
  };

  const handleUserSelect = (userEmail) => {
    const selectedUser = users.find(user => user.email === userEmail);
    setCurrentUser(selectedUser);
    setProfiles(selectedUser.profiles || []);
    setShowUserSelection(false);
    
    localStorage.setItem('token', selectedUser.token);
    localStorage.setItem('account_email', selectedUser.email);
    
    if (selectedUser.profiles?.length > 0) {
      setShowWelcome(true);
    } else {
      setIsNewUser(true);
    }
  };

  const handleAddNewUser = () => {
    setShowUserSelection(false);
    setCurrentUser(null);
    setIsNewUser(false);
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
  };

  const handleProfileSelect = (profileId) => {
    localStorage.setItem('current_profile_id', profileId);
    const selectedProfile = profiles.find(p => p.id === profileId);
    localStorage.setItem('current_profile_name', selectedProfile.name);
    localStorage.setItem('current_profile_role', selectedProfile.role);
    
    setShowWelcome(true);
  };

  const handleAddProfile = (e) => {
    e.preventDefault();
    if (!newProfileName.trim()) return;
    
    const newProfile = {
      id: Date.now(),
      name: newProfileName,
      role: newProfileRole,
      icon: newProfileRole === 'Child' ? 
        <FaChild className="text-purple-400" /> : 
        newProfileRole === 'Attorney' ? 
        <FaUserTie className="text-blue-400" /> : 
        <FaUser className="text-green-400" />
    };
    
    const updatedProfiles = [...profiles, newProfile];
    setProfiles(updatedProfiles);
    
    // Update current user's profiles
    const updatedUser = {
      ...currentUser,
      profiles: updatedProfiles
    };
    
    // Update users list
    const updatedUsers = users.map(user => 
      user.email === currentUser.email ? updatedUser : user
    );
    
    setUsers(updatedUsers);
    setCurrentUser(updatedUser);
    localStorage.setItem('legal_users', JSON.stringify(updatedUsers));
    
    setNewProfileName('');
    setShowProfileForm(false);
    
    // Automatically select the newly created profile if it's the first one
    if (updatedProfiles.length === 1) {
      handleProfileSelect(newProfile.id);
    }
  };

  if (showWelcome) {
    return <NetflixStyleWelcome onComplete={handleWelcomeComplete} />;
  }

  if (showUserSelection) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0e17] px-4 py-10 overflow-hidden relative">
        <BackgroundAnimations />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col bg-[#121a2a]/95 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden max-w-md w-full border border-[#2a3a5a] relative z-10 p-6 md:p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <motion.div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
              Select User
            </motion.div>
            <button 
              onClick={() => {
                localStorage.removeItem('token');
                setIsAuthenticated(false);
                setShowUserSelection(false);
              }}
              className="text-sm text-blue-300 hover:text-blue-200"
            >
              Sign out
            </button>
          </div>
          
          <motion.p className="text-center text-white/70 mb-6">
            Who's logging in?
          </motion.p>
          
          <div className="space-y-3 mb-6">
            {users.map(user => (
              <motion.div
                key={user.email}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-3 bg-[#1e293b]/80 rounded-lg border border-[#334155] cursor-pointer hover:border-blue-400/50 transition-all"
                onClick={() => handleUserSelect(user.email)}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 flex items-center justify-center text-lg bg-[#0f172a] rounded-full mr-3">
                    <FaUser className="text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-sm md:text-base">{user.name || user.email.split('@')[0]}</h3>
                    <p className="text-xs text-white/60">{user.email}</p>
                    <p className="text-xs text-white/60 mt-1">
                      {user.profiles?.length || 0} profile{user.profiles?.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-3 bg-[#1e293b]/30 rounded-lg border border-dashed border-[#334155] cursor-pointer hover:border-blue-400/50 transition-all"
              onClick={handleAddNewUser}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 flex items-center justify-center text-lg text-white/60 bg-[#0f172a] rounded-full mr-3">
                  <FaUserPlus />
                </div>
                <h3 className="text-white/80 font-medium text-sm md:text-base">Add New Account</h3>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (isAuthenticated) {
    // For existing users with profiles, show profile selection
    if (profiles.length > 0) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0e17] px-4 py-10 overflow-hidden relative">
          <BackgroundAnimations />
          
          {/* Profile selection container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col bg-[#121a2a]/95 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden max-w-md w-full border border-[#2a3a5a] relative z-10 p-6 md:p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <motion.div className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                {currentUser?.name || currentUser?.email.split('@')[0]}
              </motion.div>
              <button 
                onClick={() => {
                  localStorage.removeItem('token');
                  setIsAuthenticated(false);
                  setShowUserSelection(true);
                }}
                className="text-sm text-blue-300 hover:text-blue-200"
              >
                Switch User
              </button>
            </div>
            
            <motion.p className="text-center text-white/70 mb-6">
              Who's using this account?
            </motion.p>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              {profiles.map(profile => (
                <motion.div
                  key={profile.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center justify-center p-3 bg-[#1e293b]/80 rounded-xl border border-[#334155] cursor-pointer hover:border-blue-400/50 transition-all"
                  onClick={() => handleProfileSelect(profile.id)}
                >
                  <div className="w-12 h-12 flex items-center justify-center text-2xl bg-[#0f172a] rounded-full mb-2">
                    {profile.icon}
                  </div>
                  <h3 className="text-white font-medium text-sm text-center">{profile.name}</h3>
                  <p className="text-xs text-white/60">{profile.role}</p>
                </motion.div>
              ))}
              
              {!showProfileForm && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center justify-center p-3 bg-[#1e293b]/30 rounded-xl border border-dashed border-[#334155] cursor-pointer hover:border-blue-400/50 transition-all"
                  onClick={() => setShowProfileForm(true)}
                >
                  <div className="w-12 h-12 flex items-center justify-center text-2xl text-white/60 bg-[#0f172a] rounded-full mb-2">
                    <FaUserPlus />
                  </div>
                  <h3 className="text-white/80 font-medium text-sm text-center">Add Profile</h3>
                </motion.div>
              )}
            </div>
            
            {showProfileForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-medium">Add New Profile</h3>
                  <button 
                    onClick={() => setShowProfileForm(false)}
                    className="text-white/60 hover:text-white"
                  >
                    <FaChevronLeft />
                  </button>
                </div>
                
                <form onSubmit={handleAddProfile}>
                  <div className="mb-3">
                    <label className="block text-sm text-white/80 mb-1">Profile Name</label>
                    <input
                      type="text"
                      value={newProfileName}
                      onChange={(e) => setNewProfileName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#1e293b]/80 text-white placeholder-white/40 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/30 transition-all"
                      placeholder="Enter profile name"
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="block text-sm text-white/80 mb-1">Profile Type</label>
                    <select
                      value={newProfileRole}
                      onChange={(e) => setNewProfileRole(e.target.value)}
                      className="w-full px-3 py-2 bg-[#1e293b]/80 text-white rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/30 transition-all"
                    >
                      <option value="Attorney">Attorney</option>
                      <option value="Paralegal">Paralegal</option>
                      <option value="Child">Child</option>
                      <option value="Guest">Guest</option>
                    </select>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 transition-all text-white font-medium shadow-lg hover:shadow-blue-500/30 text-sm"
                  >
                    Create Profile
                  </button>
                </form>
              </motion.div>
            )}
            
            <p className="text-xs text-center text-white/50 mt-4">
              Each profile maintains separate settings and preferences.
            </p>
          </motion.div>
        </div>
      );
    }
    
    // For new users after welcome animation, show profile creation
    if (isNewUser) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0e17] px-4 py-10 overflow-hidden relative">
          <BackgroundAnimations />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col bg-[#121a2a]/95 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden max-w-md w-full border border-[#2a3a5a] relative z-10 p-6 md:p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <motion.div className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                Welcome, {currentUser?.name || currentUser?.email.split('@')[0]}
              </motion.div>
              <button 
                onClick={() => {
                  localStorage.removeItem('token');
                  setIsAuthenticated(false);
                  setShowUserSelection(true);
                }}
                className="text-sm text-blue-300 hover:text-blue-200"
              >
                Switch User
              </button>
            </div>
            
            <motion.p className="text-center text-white/70 mb-6">
              Create your first profile to get started
            </motion.p>
            
            <form onSubmit={handleAddProfile}>
              <div className="mb-3">
                <label className="block text-sm text-white/80 mb-1">Profile Name</label>
                <input
                  type="text"
                  value={newProfileName}
                  onChange={(e) => setNewProfileName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#1e293b]/80 text-white placeholder-white/40 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/30 transition-all"
                  placeholder="Enter your name"
                  required
                />
              </div>
              
              <div className="mb-3">
                <label className="block text-sm text-white/80 mb-1">Profile Type</label>
                <select
                  value={newProfileRole}
                  onChange={(e) => setNewProfileRole(e.target.value)}
                  className="w-full px-3 py-2 bg-[#1e293b]/80 text-white rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/30 transition-all"
                >
                  <option value="Attorney">Attorney</option>
                  <option value="Paralegal">Paralegal</option>
                  <option value="Child">Child</option>
                  <option value="Guest">Guest</option>
                </select>
              </div>
              
              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 transition-all text-white font-medium shadow-lg hover:shadow-blue-500/30 text-sm"
              >
                Create Profile
              </button>
            </form>
          </motion.div>
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0e17] px-4 py-10 overflow-hidden relative">
      <BackgroundAnimations />

      {/* Main container - flex-col on mobile, flex-row on larger screens */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row bg-[#121a2a]/95 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full border border-[#2a3a5a] relative z-10"
      >
        {/* Carousel section - hidden on small screens, shown on medium and larger */}
        <div className="hidden md:flex w-full md:w-1/2 flex-col items-center justify-center bg-gradient-to-br from-[#0f172a]/90 to-[#1e293b]/90 p-8">
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

        {/* Form section - full width on mobile, half width on larger screens */}
        <div className="w-full md:w-1/2 p-6 md:p-8 text-white">
          <motion.div 
            className="flex items-center justify-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div 
              className="text-4xl mr-3"
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
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
              Legal Portal
            </h2>
          </motion.div>
          
          <motion.p 
            className="text-center text-white/70 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Access your legal research tools
          </motion.p>
          
          <form className="space-y-4" onSubmit={handleLogin}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="legal@firm.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-[#1e293b]/80 text-white placeholder-white/40 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/30 transition-all text-sm"
                required
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
            >
              <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-[#1e293b]/80 text-white placeholder-white/40 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/30 transition-all text-sm"
                required
              />
            </motion.div>

            <motion.div 
              className="flex justify-between items-center text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <label className="flex items-center text-white/70">
                <input 
                  type="checkbox" 
                  className="mr-2 bg-[#1e293b] border-[#334155] rounded text-blue-400 focus:ring-blue-400/50" 
                />
                Remember me
              </label>
              <Link 
                to="/forgot-password" 
                className="text-blue-300 hover:text-blue-200 text-xs"
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
                className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 transition-all text-white font-medium shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2 group text-sm"
              >
                <span>Login</span>
                <motion.svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4" 
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
            className="mt-6 pt-4 border-t border-[#334155]/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
                          transition={{ delay: 1.6 }}
            >
              <p className="text-center text-xs text-white/70">
                Don't have an account?{' '}
                <Link 
                  to="/signup" 
                  className="text-blue-300 hover:text-blue-200 font-medium"
                >
                  Sign up
                </Link>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    
  )
        }
