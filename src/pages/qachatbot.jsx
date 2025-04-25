import React, { useState, useEffect, useRef } from 'react';
import { FiSend, FiCopy, FiRefreshCw, FiMenu, FiPaperclip } from 'react-icons/fi';
import { BsRobot } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';

const QAChatBot = () => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [botTyping, setBotTyping] = useState(false);
  const [historyCollapsed, setHistoryCollapsed] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const fileInputRef = useRef(null);
  const chatEndRef = useRef(null);

  const handleSend = async () => {
    if (!question.trim() && !pdfFile) return;

    const userMsg = {
      text: pdfFile ? `${question} (with PDF)` : question,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setQuestion('');
    setBotTyping(true);

    try {
      let res, data;

      if (pdfFile) {
        const formData = new FormData();
        formData.append('question', question);
        formData.append('file', pdfFile);

        res = await fetch("http://localhost:5000/ask_pdf", {
          method: "POST",
          body: formData,
        });
      } else {
        res = await fetch("http://localhost:5000/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question }),
        });
      }

      data = await res.json();

      const botMsg = {
        text: `🧠 ${data.answer}`,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, botMsg]);
      setPdfFile(null); // reset file
    } catch (err) {
      const errorMsg = {
        text: "❌ Error getting response. Please try again.",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    }

    setBotTyping(false);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleRegenerate = async (lastQuestion) => {
    if (!lastQuestion) return;
    setBotTyping(true);

    try {
      const res = await fetch("http://localhost:5000/ask", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: lastQuestion }),
      });

      const data = await res.json();

      const botMsg = {
        text: `🔁 ${data.answer}`,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          text: '⚠️ Failed to regenerate response.',
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    }

    setBotTyping(false);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, botTyping]);

  return (
    <div className="flex min-h-screen text-white bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">
      {/* Sidebar */}
      <div className="w-72 bg-[#0f172a]/60 backdrop-blur-md p-4 border-r border-gray-600 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-cyan-400">TALQS</h1>
          <button onClick={() => setHistoryCollapsed(!historyCollapsed)} className="text-cyan-300">
            <FiMenu size={20} />
          </button>
        </div>

        {!historyCollapsed && (
          <>
            <h2 className="text-lg font-semibold text-gray-300">History</h2>
            <ul className="flex flex-col gap-2 mt-2 overflow-y-auto max-h-[70vh]">
              {messages
                .filter((msg) => msg.sender === 'user')
                .map((msg, i) => (
                  <li
                    key={i}
                    className="bg-gray-700/60 p-2 rounded text-sm hover:bg-gray-600/60 transition"
                  >
                    {msg.text}
                    <div className="text-xs text-right text-gray-400">{msg.timestamp}</div>
                  </li>
                ))}
            </ul>
          </>
        )}
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-col flex-1 p-6 relative">
        <div className="text-3xl font-semibold text-cyan-300 mb-4">Legal Q/A Chatbot</div>

        <div className="flex-1 bg-white/5 backdrop-blur-xl rounded-xl p-6 mb-4 overflow-y-auto space-y-4 shadow-inner border border-white/10">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'bot' && <BsRobot className="text-cyan-400 text-xl mr-2 mt-1" />}
              <div
                className={`max-w-[70%] p-4 rounded-lg shadow-md relative group transition ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-br from-cyan-600 to-blue-500 text-white rounded-br-none'
                    : 'bg-gray-800/70 text-green-200 rounded-bl-none'
                }`}
              >
                <p className="text-sm whitespace-pre-line">{msg.text}</p>
                <div className="text-xs text-right text-gray-300 mt-1">{msg.timestamp}</div>
                {msg.sender === 'bot' && (
                  <div className="absolute right-2 bottom-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleCopy(msg.text)} className="text-gray-400 hover:text-white">
                      <FiCopy />
                    </button>
                    <button
                      onClick={() => handleRegenerate(messages[messages.length - 2]?.text)}
                      className="text-gray-400 hover:text-white"
                    >
                      <FiRefreshCw />
                    </button>
                  </div>
                )}
              </div>
              {msg.sender === 'user' && <FaUserCircle className="text-cyan-400 text-xl ml-2 mt-1" />}
            </div>
          ))}

          {botTyping && (
            <div className="text-green-400 italic animate-pulse">Bot is typing...</div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex items-center bg-gray-800/60 p-4 rounded-lg shadow-md gap-2">
          <input
            type="text"
            placeholder="Ask your legal question..."
            className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 text-lg"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <input
            type="file"
            accept=".pdf"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={(e) => setPdfFile(e.target.files[0])}
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="text-cyan-400 hover:text-white transition"
            title="Attach PDF"
          >
            <FiPaperclip size={20} />
          </button>
          <button
            onClick={handleSend}
            className="p-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full transition"
          >
            <FiSend size={20} />
          </button>
        </div>
        {pdfFile && (
          <div className="text-sm text-cyan-300 mt-2">📎 Attached: {pdfFile.name}</div>
        )}
      </div>
    </div>
  );
};

export default QAChatBot;
