import React, { useState, useEffect } from "react";
import { FaBars, FaUserCircle, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const openProfileModal = () => setIsProfileModalOpen(true);
  const closeProfileModal = () => setIsProfileModalOpen(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-[#0d1b2a] text-white shadow-md backdrop-blur-md w-full fixed top-0 left-0 border-b border-purple-600 z-50">
        <div className="max-w-screen-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={toggleSidebar} className="text-2xl text-purple-400 hover:text-purple-300">
              <FaBars />
            </button>
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-400 tracking-wide cursor-pointer" onClick={() => navigate("/")}>TALQS ⚖️</h1>
          </div>

          <div className="flex items-center gap-6 ml-auto">
            {/* Desktop Links */}
            <ul className="hidden md:flex gap-8 text-[17px] font-medium">
              <li onClick={() => navigate("/about")} className="hover:text-purple-300 cursor-pointer">About</li>
              <li onClick={() => navigate("/qachatbot")} className="hover:text-purple-300 cursor-pointer">Q/A chatbot</li>
              <li onClick={() => navigate("/summarization")} className="hover:text-purple-300 cursor-pointer">Summary chatbot</li>
              <li onClick={() => navigate("/dictionary")} className="hover:text-purple-300 cursor-pointer">Legal Dictionary</li>
              <li onClick={() => navigate("/NDAtemplate")} className="hover:text-purple-300 cursor-pointer">NDA</li>
              <li onClick={() => navigate("/IPCSections")} className="hover:text-purple-300 cursor-pointer">IPC Sections </li>
              {/* <li onClick={() => navigate("/help")} className="hover:text-purple-300 cursor-pointer">Help</li> */}
            </ul>

            {/* Profile Icon */}
            <button onClick={openProfileModal} className="text-4xl text-pink-400 hover:text-purple-400 ml-4">
              <FaUserCircle />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="absolute top-[70px] left-6 w-56 bg-[#1b263b]/80 backdrop-blur-lg border border-purple-600 rounded-md shadow-lg p-4 z-40 md:hidden">
          <ul className="flex flex-col gap-4 text-white text-sm font-medium">
            <li onClick={() => { navigate("/"); setIsSidebarOpen(false); }} className="hover:text-purple-400 cursor-pointer">Home</li>
            <li onClick={() => { navigate("/about"); setIsSidebarOpen(false); }} className="hover:text-purple-400 cursor-pointer">About</li>
            <li onClick={() => { navigate("/qachatbot"); setIsSidebarOpen(false); }} className="hover:text-purple-400 cursor-pointer">Chat</li>
            <li onClick={() => { navigate("/dictionary"); setIsSidebarOpen(false); }} className="hover:text-purple-300 cursor-pointer">Legal Dictionary</li>
            <li onClick={() => { navigate("/NDAtemplate"); setIsSidebarOpen(false); }} className="hover:text-purple-400 cursor-pointer">NDA</li>
            <li onClick={() => { navigate("/contact"); setIsSidebarOpen(false); }} className="hover:text-purple-400 cursor-pointer">Contact</li>
            <li onClick={() => { navigate("/help"); setIsSidebarOpen(false); }} className="hover:text-purple-400 cursor-pointer">Help</li>
          </ul>
        </div>
      )}

      {/* Profile Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-60">
          <div className="bg-[#1b263b] text-white rounded-2xl p-6 w-11/12 max-w-md shadow-lg relative">
            <button onClick={closeProfileModal} className="absolute top-4 right-4 text-white hover:text-red-400">
              <FaTimes size={20} />
            </button>
            <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
            <div className="space-y-2">
              <p><strong>Name:</strong> {/* fetch from state or context */} Guest</p>
              <p><strong>Email:</strong> {/* fetch from state or context */} guest@example.com</p>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <button onClick={() => { navigate('/profile'); closeProfileModal(); }} className="py-2 px-4 bg-purple-600 hover:bg-purple-500 rounded">Edit Profile</button>
              <button onClick={() => { navigate('/settings'); closeProfileModal(); }} className="py-2 px-4 bg-purple-600 hover:bg-purple-500 rounded">Settings</button>
              <button onClick={() => { localStorage.removeItem('token'); navigate('/login'); }} className="py-2 px-4 bg-red-600 hover:bg-red-500 rounded">Sign Out</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
