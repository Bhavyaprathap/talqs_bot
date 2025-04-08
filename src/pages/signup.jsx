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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#090979] to-[#320076] px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full border-2 border-cyan-400/50"
      >
        {/* Left image */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-white/5 p-6">
          <img
            src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/512/external-law-law-and-justice-flaticons-lineal-color-flat-icons.png"
            alt="Legal"
            className="w-40 h-40 opacity-90"
          />
        </div>

        {/* Right - Form */}
        <div className="w-full md:w-1/2 p-10 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center text-cyan-300 tracking-wide">Sign Up</h2>
          <form className="space-y-5">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 text-white placeholder-gray-300 rounded-md border border-cyan-300/30 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 text-white placeholder-gray-300 rounded-md border border-cyan-300/30 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 text-white placeholder-gray-300 rounded-md border border-cyan-300/30 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />

            {/* Strength Checklist */}
            <div className="bg-white/10 rounded-md p-4 border border-white/20 text-sm text-gray-300 space-y-2">
              {requirements.map((req, idx) => {
                const passed = req.test(password);
                return (
                  <div key={idx} className={`flex items-center gap-2 ${passed ? "text-green-400" : "text-red-400"}`}>
                    {passed ? "✅" : "❌"} {req.label}
                  </div>
                );
              })}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-md bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-300 hover:to-purple-400 transition-all text-white font-bold shadow-md hover:shadow-cyan-400/30"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-center mt-6 text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-300 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
