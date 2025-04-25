import React, { useState, useEffect } from "react";
import legalTerms from "../assets/legalTerms.json";

const LegalDictionary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [filteredTerms, setFilteredTerms] = useState([]);

  useEffect(() => {
    // Initial sort
    const sorted = [...legalTerms].sort((a, b) =>
      a.term.localeCompare(b.term)
    );
    setFilteredTerms(sorted);
  }, []);

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchTerm(keyword);

    const suggestions = legalTerms
      .filter((item) =>
        item.term.toLowerCase().startsWith(keyword)
      )
      .sort((a, b) => a.term.localeCompare(b.term));

    setFilteredTerms(suggestions);

    // Exact match = show popup
    const exact = legalTerms.find(
      (item) => item.term.toLowerCase() === keyword
    );
    setSelectedTerm(exact || null);
  };

  return (
    <div className="min-h-screen bg-[#0d1b2a] text-white pt-20 px-6 relative flex justify-center items-start">
      {/* Dictionary Box */}
      <div className="w-full max-w-4xl bg-[#1b263b]/80 rounded-xl border border-purple-700 shadow-lg p-6 relative z-10">
        {/* Search Bar */}
        <div className="w-full flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search legal term..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full md:w-2/3 px-4 py-2 bg-[#0f172a] text-white rounded-md border border-purple-600 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-inner"
          />
        </div>

        {/* Scrollable Terms Box */}
        <div className="max-h-[60vh] overflow-y-auto border border-purple-500 rounded-md p-4 bg-[#0f172a]/70 backdrop-blur-md">
          <h2 className="text-lg text-purple-300 mb-3">📚 Matching Terms</h2>
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-sm">
            {filteredTerms.map((item, index) => (
              <li
                key={index}
                className="bg-[#1e293b] hover:bg-purple-700/40 border border-purple-600 rounded px-3 py-2 cursor-pointer transition duration-200"
                onClick={() => setSelectedTerm(item)}
              >
                {item.term}
              </li>
            ))}
            {filteredTerms.length === 0 && (
              <p className="text-sm text-purple-400 col-span-full">
                No results found.
              </p>
            )}
          </ul>
        </div>
      </div>

      {/* Popup Card for Selected Term */}
      {selectedTerm && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedTerm(null)}
          />
          <div className="relative max-w-xl w-full bg-[#1e1e2f]/70 backdrop-blur-md border border-purple-600 text-white p-6 rounded-xl shadow-2xl z-50">
            <h3 className="text-2xl font-bold text-purple-300 mb-2">{selectedTerm.term}</h3>
            <p className="text-base text-purple-100">{selectedTerm.definition}</p>
            <button
              className="absolute top-3 right-4 text-pink-400 hover:text-white text-lg"
              onClick={() => setSelectedTerm(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LegalDictionary;
