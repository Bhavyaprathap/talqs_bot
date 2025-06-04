import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaBalanceScale, FaGavel, FaFileSignature, FaTimes, FaScroll, FaStamp, FaUserTie, FaHistory } from "react-icons/fa";
import { GiScaleMail, GiLawStar } from "react-icons/gi";

const NDATemplate = () => {
  const [disclosingParty, setDisclosingParty] = useState("");
  const [receivingParty, setReceivingParty] = useState("");
  const [date, setDate] = useState("");
  const [purpose, setPurpose] = useState("");
  const [ndaText, setNdaText] = useState("");
  const [duration, setDuration] = useState("2 years");
  const [jurisdiction, setJurisdiction] = useState("California");
  const [showExitModal, setShowExitModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const nda = `
NON-DISCLOSURE AGREEMENT (NDA)

Date: ${date}

This Non-Disclosure Agreement ("Agreement") is made and entered into by and between:

Disclosing Party: ${disclosingParty}
Receiving Party: ${receivingParty}

1. PURPOSE
The parties wish to explore a business opportunity regarding: ${purpose}

2. CONFIDENTIAL INFORMATION
All non-public, confidential or proprietary information disclosed by Disclosing Party.

3. OBLIGATIONS
Receiving Party agrees to:
- Maintain confidentiality
- Use information solely for the Purpose
- Not disclose to third parties without prior written consent

4. DURATION
This Agreement shall remain in effect for ${duration}.

5. GOVERNING LAW
This Agreement shall be governed by the laws of ${jurisdiction}.

6. MISCELLANEOUS
This Agreement constitutes the entire understanding between the parties.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the Date first written above.

___________________________          ___________________________
Disclosing Party Signature           Receiving Party Signature
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
          duration,
          jurisdiction
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

  const handleExit = () => {
    setShowExitModal(true);
  };

  const confirmExit = () => {
    // In a real app, you might navigate away or close the window
    window.location.href = "/";
  };

  const jurisdictionOptions = [
    "California", "New York", "Texas", "Delaware", 
    "Illinois", "Florida", "United Kingdom", "European Union"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-6 py-12 font-serif relative overflow-hidden">
      {/* Animated Legal Icons Background */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              y: Math.random() * -100,
              x: Math.random() * window.innerWidth,
              opacity: 0,
              rotate: Math.random() * 360
            }}
            animate={{ 
              y: window.innerHeight + 100,
              opacity: [0, 0.5, 0],
              transition: {
                duration: 10 + Math.random() * 20,
                repeat: Infinity,
                delay: Math.random() * 5
              }
            }}
            className="absolute text-gray-400 text-2xl"
          >
            {Math.random() > 0.5 ? <FaGavel /> : <FaBalanceScale />}
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl bg-gray-800 border border-gray-700 text-gray-100 p-8 rounded-lg shadow-xl relative z-10"
      >
        {/* Header with Exit Button */}
        <div className="flex justify-between items-center mb-6">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-3xl font-bold flex items-center text-amber-400"
          >
            <GiLawStar className="mr-3 text-amber-500" />
            Legal NDA Generator
          </motion.h1>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleExit}
            className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-700 transition-colors"
            aria-label="Exit"
          >
            <FaTimes />
          </motion.button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
                <FaUserTie className="mr-2 text-amber-400" />
                Disclosing Party
              </label>
              <input
                type="text"
                placeholder="Company/Individual Name"
                value={disclosingParty}
                onChange={(e) => setDisclosingParty(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-transparent"
                required
              />
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
                <FaUserTie className="mr-2 text-amber-400" />
                Receiving Party
              </label>
              <input
                type="text"
                placeholder="Company/Individual Name"
                value={receivingParty}
                onChange={(e) => setReceivingParty(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-transparent"
                required
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
                <FaHistory className="mr-2 text-amber-400" />
                Effective Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-transparent"
                required
              />
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
                <FaStamp className="mr-2 text-amber-400" />
                Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="6 months">6 months</option>
                <option value="1 year">1 year</option>
                <option value="2 years">2 years</option>
                <option value="5 years">5 years</option>
                <option value="Indefinite">Indefinite</option>
              </select>
            </motion.div>
          </div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
              <FaFileSignature className="mr-2 text-amber-400" />
              Purpose
            </label>
            <input
              type="text"
              placeholder="Purpose of the NDA"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-transparent"
              required
            />
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
              <GiScaleMail className="mr-2 text-amber-400" />
              Governing Law/Jurisdiction
            </label>
            <select
              value={jurisdiction}
              onChange={(e) => setJurisdiction(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-transparent"
            >
              {jurisdictionOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="pt-2"
          >
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white font-bold py-3 px-4 rounded-md shadow-lg hover:shadow-amber-500/20 transition-all duration-300 flex items-center justify-center"
            >
              <FaScroll className="mr-2" />
              Generate NDA Document
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
            <div className="bg-gray-700 border border-gray-600 p-4 rounded-md text-sm whitespace-pre-wrap font-mono text-gray-200">
              <h2 className="text-lg font-bold mb-2 text-amber-400 flex items-center">
                <FaFileSignature className="mr-2" />
                NDA Document Preview
              </h2>
              <div className="overflow-y-auto max-h-96 p-3 bg-gray-800 rounded border border-gray-600">
                {ndaText}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownloadPDF}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white font-bold py-3 px-4 rounded-md shadow-lg hover:shadow-amber-500/20 transition-all duration-300 flex items-center justify-center"
              >
                <FaFileSignature className="mr-2" />
                Download as PDF
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigator.clipboard.writeText(ndaText)}
                className="w-full bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white font-bold py-3 px-4 rounded-md shadow-lg hover:shadow-gray-500/20 transition-all duration-300 flex items-center justify-center"
              >
                <FaScroll className="mr-2" />
                Copy to Clipboard
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Exit Confirmation Modal */}
      {showExitModal && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-800 border border-gray-700 rounded-lg p-6 max-w-md w-full"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-amber-400 flex items-center">
                <FaBalanceScale className="mr-2" />
                Confirm Exit
              </h3>
              <button 
                onClick={() => setShowExitModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <FaTimes />
              </button>
            </div>
            <p className="text-gray-300 mb-6">
              Are you sure you want to exit the NDA Generator? Any unsaved changes will be lost.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowExitModal(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmExit}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 rounded text-white transition-colors"
              >
                Exit
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default NDATemplate;
