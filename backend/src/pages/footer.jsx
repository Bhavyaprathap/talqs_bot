// Footer.jsx
import React from 'react';
import { FaLinkedin, FaInstagram, FaGoogle, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-8 px-6 relative backdrop-blur-lg border-t border-gray-700">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Social Media Icons */}
        <div className="flex gap-6 text-2xl">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition">
            <FaLinkedin />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition">
            <FaInstagram />
          </a>
          <a href="mailto:your-email@gmail.com" className="hover:text-green-400 transition">
            <FaGoogle />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
            <FaTwitter />
          </a>
        </div>

        {/* Credits */}
        <div className="text-sm text-gray-400 text-center">
          © 2025 TALQS Legal Assistant — Made with 💻 by Team
          <br />
          <span className="text-cyan-300">Akshara, Bhavya, Bhaavya, Indira, Ram, Reshwanth, Varshini</span>
        </div>
      </div>
      
    </footer>
  );
};

export default Footer;
