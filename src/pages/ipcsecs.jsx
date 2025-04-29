import React, { useState, useEffect } from "react";
import { FaStar, FaRegStar, FaSearch, FaTimes, FaBookmark, FaHistory } from "react-icons/fa";
import ipcSections from "../assets/ipcSections.json";

const IPCSections = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [markedSections, setMarkedSections] = useState([]);
  const [recentSections, setRecentSections] = useState([]);
  const [filteredSections, setFilteredSections] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState("all"); // 'all', 'marked', 'recent'
  const [isContentFullscreen, setContentFullscreen] = useState(false);

  // Initialize with sorted sections
  useEffect(() => {
    const sorted = [...ipcSections].sort((a, b) =>
      a.section.localeCompare(b.section)
    );
    setFilteredSections(sorted);
    
    // Load saved data from localStorage
    const savedMarked = JSON.parse(localStorage.getItem('ipcMarked')) || [];
    const savedRecent = JSON.parse(localStorage.getItem('ipcRecent')) || [];
    setMarkedSections(savedMarked);
    setRecentSections(savedRecent);
  }, []);

  // Filter sections based on search
  useEffect(() => {
    const filtered = ipcSections.filter((item) =>
      item.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSections(filtered);
  }, [searchTerm]);

  // Save to localStorage when marked/recent sections change
  useEffect(() => {
    localStorage.setItem('ipcMarked', JSON.stringify(markedSections));
    localStorage.setItem('ipcRecent', JSON.stringify(recentSections));
  }, [markedSections, recentSections]);

  const toggleMark = (section) => {
    const exists = markedSections.find((s) => s.section === section.section);
    if (exists) {
      setMarkedSections(markedSections.filter((s) => s.section !== section.section));
    } else {
      setMarkedSections([...markedSections, section]);
    }
  };

  const selectSection = (section) => {
    setSelectedSection(section);
    setDrawerOpen(false);
    
    // Add to recent sections (max 10)
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
      {/* Navbar */}
      <nav className="bg-[#111827] text-white px-6 py-4 flex justify-between items-center shadow-lg border-b border-cyan-400/30">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setDrawerOpen(!isDrawerOpen)}
            className="text-cyan-400 hover:text-cyan-300 font-bold text-xl flex items-center"
          >
            <span className="mr-2">☰</span>
            <span className="hidden sm:inline">Sections</span>
          </button>
          <h1 className="text-xl font-semibold text-cyan-300 neon-text">IPC Code Viewer</h1>
        </div>
        {selectedSection && (
          <button
            onClick={() => setContentFullscreen(!isContentFullscreen)}
            className="text-cyan-400 hover:text-cyan-300 px-3 py-1 rounded border border-cyan-400/50 hover:bg-cyan-400/10 transition"
          >
            {isContentFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
        )}
      </nav>

      {/* Sliding Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-[#111827] z-40 transform transition-transform duration-300 shadow-xl border-r border-cyan-400/30 ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-4 py-5 h-full flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-cyan-400 neon-text">
              {viewMode === 'marked' ? '⭐ Marked' : viewMode === 'recent' ? '🕒 Recent' : '📜 IPC Sections'}
            </h2>
            <button
              onClick={() => setDrawerOpen(false)}
              className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700/50"
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search sections..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 rounded-lg bg-[#0a0e17] text-white border border-cyan-400/30 placeholder-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
            />
            <FaSearch className="absolute left-3 top-3 text-cyan-400/50" />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-3 text-cyan-400 hover:text-cyan-300"
              >
                <FaTimes />
              </button>
            )}
          </div>

          {/* View Mode Toggle */}
          <div className="flex space-x-2 mb-4">
            <button
              onClick={() => setViewMode('all')}
              className={`flex-1 py-2 rounded-lg flex items-center justify-center space-x-2 ${
                viewMode === 'all' ? 'bg-cyan-600 text-white' : 'bg-[#0a0e17] text-cyan-400 border border-cyan-400/30'
              }`}
            >
              <FaBookmark />
              <span>All</span>
            </button>
            <button
              onClick={() => setViewMode('marked')}
              className={`flex-1 py-2 rounded-lg flex items-center justify-center space-x-2 ${
                viewMode === 'marked' ? 'bg-yellow-600 text-white' : 'bg-[#0a0e17] text-yellow-400 border border-yellow-400/30'
              }`}
            >
              <FaStar />
              <span>Marked</span>
            </button>
            <button
              onClick={() => setViewMode('recent')}
              className={`flex-1 py-2 rounded-lg flex items-center justify-center space-x-2 ${
                viewMode === 'recent' ? 'bg-pink-600 text-white' : 'bg-[#0a0e17] text-pink-400 border border-pink-400/30'
              }`}
            >
              <FaHistory />
              <span>Recent</span>
            </button>
          </div>

          {/* Sections List */}
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {getDisplaySections().length > 0 ? (
              getDisplaySections().map((item, index) => (
                <div
                  key={index}
                  onClick={() => selectSection(item)}
                  className={`cursor-pointer p-3 mb-2 rounded-lg transition-all flex justify-between items-center ${
                    selectedSection?.section === item.section
                      ? 'bg-cyan-600/30 border border-cyan-400/50 shadow-lg shadow-cyan-400/10'
                      : 'bg-[#0a0e17] hover:bg-[#1e293b] border border-cyan-400/20'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate text-cyan-300">{item.section}</h3>
                    <p className="text-sm text-cyan-100 truncate">{item.title}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMark(item);
                    }}
                    className={`ml-3 p-2 rounded-full hover:bg-yellow-400/20 ${
                      isMarked(item) ? 'text-yellow-400' : 'text-yellow-400/50'
                    }`}
                  >
                    {isMarked(item) ? <FaStar /> : <FaRegStar />}
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
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
      <main className={`px-6 pt-6 pb-20 mx-auto transition-all ${isContentFullscreen ? 'fixed inset-0 p-0 bg-[#0a0e17] z-20 overflow-y-auto' : 'max-w-4xl'}`}>
        {selectedSection ? (
          <div className={`bg-[#111827]/90 p-6 rounded-xl border border-cyan-400/30 shadow-2xl ${
            isContentFullscreen ? 'min-h-screen py-12 px-8 md:px-16 lg:px-24' : 'mt-4'
          }`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-3xl font-bold text-cyan-400 neon-text mb-1">
                  {selectedSection.section}
                </h2>
                <h4 className="text-xl text-cyan-300 mb-4">{selectedSection.title}</h4>
              </div>
              <button
                onClick={() => toggleMark(selectedSection)}
                className={`p-2 rounded-full ${
                  isMarked(selectedSection)
                    ? 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/30'
                    : 'text-yellow-400/50 hover:text-yellow-400 border border-yellow-400/20'
                }`}
              >
                {isMarked(selectedSection) ? <FaStar size={24} /> : <FaRegStar size={24} />}
              </button>
            </div>
            
            <div className="prose prose-invert max-w-none">
              {selectedSection.content.split('\n').map((paragraph, i) => (
                <p key={i} className="text-lg text-gray-200 mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            
            {!isContentFullscreen && (
              <div className="mt-8 pt-4 border-t border-cyan-400/20">
                <button
                  onClick={() => setContentFullscreen(true)}
                  className="text-cyan-400 hover:text-cyan-300 px-4 py-2 rounded border border-cyan-400/50 hover:bg-cyan-400/10 transition flex items-center"
                >
                  <span>Fullscreen Mode</span>
                  <span className="ml-2">⛶</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center mt-16">
            <div className="inline-block p-6 rounded-full bg-[#111827] border border-cyan-400/30 mb-6">
              <FaBookmark className="text-5xl text-cyan-400" />
            </div>
            <h2 className="text-2xl text-cyan-300 mb-2">IPC Code Viewer</h2>
            <p className="text-cyan-200 max-w-md mx-auto">
              Select a section from the menu to view detailed information about Indian Penal Code provisions.
            </p>
            <button
              onClick={() => setDrawerOpen(true)}
              className="mt-6 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg shadow-lg transition flex items-center mx-auto"
            >
              <span className="mr-2">☰</span>
              Browse Sections
            </button>
          </div>
        )}
      </main>

      {/* Styles */}
      <style jsx>{`
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
      `}</style>
    </div>
  );
};

export default IPCSections;