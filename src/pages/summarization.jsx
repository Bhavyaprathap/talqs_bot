import React, { useEffect, useRef, useState } from 'react';
import { Send, Menu, X, FileText, Plus, ArrowLeft, Moon, Sun } from 'lucide-react';

export default function SummarizationApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState();
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);

  const [summaryHistory, setSummaryHistory] = useState([
    { 
      id: 1, 
      title: "Research Paper Summary", 
      timestamp: "2023-05-15 14:30",
      content: "Original text about machine learning algorithms...",
      summary: "The paper discusses three main ML algorithms: neural networks, decision trees, and SVMs, comparing their performance on image recognition tasks."
    },
    { 
      id: 2, 
      title: "Meeting Notes", 
      timestamp: "2023-05-10 09:15",
      content: "Long meeting transcript about Q2 goals...",
      summary: "Key points: 1) Increase marketing budget by 15%, 2) Launch new product in June, 3) Hire 2 more developers."
    },
  ]);

  // Check if mobile view
  const checkIfMobile = () => typeof window !== 'undefined' && window.innerWidth < 768;
  const [isMobile, setIsMobile] = useState(checkIfMobile());

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(checkIfMobile());
      if (!checkIfMobile() && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isSidebarOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

const handleSend = async () => {
  if (!input.trim() || isTyping) return;

  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const userMessage = {
    sender: 'user',
    text: input,
    id: Date.now(),
    timestamp,
  };

  setMessages(prev => [...prev, userMessage]);
  setInput('');
  setIsTyping(true);
  setTimeout(() => inputRef.current?.focus(), 0);

  try {
    const response = await fetch('http://localhost:5000/api/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input }),
    });

    if (!response.ok) throw new Error(`Server error: ${response.status}`);
    const data = await response.json();

    const botResponse = {
      sender: 'bot',
      text: data.summary || '⚠ No summary received.',
      id: Date.now() + 1,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, botResponse]);

    
  } catch (error) {
    console.error('Fetch error:', error);
    const errorMessage = {
      sender: 'bot',
      text: `❌ Error: ${error.message || 'Try again later.'}`,
      id: Date.now() + 1,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, errorMessage]);
  }

  setIsTyping(false);
};




  const generateSummary = (text) => {
    // This would be replaced with actual summarization API calls
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const importantSentences = sentences.filter((_, i) => i % 2 === 0 || i === sentences.length - 1);
    
    if (importantSentences.length === 0) {
      return "I couldn't generate a meaningful summary from this text. Could you provide more content?";
    }
    
    return "Here's the summary:\n" + 
      importantSentences.map((s, i) => `${i + 1}) ${s.trim()}.`).join('\n') + 
      `\n\nSummary ratio: ${Math.round((importantSentences.length / sentences.length) * 100)}% reduction`;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const startNewSummary = () => {
    if (messages.length > 0) {
      const originalText = messages.find(m => m.sender === 'user')?.text || "";
      const summary = messages.find(m => m.sender === 'bot')?.text || "";
      
      const newSummary = {
        id: Date.now(),
        title: `Summary ${summaryHistory.length + 1}`,
        timestamp: new Date().toLocaleString(),
        content: originalText,
        summary: summary
      };
      setSummaryHistory(prev => [newSummary, ...prev]);
    }
    setMessages([]);
    if (isMobile) setIsSidebarOpen(false);
  };

  const navigateToMain = () => {
    console.log("Navigating to main page");
    window.location.href = "/";
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Theme classes
  const bgColor = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const textColor = darkMode ? 'text-gray-100' : 'text-gray-800';
  const sidebarBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const cardBg = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  const inputBg = darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300';
  const messageUserBg = darkMode ? 'bg-blue-600' : 'bg-blue-500';
  const messageBotBg = darkMode ? 'bg-gray-700' : 'bg-gray-100';
  const navBg = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  const timestampColor = darkMode ? 'text-gray-400' : 'text-gray-500';

  return (
    <div className={`flex h-screen w-full ${bgColor} ${textColor}`}>
      {/* Mobile Sidebar Overlay */}
      {isMobile && isSidebarOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div 
            className={`w-72 ${sidebarBg} shadow-xl p-4 z-50 border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Summary History</h2>
              <button 
                onClick={() => setIsSidebarOpen(false)} 
                className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <X size={24} />
              </button>
            </div>
            
            <button
              onClick={startNewSummary}
              className="w-full mb-4 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
            >
              <Plus size={18} />
              New Summary
            </button>
            
            <div className="space-y-2 max-h-[70vh] overflow-y-auto">
              {summaryHistory.map(item => (
                <div 
                  key={item.id}
                  className={`p-3 hover:${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg cursor-pointer flex flex-col gap-1 border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                  onClick={() => {
                    setMessages([
                      { sender: 'user', text: item.content, id: Date.now(), timestamp: "Now" },
                      { sender: 'bot', text: item.summary, id: Date.now() + 1, timestamp: "Now" }
                    ]);
                    setIsSidebarOpen(false);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <FileText size={16} className={darkMode ? "text-gray-400" : "text-gray-500"} />
                    <span className="truncate font-medium">{item.title}</span>
                  </div>
                  <span className={`text-xs ${timestampColor}`}>
                    {new Date(item.timestamp).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div
            className="flex-1 bg-black bg-opacity-30"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        </div>
      )}

      {/* Desktop Sidebar - Sliding Panel */}
      {!isMobile && (
        <div 
          className={`fixed inset-y-0 left-0 z-30 w-72 ${sidebarBg} border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-4 flex flex-col transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0 shadow-lg' : '-translate-x-full'}`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Summary History</h2>
            <button 
              onClick={() => setIsSidebarOpen(false)} 
              className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <X size={24} />
            </button>
          </div>
          
          <button
            onClick={startNewSummary}
            className="w-full mb-4 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
          >
            <Plus size={18} />
            New Summary
          </button>
          
          <div className="flex-1 overflow-y-auto">
            {summaryHistory.map(item => (
              <div 
                key={item.id}
                className={`p-3 hover:${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg cursor-pointer flex flex-col gap-1 mb-2 border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                onClick={() => {
                  setMessages([
                    { sender: 'user', text: item.content, id: Date.now(), timestamp: "Now" },
                    { sender: 'bot', text: item.summary, id: Date.now() + 1, timestamp: "Now" }
                  ]);
                }}
              >
                <div className="flex items-center gap-2">
                  <FileText size={16} className={darkMode ? "text-gray-400" : "text-gray-500"} />
                  <span className="truncate font-medium">{item.title}</span>
                </div>
                <span className={`text-xs ${timestampColor}`}>
                  {new Date(item.timestamp).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Header with Exit Button and Dark Mode Toggle */}
        <div className={`flex items-center justify-between p-4 border-b ${navBg} ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`mr-4 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <Menu size={24} />
            </button>
            <h1 className={`text-xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              SummarizationBot<span className={darkMode ? "text-white" : "text-gray-800"}>™</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${darkMode ? 'text-yellow-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={navigateToMain}
              className={`flex items-center ${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-500'} font-medium`}
            >
              <ArrowLeft size={20} className="mr-1" />
              <span className="text-sm">Exit</span>
            </button>
          </div>
        </div>

        {/* Chat Container with Floating Card */}
        <div className="flex-1 flex flex-col p-4 overflow-hidden">
          <div className="flex-1 flex justify-center overflow-hidden">
            <div className={`w-full max-w-4xl h-full flex flex-col rounded-xl shadow-md border ${cardBg} overflow-hidden`}>
              {/* Messages Container - Scrollable Area */}
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-6 space-y-4"
              >
                {messages.length === 0 && (
                  <div className={`flex flex-col items-center justify-center h-full ${darkMode ? 'text-gray-400' : 'text-gray-500'} py-16`}>
                    <FileText size={48} className="mb-4 opacity-50" />
                    <p className="text-xl">Text Summarization Tool</p>
                    <p className="text-sm mt-2">Paste your text to get a concise summary</p>
                    <p className="text-xs mt-4 text-center max-w-md">
                      Works best with articles, research papers, meeting notes, and other long-form content
                    </p>
                  </div>
                )}
                
                {messages.map((msg, i) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                      <div
                        className={`px-4 py-3 rounded-xl transition-all duration-300 whitespace-pre-wrap ${
                          msg.sender === 'user'
                            ? `${messageUserBg} text-white rounded-br-none`
                            : `${messageBotBg} ${darkMode ? 'text-gray-100' : 'text-gray-800'} rounded-bl-none border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`
                        }`}
                        style={{
                          opacity: 0,
                          animation: `fadeIn 0.3s forwards ${i * 0.1}s`
                        }}
                      >
                        {msg.text}
                      </div>
                      <span className={`text-xs mt-1 ${timestampColor}`}>
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className={`max-w-[80%] px-4 py-3 rounded-xl ${messageBotBg} ${darkMode ? 'text-gray-100' : 'text-gray-800'} rounded-bl-none border ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex space-x-1`}>
                      <div className={`w-2 h-2 rounded-full ${darkMode ? 'bg-gray-400' : 'bg-gray-500'} animate-bounce`} style={{ animationDelay: '0ms' }} />
                      <div className={`w-2 h-2 rounded-full ${darkMode ? 'bg-gray-400' : 'bg-gray-500'} animate-bounce`} style={{ animationDelay: '150ms' }} />
                      <div className={`w-2 h-2 rounded-full ${darkMode ? 'bg-gray-400' : 'bg-gray-500'} animate-bounce`} style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
              </div>

              {/* New Summary Button */}
              <div className="px-4 pt-2 border-t border-gray-200">
                <button
                  onClick={startNewSummary}
                  className="w-full mb-2 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition text-sm"
                >
                  <Plus size={16} />
                  Start New Summary
                </button>
              </div>

              {/* Input Area - Fixed Position */}
              <div className={`p-4 border-t ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                <div className="relative">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={4}
                    placeholder="Paste the text you want to summarize..."
                    className={`w-full resize-none border ${inputBg} ${textColor} rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                  <button 
                    onClick={handleSend} 
                    disabled={!input.trim()}
                    className={`absolute right-3 bottom-3 p-1 rounded-full ${input.trim() ? (darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800') : (darkMode ? 'text-gray-500' : 'text-gray-400')}`}
                  >
                    <Send />
                  </button>
                </div>
                <p className={`text-xs mt-1 ${timestampColor}`}>
                  Tip: For best results, provide at least 3-4 sentences
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
