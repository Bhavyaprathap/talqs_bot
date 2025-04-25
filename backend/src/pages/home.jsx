// File: src/components/Navbar.jsx
import React, { useState } from "react";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate=useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-[#0d1b2a] text-white shadow-md backdrop-blur-md w-full fixed top-0 left-0 border-b border-purple-600 z-50">
        <div className="max-w-screen-2xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Left: TALQS & Menu */}
          <div className="flex items-center gap-3">
            <button onClick={toggleSidebar} className="text-2xl text-purple-400 hover:text-purple-300">
              <FaBars />
            </button>
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-400 tracking-wide">
              TALQS ⚖️
            </h1>
          </div>

          {/* Right: Nav Links & Profile */}
          <div className="flex items-center gap-6 ml-auto">
            <ul className="hidden md:flex gap-8 text-[17px] font-medium">
              <li className="hover:text-purple-300 cursor-pointer">About</li>
              <li className="hover:text-purple-300 cursor-pointer">Q/A chatbot</li>
              <li className="hover:text-purple-300 cursor-pointer">Summary chatbot</li>
              <li onClick={()=>navigate("/dictionary")} className="hover:text-purple-300 cursor-pointer">Legal Dictionary</li>
              <li onClick={()=>navigate("/NDAtemplate")} className="hover:text-purple-300 cursor-pointer">NDA</li>

              <li className="hover:text-purple-300 cursor-pointer">Contact</li>
              <li className="hover:text-purple-300 cursor-pointer">Help</li>
            </ul>

            {/* User Icon with Dropdown */}
            <div className="relative">
              <button onClick={toggleDropdown}>
                <FaUserCircle className="text-4xl text-pink-400 hover:text-purple-400" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-[#1b263b] border border-purple-600 rounded-md shadow-lg z-50">
                  <ul className="text-sm text-white">
                    <li className="px-4 py-2 hover:bg-purple-700 cursor-pointer">Profile</li>
                    <li className="px-4 py-2 hover:bg-purple-700 cursor-pointer">Sign out</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar dropdown below icon */}
      {isSidebarOpen && (
        <div className="absolute top-[70px] left-6 w-56 bg-[#1b263b] border border-purple-600 rounded-md shadow-lg p-4 z-40">
          <ul className="flex flex-col gap-4 text-white text-sm font-medium">
            <li className="hover:text-purple-400 cursor-pointer">Home</li>
            <li className="hover:text-purple-400 cursor-pointer">About</li>
            <li className="hover:text-purple-400 cursor-pointer">Chat</li>
            <li onClick={()=>navigate("/dictionary")} className="hover:text-purple-300 cursor-pointer">Legal Dictionary</li>

            <li className="hover:text-purple-400 cursor-pointer">Contact</li>
            <li className="hover:text-purple-400 cursor-pointer">Help</li>
          </ul>
        </div>
      )}
      
    </>
    
  );
};

export default Navbar;
