import React, { useState, useEffect } from "react";
import { FaBars, FaUserCircle, FaTimes, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [userInitial, setUserInitial] = useState("G");
  const [userEmail, setUserEmail] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);
  const [itemsVisible, setItemsVisible] = useState(false);

  // Menu items data
  const menuItems = [
    { name: "Notes", path: "/notePage" },
    { name: "Q/A Chatbot", path: "/api/search" },
    { name: "Summary Chatbot", path:"/api/summarize" },
    { name: "Legal Dictionary", path: "/dictionary" },
    { name: "NDA", path: "/NDAtemplate" },
    { name: "IPC Sections", path: "/IPCSections" }
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const openProfileModal = () => setIsProfileModalOpen(true);
  const closeProfileModal = () => setIsProfileModalOpen(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("account_email");
    
    if (!token) {
      navigate("/login");
    } else if (email) {
      setUserEmail(email);
      setUserInitial(email.charAt(0).toUpperCase());
    }

    const checkViewport = () => {
      setIsMobileView(window.innerWidth < 1024);
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);

    // Trigger the animation after a short delay
    const timer = setTimeout(() => {
      setItemsVisible(true);
    }, 500);

    return () => {
      window.removeEventListener("resize", checkViewport);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-[#0d1b2a] text-white shadow-md backdrop-blur-md w-full fixed top-0 left-0 border-b border-purple-600 z-50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isMobileView && (
              <button 
                onClick={toggleMenu} 
                className="text-2xl text-purple-400 hover:text-purple-300"
              >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            )}

            <motion.h1 
              className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-400 tracking-wide cursor-pointer" 
              onClick={() => navigate("/")}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              TALQS ⚖️
            </motion.h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Desktop Menu - Animated items */}
            {!isMobileView && (
              <ul className="flex gap-4 sm:gap-6 text-sm sm:text-[17px] font-medium">
                {menuItems.map((item, index) => (
                  <motion.li 
                    key={index}
                    onClick={() => navigate(item.path)} 
                    className="hover:text-purple-300 cursor-pointer px-2 py-1"
                    initial={{ opacity: 0, y: -20 }}
                    animate={itemsVisible ? { 
                      opacity: 1, 
                      y: 0,
                      transition: {
                        delay: 0.1 * index,
                        type: "spring",
                        stiffness: 100,
                        damping: 10
                      }
                    } : {}}
                    whileHover={{ 
                      scale: 1.05,
                      color: "#d8b4fe",
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                  </motion.li>
                ))}
              </ul>
            )}

            {/* Profile Icon */}
            <motion.button 
              onClick={openProfileModal} 
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold hover:from-purple-500 hover:to-pink-400 transition-all"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                transition: { 
                  delay: 0.1 * menuItems.length + 0.3,
                  type: "spring",
                  stiffness: 150
                }
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {userInitial}
            </motion.button>
          </div>
        </div>

        {/* Mobile Dropdown Menu - Slides down */}
        {isMobileView && (
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                className="absolute top-full left-0 right-0 bg-[#1b263b]/95 backdrop-blur-lg border-b border-purple-600 shadow-lg overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <ul className="flex flex-col text-white text-sm font-medium">
                  {menuItems.map((item, index) => (
                    <motion.li 
                      key={index}
                      onClick={() => { 
                        navigate(item.path); 
                        setIsMenuOpen(false); 
                      }} 
                      className="hover:bg-purple-900/50 cursor-pointer px-6 py-4 border-t border-purple-900/30"
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ 
                        x: 0, 
                        opacity: 1,
                        transition: {
                          delay: 0.05 * index,
                          duration: 0.3
                        }
                      }}
                      whileTap={{ backgroundColor: "rgba(107, 33, 168, 0.3)" }}
                    >
                      {item.name}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </nav>

      {/* Profile Modal */}
      {isProfileModalOpen && (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-[#1b263b] text-white rounded-2xl p-6 w-11/12 max-w-md shadow-lg relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <button onClick={closeProfileModal} className="absolute top-4 right-4 text-white hover:text-red-400">
              <FaTimes size={20} />
            </button>
            <div className="flex items-center gap-4 mb-6">
              <motion.div 
                className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center text-2xl font-bold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                {userInitial}
              </motion.div>
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-xl font-semibold">User Profile</h2>
                <p className="text-gray-300">{userEmail}</p>
              </motion.div>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              
              
              <motion.button 
                onClick={() => { 
                  localStorage.removeItem('token'); 
                  localStorage.removeItem('account_email');
                  navigate('/login'); 
                }} 
                className="py-2 px-4 bg-red-600 hover:bg-red-500 rounded"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign Out
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
