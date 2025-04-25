import React, { useState, useEffect } from "react";
import ipcSections from "../assets/ipcSections.json";

const IPCSections = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [markedSections, setMarkedSections] = useState([]);
  const [filteredSections, setFilteredSections] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [viewMarked, setViewMarked] = useState(false);

  useEffect(() => {
    const sorted = [...ipcSections].sort((a, b) =>
      a.section.localeCompare(b.section)
    );
    setFilteredSections(sorted);
  }, []);

  useEffect(() => {
    const filtered = ipcSections.filter((item) =>
      item.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSections(filtered);
  }, [searchTerm]);

  const toggleMark = (section) => {
    const exists = markedSections.find((s) => s.section === section.section);
    if (exists) {
      setMarkedSections(markedSections.filter((s) => s.section !== section.section));
    } else {
      setMarkedSections([...markedSections, section]);
    }
  };

  const isMarked = (section) =>
    markedSections.some((s) => s.section === section.section);

  return (
    <div className="min-h-screen bg-[#0d1b2a] text-white relative">
      {/* Navbar */}
      <nav className="bg-[#1b263b] text-white px-6 py-4 flex justify-between items-center shadow-md border-b border-purple-700">
        <button
          onClick={() => setDrawerOpen(!isDrawerOpen)}
          className="text-purple-400 hover:text-purple-200 font-bold text-xl"
        >
          ☰ Sections
        </button>
        <h1 className="text-xl mr-235 font-semibold text-purple-300">IPC Viewer</h1>
      </nav>

      {/* Sliding Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-125 bg-[#1b263b] z-40 transform transition-transform duration-300 shadow-lg border-r border-purple-800 ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-4 py-5">
          <h2 className="text-lg font-bold text-purple-300 mb-2">
            {viewMarked ? "⭐ Marked Sections" : "📜 All IPC Sections"}
          </h2>

          <input
            type="text"
            placeholder="Search section..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 mb-3 rounded bg-[#0d1b2a] text-white border border-purple-600 placeholder-purple-400"
          />

          <div className="flex justify-between mb-4">
            <button
              onClick={() => setViewMarked(false)}
              className={`px-3 py-1 rounded ${
                !viewMarked ? "bg-purple-600 text-white" : "text-purple-400"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setViewMarked(true)}
              className={`px-3 py-1 rounded ${
                viewMarked ? "bg-yellow-400 text-black" : "text-yellow-400"
              }`}
            >
              Marked
            </button>
          </div>

          <div className="overflow-y-auto h-[75vh] space-y-2">
            {(viewMarked ? markedSections : filteredSections).map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedSection(item);
                  setDrawerOpen(false);
                }}
                className="cursor-pointer p-2 bg-[#0d1b2a] rounded hover:bg-purple-700/40 border border-purple-600 flex justify-between items-center"
              >
                <span>{item.section}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMark(item);
                  }}
                  className={`text-sm px-2 py-1 rounded ${
                    isMarked(item)
                      ? "bg-yellow-400 text-black"
                      : "border border-yellow-400 text-yellow-400"
                  } hover:bg-yellow-300 hover:text-black transition`}
                >
                  {isMarked(item) ? "★" : "☆"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay when drawer open */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30"
          onClick={() => setDrawerOpen(false)}
        ></div>
      )}

      {/* Content Display */}
      <main className="px-6 pt-6 pb-20 max-w-4xl mx-auto">
        {selectedSection ? (
          <div className="bg-[#1b263b]/70 p-6 rounded-lg border border-purple-700 shadow-lg mt-4">
            <h2 className="text-2xl font-bold text-purple-300 mb-2">{selectedSection.section}</h2>
            <h4 className="text-lg text-purple-200 mb-3">{selectedSection.title}</h4>
            <p className="text-purple-100 text-base">{selectedSection.content}</p>
          </div>
        ) : (
          <p className="text-purple-400 mt-10 text-center">
            📘 Select a section from the menu to view details.
          </p>
        )}
      </main>
    </div>
  );
};

export default IPCSections;
