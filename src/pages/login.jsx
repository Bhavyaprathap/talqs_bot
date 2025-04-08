// src/pages/login.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

        {/* Form */}
        <div className="w-full md:w-1/2 p-10 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center text-cyan-300 tracking-wide">Login</h2>
          <form className="space-y-5">
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

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center text-gray-300">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-cyan-300 hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-md bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-300 hover:to-purple-400 transition-all text-white font-bold shadow-md hover:shadow-cyan-400/30"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center mt-6 text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-cyan-300 hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
