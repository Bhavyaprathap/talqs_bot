import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const NDATemplate = () => {
  const [disclosingParty, setDisclosingParty] = useState("");
  const [receivingParty, setReceivingParty] = useState("");
  const [date, setDate] = useState("");
  const [purpose, setPurpose] = useState("");
  const [ndaText, setNdaText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const nda = `
NON-DISCLOSURE AGREEMENT (NDA)

Date: ${date}

Disclosing Party: ${disclosingParty}
Receiving Party: ${receivingParty}

Purpose: ${purpose}

Both parties agree to maintain confidentiality.
    `;

    setNdaText(nda);
  };

  const handleDownloadPDF = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/generate_nda_pdf",
        {
          disclosingParty,
          receivingParty,
          date,
          purpose,
        },
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "NDA_Document.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black flex items-center justify-center px-6 py-12 font-mono">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-xl bg-black border-2 border-purple-500/50 text-white p-8 rounded-xl shadow-lg shadow-purple-500/20 relative overflow-hidden"
      >
        {/* Neon border effect */}
        <div className="absolute inset-0 rounded-xl pointer-events-none">
          <div className="absolute inset-0 border-2 border-transparent rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 opacity-20"></div>
          <div className="absolute inset-0 border-2 border-transparent rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 opacity-10 animate-pulse"></div>
        </div>

        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400"
        >
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="inline-block mr-2"
          >
            ⚖️
          </motion.span>
          NDA Generator
        </motion.h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <input
              type="text"
              placeholder="Disclosing Party"
              value={disclosingParty}
              onChange={(e) => setDisclosingParty(e.target.value)}
              className="w-full p-3 bg-black/50 border border-purple-500/30 rounded-md text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <input
              type="text"
              placeholder="Receiving Party"
              value={receivingParty}
              onChange={(e) => setReceivingParty(e.target.value)}
              className="w-full p-3 bg-black/50 border border-purple-500/30 rounded-md text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 bg-black/50 border border-purple-500/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <input
              type="text"
              placeholder="Purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full p-3 bg-black/50 border border-purple-500/30 rounded-md text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-md shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
            >
              Generate NDA
            </button>
          </motion.div>
        </form>

        {ndaText && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-6 overflow-hidden"
          >
            <div className="bg-black/50 border border-purple-500/40 p-4 rounded-md text-sm whitespace-pre-wrap text-purple-100 neon-text-glow">
              <h2 className="text-lg font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                📝 Preview NDA
              </h2>
              {ndaText}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDownloadPDF}
              className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-md shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
            >
              Download as PDF
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default NDATemplate;