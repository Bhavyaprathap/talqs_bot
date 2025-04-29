import React, { useState, useRef, useEffect } from 'react';
import { 
  FiSend, FiUpload, FiCopy, FiRefreshCcw, 
  FiLogOut, FiMenu, FiX, FiMic, 
  FiImage, FiFileText, FiSettings 
} from 'react-icons/fi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { motion, AnimatePresence } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const QAChatBot = () => {
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('chat');
  const [isRecording, setIsRecording] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [isParticlesLoaded, setIsParticlesLoaded] = useState(false);

  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const particlesInit = async (engine) => {
    await loadFull(engine);
    setIsParticlesLoaded(true);
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isBotTyping]);

  const handleSendMessage = async () => {
    if (!userMessage.trim() && !selectedFile) return;

    const newUserMessage = { 
      sender: 'user', 
      text: userMessage || selectedFile?.name,
      timestamp: new Date().toLocaleTimeString(),
      id: Date.now()
    };
    
    setChatHistory((prev) => [...prev, newUserMessage]);
    setUserMessage('');
    setSelectedFile(null);
    setIsBotTyping(true);

    // Simulate bot reply
    setTimeout(() => {
      const newBotMessage = {
        sender: 'bot',
        text: `Here's a detailed response to your query about "${newUserMessage.text}". I've analyzed the information and can provide insights on this topic. Let me know if you need more details!`,
        timestamp: new Date().toLocaleTimeString(),
        id: Date.now() + 1
      };
      setChatHistory((prev) => [...prev, newBotMessage]);
      setIsBotTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setUserMessage(`[File: ${e.target.files[0].name}]`);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    // Add a notification here if you want
  };

  const handleRegenerate = (userText) => {
    if (!userText) return;
    setIsBotTyping(true);
    setTimeout(() => {
      const newBotMessage = {
        sender: 'bot',
        text: `Alternative response for: "${userText}". There are multiple perspectives on this topic. Another approach would be to consider...`,
        timestamp: new Date().toLocaleTimeString(),
        id: Date.now() + 1
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

  const startRecording = () => {
    setIsRecording(true);
    // Add actual voice recording implementation
  };

  const stopRecording = () => {
    setIsRecording(false);
    // Add actual voice recording implementation
  };

  const clearChat = () => {
    setChatHistory([]);
  };

  const particlesOptions = {
    background: {
      color: {
        value: theme === 'dark' ? '#111827' : '#f3f4f6',
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: 'push',
        },
        onHover: {
          enable: true,
          mode: 'repulse',
        },
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: theme === 'dark' ? '#3b82f6' : '#2563eb',
      },
      links: {
        color: theme === 'dark' ? '#3b82f6' : '#2563eb',
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      collisions: {
        enable: true,
      },
      move: {
        direction: 'none',
        enable: true,
        outModes: {
          default: 'bounce',
        },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  };

  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} text-${theme === 'dark' ? 'white' : 'gray-900'} overflow-hidden relative`}>
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <Particles 
          id="tsparticles" 
          init={particlesInit} 
          options={particlesOptions} 
        />
      </div>
      
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -300 }}
        animate={{ x: isSidebarOpen ? 0 : -250 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`w-64 h-full bg-${theme === 'dark' ? 'gray-800/90' : 'white/90'} backdrop-blur-md z-10 shadow-xl flex flex-col border-r border-${theme === 'dark' ? 'gray-700' : 'gray-200'} relative`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold">Legal Chat</h1>
          <button 
            onClick={toggleSidebar} 
            className={`p-2 rounded-full hover:bg-${theme === 'dark' ? 'gray-700' : 'gray-200'}`}
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="flex border-b border-gray-700">
          <button 
            onClick={() => setActiveTab('chat')} 
            className={`flex-1 py-3 font-medium ${activeTab === 'chat' ? `text-cyan-400 border-b-2 border-cyan-400` : ''}`}
          >
            Chats
          </button>
          <button 
            onClick={() => setActiveTab('files')} 
            className={`flex-1 py-3 font-medium ${activeTab === 'files' ? `text-cyan-400 border-b-2 border-cyan-400` : ''}`}
          >
            Files
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {activeTab === 'chat' && (
            chatHistory.filter(msg => msg.sender === 'user').map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-3 rounded-lg cursor-pointer transition-all ${theme === 'dark' ? 'bg-gray-700 hover:bg-cyan-600' : 'bg-gray-100 hover:bg-cyan-100'}`}
                onClick={() => setUserMessage(msg.text)}
              >
                <div className="text-sm font-medium truncate">{msg.text}</div>
                <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{msg.timestamp}</div>
              </motion.div>
            ))
          )}
          {activeTab === 'files' && (
            <div className="text-center py-10">
              <FiFileText size={48} className="mx-auto mb-4 opacity-30" />
              <p className="text-sm">Your shared files will appear here</p>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-700 space-y-2">
          <button
            onClick={clearChat}
            className={`w-full flex items-center justify-center gap-2 p-2 rounded-lg transition ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            <FiRefreshCcw size={16} />
            Clear Chat
          </button>
          <button
            onClick={handleExit}
            className="w-full flex items-center justify-center gap-2 p-2 bg-red-500 hover:bg-red-600 rounded-lg transition text-white"
          >
            <FiLogOut size={16} />
            Exit
          </button>
        </div>
      </motion.div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Header */}
        <div className={`flex items-center justify-between p-4 border-b ${theme === 'dark' ? 'border-gray-700 bg-gray-800/80' : 'border-gray-200 bg-white/80'} backdrop-blur-md`}>
          <button 
            onClick={toggleSidebar}
            className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
          >
            <FiMenu size={20} />
          </button>
          
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold">Quantum Assistant</h2>
            <div className={`w-3 h-3 rounded-full ${isBotTyping ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
            >
              <FiSettings size={20} />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 relative">
          {chatHistory.length === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center max-w-md p-8 rounded-xl backdrop-blur-sm"
              >
                <h3 className="text-2xl font-bold mb-2">Welcome to Legal Chat</h3>
                <p className={`mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Ask me anything or upload a file to get started. I can help with information, analysis, and creative ideas.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                    onClick={() => setUserMessage("What's the latest in AI technology?")}
                  >
                    Popular talks
                  </motion.button>
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                    onClick={() => setUserMessage("Explain quantum computing basics")}
                  >
                    Legal Basics
                  </motion.button>
                </div>
              </motion.div>
            </div>
          )}

          <AnimatePresence>
            {chatHistory.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: msg.sender === 'user' ? 100 : -100 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`max-w-3xl p-4 rounded-3xl shadow-lg ${msg.sender === 'user' 
                    ? `${theme === 'dark' ? 'bg-gradient-to-r from-blue-600 to-cyan-500' : 'bg-gradient-to-r from-blue-500 to-cyan-400'} text-white` 
                    : `${theme === 'dark' ? 'bg-gray-700' : 'bg-white border border-gray-200'} text-${theme === 'dark' ? 'white' : 'gray-800'}`}`}
                >
                  <div className="font-medium">{msg.text}</div>
                  <div className={`flex items-center justify-between mt-2 text-xs ${msg.sender === 'user' ? 'text-blue-100' : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    <span>{msg.timestamp}</span>
                    {msg.sender === 'bot' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleCopy(msg.text)}
                          className="hover:text-cyan-400 transition"
                          title="Copy"
                        >
                          <FiCopy size={14} />
                        </button>
                        <button
                          onClick={() => handleRegenerate(chatHistory[chatHistory.indexOf(msg) - 1]?.text)}
                          className="hover:text-cyan-400 transition"
                          title="Regenerate"
                        >
                          <FiRefreshCcw size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isBotTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className={`p-4 rounded-3xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-white border border-gray-200'} flex items-center gap-2`}>
                <AiOutlineLoading3Quarters className="animate-spin" />
                <span className="animate-pulse">Quantum Assistant is thinking...</span>
              </div>
            </motion.div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className={`p-4 ${theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-md border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          {selectedFile && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-center justify-between mb-3 p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}
            >
              <div className="flex items-center gap-2">
                <FiFileText />
                <span className="truncate max-w-xs">{selectedFile.name}</span>
              </div>
              <button 
                onClick={() => setSelectedFile(null)}
                className="p-1 rounded-full hover:bg-gray-600"
              >
                <FiX size={16} />
              </button>
            </motion.div>
          )}
          
          <div className="flex items-center gap-2">
            <div className="flex gap-2">
              <button 
                onClick={() => fileInputRef.current.click()}
                className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                title="Upload file"
              >
                <FiUpload size={20} />
              </button>
              <button 
                onClick={isRecording ? stopRecording : startRecording}
                className={`p-2 rounded-full ${isRecording ? 'animate-pulse text-red-500' : ''} ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                title={isRecording ? "Stop recording" : "Start recording"}
              >
                <FiMic size={20} />
              </button>
              <button 
                onClick={() => {}}
                className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                title="Insert image"
              >
                <FiImage size={20} />
              </button>
            </div>
            
            <input
              type="text"
              placeholder="Ask me anything..."
              className={`flex-1 p-4 rounded-full ${theme === 'dark' ? 'bg-gray-700 placeholder-gray-400 focus:ring-cyan-500' : 'bg-gray-100 placeholder-gray-500 focus:ring-blue-500'} focus:outline-none focus:ring-2`}
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendMessage}
              disabled={!userMessage.trim() && !selectedFile}
              className={`p-3 rounded-full ${(!userMessage.trim() && !selectedFile) 
                ? `${theme === 'dark' ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-400'}` 
                : 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'}`}
            >
              <FiSend size={20} />
            </motion.button>
          </div>
          
          <input 
            type="file" 
            ref={fileInputRef}
            className="hidden" 
            onChange={handleFileChange} 
          />
        </div>
      </div>
    </div>
  );
};

export default QAChatBot;