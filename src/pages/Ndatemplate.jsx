import React, { useState } from "react";
import axios from "axios";

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
        "http://localhost:5000/generate_nda_pdf", // ✅ Make sure this matches your backend route
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
    <div className="min-h-screen bg-gradient-to-bl from-[#1a1a1a] via-[#121212] to-[#2c2c2c] flex items-center justify-center px-6 py-12 font-serif">
      <div className="w-full max-w-xl bg-[#1e1e1e] border border-[#3a3a3a] text-white p-8 rounded-xl shadow-lg shadow-black/30">
        <h1 className="text-4xl font-bold mb-6 text-center text-purple-300">
          ⚖️ NDA Generator
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Disclosing Party"
            value={disclosingParty}
            onChange={(e) => setDisclosingParty(e.target.value)}
            className="w-full p-2 bg-[#2a2a2a] border border-gray-600 rounded-md text-white placeholder-gray-400"
          />

          <input
            type="text"
            placeholder="Receiving Party"
            value={receivingParty}
            onChange={(e) => setReceivingParty(e.target.value)}
            className="w-full p-2 bg-[#2a2a2a] border border-gray-600 rounded-md text-white placeholder-gray-400"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 bg-[#2a2a2a] border border-gray-600 rounded-md text-white"
          />

          <input
            type="text"
            placeholder="Purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="w-full p-2 bg-[#2a2a2a] border border-gray-600 rounded-md text-white placeholder-gray-400"
          />

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-md"
          >
            Generate NDA
          </button>
        </form>

        {ndaText && (
          <>
            <div className="mt-6 bg-[#2a2a2a] border border-purple-500/40 p-4 rounded-md text-sm whitespace-pre-wrap text-yellow-100">
              <h2 className="text-lg font-bold mb-2 text-yellow-300">
                📝 Preview NDA
              </h2>
              {ndaText}
            </div>

            <button
              onClick={handleDownloadPDF}
              className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
            >
              Download as PDF
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NDATemplate;
