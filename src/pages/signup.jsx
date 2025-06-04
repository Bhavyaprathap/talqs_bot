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

  // Floating legal elements - simplified for mobile
  const FloatingLegalElements = () => {
    const legalSymbols = ['⚖️', '🔨', '📜', '📚'];
    return (
      <>
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/20 sm:text-white/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 16 + 8}px`,
              zIndex: 0,
            }}
            animate={{
              y: [window.innerHeight, -100],
              x: [0, (Math.random() - 0.5) * 50],
              rotate: [0, Math.random() * 360],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              repeatDelay: Math.random() * 5,
              ease: "linear",
            }}
          >
            {legalSymbols[Math.floor(Math.random() * legalSymbols.length)]}
          </motion.div>
        ))}
      </>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0e17] p-4 sm:p-6 overflow-hidden relative">
      {/* Background elements - lighter on mobile */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <FloatingLegalElements />
        
        {/* Decorative elements - hidden on mobile */}
        <motion.div 
          className="hidden md:block absolute top-1/4 left-1/4 text-6xl text-white/20 lg:text-white/30"
          animate={{ 
            rotate: [0, 15, -15, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            repeatType: "mirror" 
          }}
        >
          ⚖️
        </motion.div>
        
        {/* Subtle animated grid */}
        <motion.div 
          className="absolute inset-0 bg-grid-white/[0.02]"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Main card container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row w-full max-w-md md:max-w-2xl lg:max-w-4xl bg-[#121a2a]/95 backdrop-blur-sm md:backdrop-blur-lg rounded-xl md:rounded-2xl shadow-lg md:shadow-xl overflow-hidden border border-[#2a3a5a]/50 md:border-[#2a3a5a] relative z-10"
      >
        {/* Image section - hidden on mobile */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#0f172a]/80 to-[#1e293b]/80 p-6 lg:p-8 items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <img
              src="src/pages/Screenshot 2025-05-07 130356.png"
              alt="Legal Research"
              className="w-48 h-48 lg:w-64 lg:h-64 object-contain mx-auto filter drop-shadow-lg"
            />
            <motion.p 
              className="mt-4 lg:mt-6 text-white/70 text-sm lg:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Join our legal research community
            </motion.p>
          </motion.div>
        </div>

        {/* Form section - full width on mobile */}
        <div className="w-full p-6 sm:p-8 md:p-8 lg:p-10">
          <motion.div 
            className="flex items-center justify-center mb-4 sm:mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div 
              className="text-4xl mr-2 sm:mr-3"
              animate={{ 
                rotate: [0, 5, -5, 0],
                y: [0, -3, 3, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "mirror"
              }}
            >
              ⚖️
            </motion.div>
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
              Create Account
            </h2>
          </motion.div>
          
          <motion.p 
            className="text-center text-white/70 mb-4 sm:mb-6 text-sm sm:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Register for full legal research access
          </motion.p>
          
          <form className="space-y-4" onSubmit={handleSignup}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label htmlFor="username" className="block text-sm font-medium text-white/80 mb-1 sm:mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="legal_advisor"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 sm:py-2.5 bg-[#1e293b]/70 text-white placeholder-white/40 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/30 transition-all text-sm"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1 sm:mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="legal@firm.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 sm:py-2.5 bg-[#1e293b]/70 text-white placeholder-white/40 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/30 transition-all text-sm"
                required
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-1 sm:mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 sm:py-2.5 bg-[#1e293b]/70 text-white placeholder-white/40 rounded-lg border border-[#334155] focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/30 transition-all text-sm"
                required
              />
            </motion.div>

            {/* Password requirements */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="bg-[#1e293b]/60 rounded-lg p-3 border border-[#334155]/50 text-xs sm:text-sm space-y-1.5"
            >
              {requirements.map((req, idx) => {
                const passed = req.test(password);
                return (
                  <motion.div 
                    key={idx} 
                    className={`flex items-center gap-2 ${passed ? "text-green-400" : "text-red-400"}`}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 + idx * 0.1 }}
                  >
                    {passed ? "✓" : "✗"} {req.label}
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="pt-2"
            >
              <button
                type="submit"
                className="w-full py-2.5 sm:py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 transition-all text-white font-medium shadow hover:shadow-blue-500/20 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                Sign Up
                <motion.span
                  animate={{
                    x: [0, 4, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity
                  }}
                >
                  →
                </motion.span>
              </button>
            </motion.div>
          </form>

          <motion.div 
            className="mt-6 pt-4 border-t border-[#334155]/50 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            <p className="text-xs sm:text-sm text-white/60">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-blue-300 hover:text-blue-200 font-medium transition-colors"
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
