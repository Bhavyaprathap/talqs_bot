import React, { useState, useEffect } from "react";
import { FaStar, FaRegStar, FaSearch, FaTimes, FaBookmark, FaHistory, FaExpand, FaCompress, FaArrowLeft, FaHome } from "react-icons/fa";
import ipcSections from "../assets/ipcSections.json";
import { useNavigate } from "react-router-dom";

const IPCSections = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState(null);
  const [markedSections, setMarkedSections] = useState([]);
  const [recentSections, setRecentSections] = useState([]);
  const [filteredSections, setFilteredSections] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState("all");
  const [isContentFullscreen, setContentFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Floating icons state
  const [floatingIcons] = useState([
    { icon: '⚖️', size: 'text-2xl', top: '10%', left: '5%', animation: 'float1' },
    { icon: '📜', size: 'text-3xl', top: '25%', left: '85%', animation: 'float2' },
    { icon: '🔍', size: 'text-xl', top: '70%', left: '10%', animation: 'float3' },
    { icon: '⚔️', size: 'text-2xl', top: '50%', left: '90%', animation: 'float4' },
    { icon: '🧑‍⚖️', size: 'text-3xl', top: '80%', left: '80%', animation: 'float1' },
  ]);

  useEffect(() => {
    const sorted = [...ipcSections].sort((a, b) =>
      a.section.localeCompare(b.section)
    );
    setFilteredSections(sorted);
    
    const loadData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/marked-sections');
        if (response.ok) {
          const data = await response.json();
          setMarkedSections(data.markedSections || []);
          setRecentSections(data.recentSections || []);
        }
      } catch (error) {
        console.error("Failed to load saved sections:", error);
        const savedMarked = JSON.parse(localStorage.getItem('ipcMarked')) || [];
        const savedRecent = JSON.parse(localStorage.getItem('ipcRecent')) || [];
        setMarkedSections(savedMarked);
        setRecentSections(savedRecent);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  useEffect(() => {
    const filtered = ipcSections.filter((item) =>
      item.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSections(filtered);
  }, [searchTerm]);

  useEffect(() => {
    const saveData = async () => {
      try {
        await fetch('/api/save-sections', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            markedSections,
            recentSections
          }),
        });
      } catch (error) {
        console.error("Failed to save sections:", error);
        localStorage.setItem('ipcMarked', JSON.stringify(markedSections));
        localStorage.setItem('ipcRecent', JSON.stringify(recentSections));
      }
    };
    
    saveData();
  }, [markedSections, recentSections]);

  const toggleMark = async (section) => {
    const exists = markedSections.find((s) => s.section === section.section);
    let updatedMarked;
    
    if (exists) {
      updatedMarked = markedSections.filter((s) => s.section !== section.section);
    } else {
      updatedMarked = [...markedSections, section];
    }
    
    setMarkedSections(updatedMarked);
  };

  const selectSection = (section) => {
    setSelectedSection(section);
    setDrawerOpen(false);
    
    setRecentSections(prev => {
      const withoutCurrent = prev.filter(s => s.section !== section.section);
      return [section, ...withoutCurrent].slice(0, 10);
    });
  };

  const isMarked = (section) => 
    markedSections.some((s) => s.section === section.section);

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredSections([...ipcSections].sort((a, b) => a.section.localeCompare(b.section)));
  };

  const getDisplaySections = () => {
    switch(viewMode) {
      case 'marked': return markedSections;
      case 'recent': return recentSections;
      default: return filteredSections;
    }
  };

  return (
    <div className={`min-h-screen bg-[#0a0e17] text-white relative ${isContentFullscreen ? 'overflow-hidden' : ''}`}>
      {/* Floating Icons */}
      {!isContentFullscreen && floatingIcons.map((icon, index) => (
        <div 
          key={index}
          className={`fixed ${icon.size} opacity-10 select-none pointer-events-none ${icon.animation}`}
          style={{ top: icon.top, left: icon.left }}
        >
          {icon.icon}
        </div>
      ))}

      {/* Navbar */}
      <nav className={`bg-[#111827] text-white px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center shadow-lg border-b border-cyan-400/30 ${isContentFullscreen ? 'hidden' : ''}`}>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            onClick={() => setDrawerOpen(!isDrawerOpen)}
            className="text-cyan-400 hover:text-cyan-300 font-bold text-lg sm:text-xl flex items-center"
          >
            <span className="mr-1 sm:mr-2">☰</span>
            <span className="hidden sm:inline">Sections</span>
          </button>
          <h1 className="text-lg sm:text-xl font-semibold text-cyan-300 neon-text">IPC Code Viewer</h1>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-3">
          {selectedSection && (
            <button
              onClick={() => setContentFullscreen(!isContentFullscreen)}
              className="text-cyan-400 hover:text-cyan-300 px-2 sm:px-3 py-1 rounded border border-cyan-400/50 hover:bg-cyan-400/10 transition flex items-center text-sm sm:text-base"
            >
              {isContentFullscreen ? <FaCompress className="mr-1" /> : <FaExpand className="mr-1" />}
              <span className="hidden sm:inline">{isContentFullscreen ? 'Exit' : 'Fullscreen'}</span>
            </button>
          )}
          <button
            onClick={() => navigate('/')}
            className="text-cyan-400 hover:text-cyan-300 px-2 sm:px-3 py-1 rounded border border-cyan-400/50 hover:bg-cyan-400/10 transition flex items-center text-sm sm:text-base"
            title="Return to Home"
          >
            <FaHome className="mr-1" />
            <span className="hidden sm:inline">Exit</span>
          </button>
        </div>
      </nav>

      {/* Sliding Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 sm:w-80 bg-[#111827] z-40 transform transition-transform duration-300 shadow-xl border-r border-cyan-400/30 ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } ${isContentFullscreen ? 'hidden' : ''}`}
      >
        <div className="px-3 sm:px-4 py-4 sm:py-5 h-full flex flex-col">
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-cyan-400 neon-text">
              {viewMode === 'marked' ? '⭐ Marked' : viewMode === 'recent' ? '🕒 Recent' : '📜 IPC Sections'}
            </h2>
            <button
              onClick={() => setDrawerOpen(false)}
              className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700/50"
            >
              <FaTimes size={18} />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-3 sm:mb-4">
            <input
              type="text"
              placeholder="Search sections..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 pl-9 sm:pl-10 rounded-lg bg-[#0a0e17] text-white border border-cyan-400/30 placeholder-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 text-sm sm:text-base"
            />
            <FaSearch className="absolute left-2.5 sm:left-3 top-2.5 sm:top-3 text-cyan-400/50 text-sm sm:text-base" />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-2.5 sm:right-3 top-2.5 sm:top-3 text-cyan-400 hover:text-cyan-300 text-sm sm:text-base"
              >
                <FaTimes />
              </button>
            )}
          </div>

          {/* View Mode Toggle */}
          <div className="flex space-x-1 sm:space-x-2 mb-3 sm:mb-4">
            <button
              onClick={() => setViewMode('all')}
              className={`flex-1 py-1 sm:py-2 rounded-lg flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm ${
                viewMode === 'all' ? 'bg-cyan-600 text-white' : 'bg-[#0a0e17] text-cyan-400 border border-cyan-400/30'
              }`}
            >
              <FaBookmark className="text-xs sm:text-sm" />
              <span>All</span>
            </button>
            <button
              onClick={() => setViewMode('marked')}
              className={`flex-1 py-1 sm:py-2 rounded-lg flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm ${
                viewMode === 'marked' ? 'bg-yellow-600 text-white' : 'bg-[#0a0e17] text-yellow-400 border border-yellow-400/30'
              }`}
            >
              <FaStar className="text-xs sm:text-sm" />
              <span>Marked</span>
            </button>
            <button
              onClick={() => setViewMode('recent')}
              className={`flex-1 py-1 sm:py-2 rounded-lg flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm ${
                viewMode === 'recent' ? 'bg-pink-600 text-white' : 'bg-[#0a0e17] text-pink-400 border border-pink-400/30'
              }`}
            >
              <FaHistory className="text-xs sm:text-sm" />
              <span>Recent</span>
            </button>
          </div>

          {/* Sections List */}
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-400"></div>
              </div>
            ) : getDisplaySections().length > 0 ? (
              getDisplaySections().map((item, index) => (
                <div
                  key={index}
                  onClick={() => selectSection(item)}
                  className={`cursor-pointer p-2 sm:p-3 mb-1 sm:mb-2 rounded-lg transition-all flex justify-between items-center ${
                    selectedSection?.section === item.section
                      ? 'bg-cyan-600/30 border border-cyan-400/50 shadow-lg shadow-cyan-400/10'
                      : 'bg-[#0a0e17] hover:bg-[#1e293b] border border-cyan-400/20'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate text-cyan-300 text-sm sm:text-base">{item.section}</h3>
                    <p className="text-xs sm:text-sm text-cyan-100 truncate">{item.title}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMark(item);
                    }}
                    className={`ml-2 p-1 sm:p-2 rounded-full hover:bg-yellow-400/20 ${
                      isMarked(item) ? 'text-yellow-400' : 'text-yellow-400/50'
                    }`}
                  >
                    {isMarked(item) ? <FaStar size={14} /> : <FaRegStar size={14} />}
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400 text-sm sm:text-base">
                {viewMode === 'marked'
                  ? 'No marked sections yet'
                  : viewMode === 'recent'
                  ? 'No recently viewed sections'
                  : 'No sections found'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay when drawer open */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 backdrop-blur-sm"
          onClick={() => setDrawerOpen(false)}
        ></div>
      )}

      {/* Content Display */}
      <main className={`px-4 sm:px-6 pt-4 sm:pt-6 pb-16 sm:pb-20 mx-auto transition-all ${isContentFullscreen ? 'fixed inset-0 p-4 bg-[#0a0e17] z-20 overflow-y-auto' : 'max-w-4xl'}`}>
        {selectedSection ? (
          <div className={`bg-[#111827]/90 p-4 sm:p-6 rounded-xl border border-cyan-400/30 shadow-2xl ${
            isContentFullscreen ? 'min-h-[calc(100vh-2rem)]' : 'mt-2 sm:mt-4'
          }`}>
            {isContentFullscreen && (
              <div className="flex justify-between items-center mb-4 sm:mb-6 gap-2">
                <button
                  onClick={() => setContentFullscreen(false)}
                  className="text-cyan-400 hover:text-cyan-300 px-3 py-1 sm:px-4 sm:py-2 rounded border border-cyan-400/50 hover:bg-cyan-400/10 transition flex items-center text-sm sm:text-base"
                >
                  <FaArrowLeft className="mr-1 sm:mr-2" />
                  Exit Fullscreen
                </button>
                <button
                  onClick={() => toggleMark(selectedSection)}
                  className={`px-3 py-1 sm:px-4 sm:py-2 rounded flex items-center text-sm sm:text-base ${
                    isMarked(selectedSection)
                      ? 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/30'
                      : 'text-yellow-400/50 hover:text-yellow-400 border border-yellow-400/20'
                  }`}
                >
                  {isMarked(selectedSection) ? <FaStar className="mr-1 sm:mr-2" /> : <FaRegStar className="mr-1 sm:mr-2" />}
                  <span>{isMarked(selectedSection) ? 'Unmark' : 'Mark'}</span>
                </button>
              </div>
            )}
            
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-400 neon-text mb-1">
                  {selectedSection.section}
                </h2>
                <h4 className="text-base sm:text-lg md:text-xl text-cyan-300 mb-3 sm:mb-4">{selectedSection.title}</h4>
              </div>
              {!isContentFullscreen && (
                <button
                  onClick={() => toggleMark(selectedSection)}
                  className={`p-1 sm:p-2 rounded-full ${
                    isMarked(selectedSection)
                      ? 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/30'
                      : 'text-yellow-400/50 hover:text-yellow-400 border border-yellow-400/20'
                  }`}
                >
                  {isMarked(selectedSection) ? <FaStar size={18} /> : <FaRegStar size={18} />}
                </button>
              )}
            </div>
            
            <div className="prose prose-invert max-w-none">
              {selectedSection.content.split('\n').map((paragraph, i) => (
                <p key={i} className="text-sm sm:text-base md:text-lg text-gray-200 mb-3 sm:mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            
            {!isContentFullscreen && (
              <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-cyan-400/20 flex justify-between items-center gap-2">
                <button
                  onClick={() => setSelectedSection(null)}
                  className="text-cyan-400 hover:text-cyan-300 px-3 py-1 sm:px-4 sm:py-2 rounded border border-cyan-400/50 hover:bg-cyan-400/10 transition flex items-center text-sm sm:text-base"
                >
                  <FaArrowLeft className="mr-1 sm:mr-2" />
                  Back to List
                </button>
                <button
                  onClick={() => setContentFullscreen(true)}
                  className="text-cyan-400 hover:text-cyan-300 px-3 py-1 sm:px-4 sm:py-2 rounded border border-cyan-400/50 hover:bg-cyan-400/10 transition flex items-center text-sm sm:text-base"
                >
                  <span>Fullscreen Mode</span>
                  <FaExpand className="ml-1 sm:ml-2" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center mt-12 sm:mt-16">
            <div className="inline-block p-4 sm:p-6 rounded-full bg-[#111827] border border-cyan-400/30 mb-4 sm:mb-6">
              <FaBookmark className="text-4xl sm:text-5xl text-cyan-400" />
            </div>
            <h2 className="text-xl sm:text-2xl text-cyan-300 mb-2">IPC Code Viewer</h2>
            <p className="text-cyan-200 max-w-md mx-auto text-sm sm:text-base">
              Select a section from the menu to view detailed information about Indian Penal Code provisions.
            </p>
            <button
              onClick={() => setDrawerOpen(true)}
              className="mt-4 sm:mt-6 px-4 py-2 sm:px-6 sm:py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg shadow-lg transition flex items-center mx-auto text-sm sm:text-base"
            >
              <span className="mr-1 sm:mr-2">☰</span>
              Browse Sections
            </button>
          </div>
        )}
      </main>

      {/* Styles */}
      <style jsx global>{`
        .neon-text {
          text-shadow: 0 0 5px rgba(34, 211, 238, 0.5), 0 0 10px rgba(34, 211, 238, 0.3);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 211, 238, 0.5);
        }
        @keyframes float1 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(10px) translateX(-10px); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-15px) translateX(-5px); }
        }
        @keyframes float4 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(5px) translateX(15px); }
        }
        .float1 { animation: float1 8s ease-in-out infinite; }
        .float2 { animation: float2 10s ease-in-out infinite; }
        .float3 { animation: float3 12s ease-in-out infinite; }
        .float4 { animation: float4 9s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default IPCSections;
