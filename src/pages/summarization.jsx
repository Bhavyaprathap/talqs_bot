import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiUpload, FiCopy, FiRefreshCcw, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Summarization = () => {
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isBotTyping]);

  const handleSendMessage = async () => {
    if (!userMessage.trim() && !selectedFile) return;

    const newUserMessage = { sender: 'user', text: userMessage || selectedFile?.name };
    setChatHistory((prev) => [...prev, newUserMessage]);
    setUserMessage('');
    setSelectedFile(null);
    setIsBotTyping(true);

    // Simulate bot reply
    setTimeout(() => {
      const newBotMessage = {
        sender: 'bot',
        text: `This is a generated answer for: "${newUserMessage.text}"`,
      };
      setChatHistory((prev) => [...prev, newBotMessage]);
      setIsBotTyping(false);
    }, 1500);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleRegenerate = (userText) => {
    if (!userText) return;
    setIsBotTyping(true);
    setTimeout(() => {
      const newBotMessage = {
        sender: 'bot',
        text: `Regenerated answer for: "${userText}"`,
      };
      setChatHistory((prev) => [...prev, newBotMessage]);
      setIsBotTyping(false);
    }, 1500);
  };

  const handleExit = () => {
    window.location.href = '/';
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
      
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-16'} bg-gray-900/70 backdrop-blur-md transition-all duration-300 shadow-md flex flex-col`}>
        <div className="flex items-center justify-between p-4">
          {isSidebarOpen && <h1 className="text-xl font-bold">Chat History</h1>}
          <button onClick={toggleSidebar} className="text-white">
            {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {isSidebarOpen && (
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {chatHistory.filter(msg => msg.sender === 'user').map((msg, idx) => (
              <div
                key={idx}
                className="p-2 bg-gray-700 rounded hover:bg-cyan-600 transition text-sm truncate cursor-pointer"
                title={msg.text}
                onClick={() => setUserMessage(msg.text)}
              >
                {msg.text}
              </div>
            ))}
          </div>
        )}

        <div className="p-4">
          <button
            onClick={handleExit}
            className="w-full flex items-center justify-center gap-2 p-2 bg-red-500 hover:bg-red-600 rounded transition"
          >
            <FiLogOut />
            {isSidebarOpen && "Exit"}
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {chatHistory.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs p-4 rounded-2xl shadow-md ${
                msg.sender === 'user' ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' : 'bg-gray-700 text-white'
              }`}>
                {msg.text}
                {msg.sender === 'bot' && (
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleCopy(msg.text)}
                      className="text-xs hover:text-cyan-300"
                    >
                      <FiCopy />
                    </button>
                    <button
                      onClick={() => handleRegenerate(chatHistory[idx - 1]?.text)}
                      className="text-xs hover:text-cyan-300"
                    >
                      <FiRefreshCcw />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isBotTyping && (
            <div className="flex justify-start">
              <div className="p-4 bg-gray-700 text-white rounded-2xl max-w-xs flex items-center gap-2">
                <AiOutlineLoading3Quarters className="animate-spin" />
                <span className="animate-pulse">Typing...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="bg-gray-900/80 p-4 flex items-center gap-2 shadow-inner">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 p-3 rounded-2xl bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <label className="cursor-pointer">
            <FiUpload size={24} className="hover:text-cyan-300" />
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>
          <button
            onClick={handleSendMessage}
            className="p-3 bg-cyan-600 hover:bg-cyan-700 rounded-2xl text-white"
          >
            <FiSend size={24} />
          </button>
        </div>
      </div>

    </div>
  );
};

export default Summarization;
