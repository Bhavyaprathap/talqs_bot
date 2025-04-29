import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const requirements = [
    { label: "At least 8 characters", test: (pass) => pass.length >= 8 },
    { label: "Contains a number", test: (pass) => /\d/.test(pass) },
    { label: "Contains a special character", test: (pass) => /[!@#$%^&*]/.test(pass) },
    { label: "Has an uppercase letter", test: (pass) => /[A-Z]/.test(pass) },
    { label: "Has a lowercase letter", test: (pass) => /[a-z]/.test(pass) },
  ];

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("Signup successful! Please login.");
        window.location.href = "/login";
      } else {
        alert(data.error || "Signup failed.");
      }
    } catch (err) {
      console.error("Signup Error:", err);
      alert("Server error.");
    }
  };

  // Enhanced floating legal elements
  const FloatingLegalElements = () => {
    const legalSymbols = ['⚖️', '🔨', '📜', '📚', '👨‍⚖️', '👩‍⚖️', '🏛️'];
    return (
      <>
        {[...Array(15)].map((_, i) => {
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
    <div className="min-h-screen flex items-center justify-center bg-[#0a0e17] px-4 py-10 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <FloatingLegalElements />
        
        {/* Pulsing scales of justice */}
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
        
        {/* Hammering gavel animation */}
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
        
        {/* Subtle animated grid */}
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

      {/* Signup form container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row bg-[#121a2a]/95 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden max-w-5xl w-full border border-[#2a3a5a] relative z-10"
      >
        {/* Left image section */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gradient-to-br from-[#0f172a]/80 to-[#1e293b]/80 p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <img
              src="https://img.icons8.com/external-filled-outline-wichaiwi/256/external-law-legal-filled-outline-wichaiwi-7.png"
              alt="Legal"
              className="w-64 h-64 object-contain filter drop-shadow-lg"
            />
            <motion.p 
              className="mt-6 text-white/70 text-center text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Join our legal research community
            </motion.p>
          </motion.div>
        </div>

        {/* Right form section */}
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
              Create Account
            </h2>
          </motion.div>
          
          <motion.p 
            className="text-center text-white/70 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Register for full legal research access
          </motion.p>
          
          <form className="space-y-5" onSubmit={handleSignup}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <label htmlFor="username" className="block text-sm font-medium text-white/80 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="legal_advisor"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-[#1e293b]/80 text-white placeholder-white/40 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/30 transition-all"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
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
              transition={{ delay: 1.2 }}
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

            {/* Strength Checklist */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="bg-[#1e293b]/70 rounded-lg p-4 border border-[#334155]/50 text-sm space-y-2"
            >
              {requirements.map((req, idx) => {
                const passed = req.test(password);
                return (
                  <motion.div 
                    key={idx} 
                    className={`flex items-center gap-2 ${passed ? "text-green-400" : "text-red-400"}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.6 + idx * 0.1 }}
                  >
                    {passed ? "✅" : "❌"} {req.label}
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0 }}
            >
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 transition-all text-white font-medium shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2 group"
              >
                <span>Register Now</span>
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
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                </motion.svg>
              </button>
            </motion.div>
          </form>

          <motion.div 
            className="mt-8 pt-5 border-t border-[#334155]/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
          >
            <p className="text-sm text-center text-white/60">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-blue-300 hover:text-blue-200 font-medium transition-colors hover:underline"
              >
                Login here
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}