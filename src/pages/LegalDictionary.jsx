import React, { useState, useEffect } from "react";
import legalTerms from "../assets/LegalTerms.json";
import contract_law_dictionary from "../assets/contract_law_dictionary.json"
import { FaSearch, FaTimes, FaBook, FaBalanceScale, FaGavel, FaScroll, FaLandmark } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const LegalDictionary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [filteredTerms, setFilteredTerms] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  // Categories based on term types
  const categories = [
    { id: "all", name: "All Terms", icon: <FaBook className="mr-2" /> },
    { id: "contract", name: "Contract Law", icon: <FaScroll className="mr-2" /> },
    { id: "criminal", name: "Criminal Law", icon: <FaGavel className="mr-2" /> },
    { id: "property", name: "Property Law", icon: <FaLandmark className="mr-2" /> },
    { id: "constitutional", name: "Constitutional", icon: <FaBalanceScale className="mr-2" /> }
  ];

  useEffect(() => {
    setIsLoading(true);
    const sorted = [...legalTerms]
      .sort((a, b) => a.term.localeCompare(b.term))
      .map(term => ({ ...term, category: term.category || "general" }));
    
    setTimeout(() => {
      setFilteredTerms(sorted);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchTerm(keyword);

    const suggestions = legalTerms
      .filter(item => 
        item.term.toLowerCase().includes(keyword) && 
        (activeCategory === "all" || item.category === activeCategory)
      )
      .sort((a, b) => a.term.localeCompare(b.term));

    setFilteredTerms(suggestions);

    const exact = legalTerms.find(item => item.term.toLowerCase() === keyword);
    setSelectedTerm(exact || null);
  };

  const filterByCategory = (category) => {
    setActiveCategory(category);
    setIsLoading(true);
    
    setTimeout(() => {
      if (category === "all") {
        setFilteredTerms([...legalTerms].sort((a, b) => a.term.localeCompare(b.term)));
      } else {
        setFilteredTerms(
          legalTerms
            .filter(item => item.category === category)
            .sort((a, b) => a.term.localeCompare(b.term))
        );
      }
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d1b2a] to-[#1b263b] text-white pt-20 px-4 md:px-10 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              opacity: [0.05, 0.15, 0.05]
            }}
            transition={{
              duration: 20 + Math.random() * 20,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            {i % 2 === 0 ? "⚖️" : "📜"}
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            className="flex items-center text-purple-300 hover:text-white transition duration-300 mb-4 md:mb-0"
            onClick={() => window.history.back()}
          >
            <FaTimes className="mr-2" /> Exit Dictionary
          </button>
          
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-2">
              Legal Lexicon
            </h1>
            
            <p className="text-purple-200">Your comprehensive guide to legal terminology</p>
          </motion.div>
          
          <div className="w-24 md:w-32" /> {/* Spacer */}
        </motion.div>

        {/* Search and Categories */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-purple-300" />
            </div>
            <input
              type="text"
              placeholder="Search for any legal term..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-3 bg-[#0f172a]/80 backdrop-blur-sm text-white rounded-xl border-2 border-purple-600/50 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 shadow-lg transition duration-300"
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {categories.map(category => (
              <motion.button
                key={category.id}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category.id ? 'bg-purple-600 text-white' : 'bg-[#1e293b] text-purple-300 hover:bg-purple-700/50'}`}
                onClick={() => filterByCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.icon}
                {category.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Results Section */}
        <motion.div 
          className="bg-[#0f172a]/70 backdrop-blur-lg rounded-2xl border border-purple-700/30 shadow-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-purple-300 flex items-center">
              <FaBook className="mr-2" />
              {activeCategory === "all" ? "All Legal Terms" : `${categories.find(c => c.id === activeCategory)?.name}`}
            </h2>
            <span className="text-sm text-purple-400">
              {filteredTerms.length} terms found
            </span>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="text-purple-400 text-4xl"
              >
                ⚖️
              </motion.div>
            </div>
          ) : filteredTerms.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-purple-300 mb-4">No terms match your search</p>
              <button 
                className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition duration-300"
                onClick={() => {
                  setSearchTerm("");
                  filterByCategory("all");
                }}
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTerms.map((item, index) => (
                <motion.div
                  key={item.term + index}
                  className="bg-[#1e293b]/80 hover:bg-purple-900/40 border border-purple-500/30 rounded-xl p-4 cursor-pointer transition-all duration-300 shadow-md hover:shadow-purple-500/20"
                  onClick={() => setSelectedTerm(item)}
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <h3 className="font-medium text-purple-300 flex items-center">
                    {item.category === "contract" && <FaScroll className="mr-2 text-sm" />}
                    {item.category === "criminal" && <FaGavel className="mr-2 text-sm" />}
                    {item.category === "property" && <FaLandmark className="mr-2 text-sm" />}
                    {item.category === "constitutional" && <FaBalanceScale className="mr-2 text-sm" />}
                    {item.term}
                  </h3>
                  <p className="text-sm text-purple-100 mt-2 line-clamp-2">
                    {item.definition}
                  </p>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-xs bg-purple-900/50 text-purple-300 px-2 py-1 rounded">
                      {item.category}
                    </span>
                    <span className="text-xs text-purple-400">Read more →</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Term Detail Modal */}
      <AnimatePresence>
        {selectedTerm && (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setSelectedTerm(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            <motion.div 
              className="relative max-w-2xl w-full bg-gradient-to-br from-[#1e1e2f] to-[#2d2d42] border border-purple-600/30 text-white rounded-2xl shadow-2xl overflow-hidden z-50"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500" />
              
              <button
                className="absolute top-4 right-4 text-purple-300 hover:text-white text-xl transition duration-300 z-10"
                onClick={() => setSelectedTerm(null)}
              >
                <FaTimes />
              </button>
              
              <div className="p-8">
                <div className="flex items-start mb-6">
                  <div className="text-4xl mr-4">
                    {selectedTerm.category === "contract" && <FaScroll />}
                    {selectedTerm.category === "criminal" && <FaGavel />}
                    {selectedTerm.category === "property" && <FaLandmark />}
                    {selectedTerm.category === "constitutional" && <FaBalanceScale />}
                    {!["contract", "criminal", "property", "constitutional"].includes(selectedTerm.category) && <FaBook />}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                      {selectedTerm.term}
                    </h3>
                    <span className="inline-block mt-1 text-sm bg-purple-900/50 text-purple-300 px-3 py-1 rounded-full">
                      {selectedTerm.category}
                    </span>
                  </div>
                </div>
                
                <div className="prose prose-invert max-w-none">
                  <p className="text-lg text-purple-100 leading-relaxed mb-6">
                    {selectedTerm.definition}
                  </p>
                  
                  {selectedTerm.example && (
                    <div className="bg-[#2d3748]/50 border-l-4 border-purple-500 pl-4 py-2 my-4 rounded-r">
                      <h4 className="font-medium text-purple-300 mb-1">Example:</h4>
                      <p className="text-purple-100 italic">"{selectedTerm.example}"</p>
                    </div>
                  )}
                  
                  {selectedTerm.origin && (
                    <div className="text-sm text-purple-400 mt-6">
                      <span className="font-medium">Origin:</span> {selectedTerm.origin}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="px-8 py-4 bg-[#1e293b]/50 border-t border-purple-500/20 flex justify-between items-center">
                <button 
                  className="text-purple-300 hover:text-white text-sm flex items-center"
                  onClick={() => {
                    const prevIndex = legalTerms.findIndex(t => t.term === selectedTerm.term) - 1;
                    if (prevIndex >= 0) {
                      setSelectedTerm(legalTerms[prevIndex]);
                    }
                  }}
                >
                  ← Previous Term
                </button>
                
                <button 
                  className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition duration-300 flex items-center"
                  onClick={() => {
                    const textToCopy = `${selectedTerm.term}: ${selectedTerm.definition}`;
                    navigator.clipboard.writeText(textToCopy);
                  }}
                >
                  Copy Definition
                </button>
                
                <button 
                  className="text-purple-300 hover:text-white text-sm flex items-center"
                  onClick={() => {
                    const nextIndex = legalTerms.findIndex(t => t.term === selectedTerm.term) + 1;
                    if (nextIndex < legalTerms.length) {
                      setSelectedTerm(legalTerms[nextIndex]);
                    }
                  }}
                >
                  Next Term →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LegalDictionary;
