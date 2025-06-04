// import React, { useEffect, useRef, useState } from 'react';
// import { Send, Menu, X, MessageSquare, Plus, Moon, Sun } from 'lucide-react';

// export default function ChatApp() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isTyping, setIsTyping] = useState(false);
//   const [darkMode, setDarkMode] = useState(true);
//   const chatContainerRef = useRef(null);

// const handleSubmit = async () => {
//   if (!input.trim() || isTyping) return;

//   const userMessage = {
//     sender: 'user',
//     text: input,
//     id: Date.now(),
//     timestamp: new Date().toLocaleTimeString(),
//   };

//   setMessages(prev => [...prev, userMessage]);
//   setInput('');
//   setIsTyping(true);

//   try {
//     const response = await fetch('http://localhost:5000/api/search', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ question: input }),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
    
//     const botMessage = {
//       sender: 'bot',
//       text: data.answer || 'No answer found.',
//       id: Date.now() + 1,
//       timestamp: new Date().toLocaleTimeString(),
//     };

//     setMessages(prev => [...prev, botMessage]);
//   } catch (error) {
//     console.error('Fetch error:', error);
//     const errorMessage = {
//       sender: 'bot',
//       text: `Error: Could not connect to the server. Please make sure the backend is running.`,
//       id: Date.now() + 1,
//       timestamp: new Date().toLocaleTimeString(),
//     };
//     setMessages(prev => [...prev, errorMessage]);
//   } finally {
//     setIsTyping(false);
//   }
// };
//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit();
//     }
//   };

//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   // Theme classes
//   const bgColor = darkMode ? 'bg-gray-900' : 'bg-gray-50';
//   const textColor = darkMode ? 'text-gray-100' : 'text-gray-800';
//   const sidebarBg = darkMode ? 'bg-gray-800' : 'bg-white';
//   const inputBg = darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300';
//   const messageUserBg = darkMode ? 'bg-blue-600' : 'bg-blue-500';
//   const messageBotBg = darkMode ? 'bg-gray-700' : 'bg-gray-100';
//   const navBg = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';

//   return (
//     <div className={`flex h-screen w-full ${bgColor} ${textColor}`}>
//       {/* Sidebar */}
//       <div 
//         className={`fixed inset-y-0 left-0 z-40 w-64 ${sidebarBg} border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'} transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}
//       >
//         <div className="p-4">
//           <button 
//             onClick={() => setIsSidebarOpen(false)}
//             className={`mb-4 p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} md:hidden`}
//           >
//             <X size={20} />
//           </button>
//           <button
//             onClick={() => setMessages([])}
//             className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition mb-6"
//           >
//             <Plus size={18} />
//             New Chat
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Header */}
//         <div className={`flex items-center justify-between p-4 border-b ${navBg} ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//           <button 
//             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//             className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} md:hidden`}
//           >
//             <Menu size={20} />
//           </button>
//           <h1 className="text-xl font-bold">Search Assistant</h1>
//           <button 
//             onClick={() => setDarkMode(!darkMode)}
//             className={`p-2 rounded-full ${darkMode ? 'text-yellow-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
//           >
//             {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//           </button>
//         </div>

//         {/* Chat Area */}
//         <div 
//           ref={chatContainerRef}
//           className="flex-1 overflow-y-auto p-4 space-y-4"
//         >
//           {messages.length === 0 ? (
//             <div className={`flex flex-col items-center justify-center h-full ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//               <MessageSquare size={48} className="mb-4 opacity-50" />
//               <p className="text-xl">Ask me anything</p>
//               <p className="text-sm mt-2">I'll search the web for answers</p>
//             </div>
//           ) : (
//             messages.map((msg) => (
//               <div
//                 key={msg.id}
//                 className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//               >
//                 <div
//                   className={`max-w-[80%] px-4 py-3 rounded-lg ${
//                     msg.sender === 'user'
//                       ? `${messageUserBg} text-white rounded-br-none`
//                       : `${messageBotBg} ${darkMode ? 'text-gray-100' : 'text-gray-800'} rounded-bl-none`
//                   }`}
//                 >
//                   {msg.text}
//                   <div className={`text-xs mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
//                     {msg.timestamp}
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}

//           {isTyping && (
//             <div className="flex justify-start">
//               <div className={`px-4 py-3 rounded-lg ${messageBotBg} ${darkMode ? 'text-gray-100' : 'text-gray-800'} rounded-bl-none flex space-x-2`}>
//                 <div className={`w-2 h-2 rounded-full ${darkMode ? 'bg-gray-400' : 'bg-gray-500'} animate-bounce`} />
//                 <div className={`w-2 h-2 rounded-full ${darkMode ? 'bg-gray-400' : 'bg-gray-500'} animate-bounce`} style={{ animationDelay: '0.2s' }} />
//                 <div className={`w-2 h-2 rounded-full ${darkMode ? 'bg-gray-400' : 'bg-gray-500'} animate-bounce`} style={{ animationDelay: '0.4s' }} />
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Input Area */}
//         <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//           <div className="relative">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={handleKeyDown}
//               placeholder="Ask a question..."
//               className={`w-full ${inputBg} ${textColor} rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
//             />
//             <button 
//               onClick={handleSubmit}
//               disabled={!input.trim() || isTyping}
//               className={`absolute right-3 top-3 p-1 rounded-full ${input.trim() ? (darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800') : (darkMode ? 'text-gray-500' : 'text-gray-400')}`}
//             >
//               <Send size={20} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useRef, useState } from 'react';
import { Send, Menu, X, MessageSquare, Plus, ArrowLeft, Moon, Sun, Link, ExternalLink } from 'lucide-react';

export default function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);

  // Load chat history from localStorage if available
  const [chatHistory, setChatHistory] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('legal-chat-history');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('legal-chat-history', JSON.stringify(chatHistory));
    }
  }, [chatHistory]);

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

  const handleSubmit = async () => {
  if (!input.trim() || isTyping) return;

  const userMessage = {
    sender: 'user',
    text: input,
    id: Date.now(),
    timestamp: new Date().toLocaleTimeString(),
  };

  setMessages(prev => [...prev, userMessage]);
  setInput('');
  setIsTyping(true);

  try {
    const response = await fetch('http://localhost:5000/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: input }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    const botMessage = {
      sender: 'bot',
      text: data.answer || 'No answer found.',
      id: Date.now() + 1,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, botMessage]);
  } catch (error) {
    console.error('Fetch error:', error);
    const errorMessage = {
      sender: 'bot',
      text: `Error: Could not connect to the server. Please make sure the backend is running.`,
      id: Date.now() + 1,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages(prev => [...prev, errorMessage]);
  } finally {
    setIsTyping(false);
  }
};

  const generateChatTitle = (firstMessage) => {
    const keywords = {
      'contract': 'Contract Query',
      'intellectual property': 'IP Consultation',
      'copyright': 'Copyright Matter',
      'patent': 'Patent Question',
      'employment': 'Employment Issue',
      'liability': 'Liability Concern'
    };
    
    const firstMessageLower = firstMessage.toLowerCase();
    for (const [key, title] of Object.entries(keywords)) {
      if (firstMessageLower.includes(key)) {
        return title;
      }
    }
    
    // Default title based on time if no keywords found
    return `Consultation ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  const updateCurrentChatInHistory = (updatedMessages) => {
    setChatHistory(prev => {
      if (prev.length === 0 || messages.length === 0) {
        const newChat = {
          id: Date.now(),
          title: generateChatTitle(updatedMessages[0]?.text || 'New Chat'),
          timestamp: new Date().toISOString(),
          messages: updatedMessages
        };
        return [newChat, ...prev];
      }
      
      return prev.map(chat => {
        const isCurrentChat = chat.messages.some(chatMsg => 
          messages.some(currentMsg => currentMsg.id === chatMsg.id)
        );
        
        if (isCurrentChat) {
          return {
            ...chat,
            messages: updatedMessages,
            timestamp: new Date().toISOString()
          };
        }
        return chat;
      });
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const startNewChat = () => {
    if (messages.length > 0) {
      const isAlreadySaved = chatHistory.some(chat => 
        chat.messages.some(chatMsg => 
          messages.some(currentMsg => currentMsg.id === chatMsg.id)
      ));
      
      if (!isAlreadySaved) {
        const newChat = {
          id: Date.now(),
          title: generateChatTitle(messages[0]?.text || 'New Chat'),
          timestamp: new Date().toISOString(),
          messages: [...messages]
        };
        setChatHistory(prev => [newChat, ...prev]);
      }
    }
    setMessages([]);
    if (isMobile) setIsSidebarOpen(false);
  };

  const loadChat = (chatId) => {
    const chat = chatHistory.find(c => c.id === chatId);
    if (chat) {
      setMessages(chat.messages);
      if (isMobile) setIsSidebarOpen(false);
    }
  };

  const deleteChat = (chatId, e) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this chat?')) {
      setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
      if (messages.length > 0 && chatHistory.some(chat => 
        chat.id === chatId && chat.messages.some(chatMsg => 
          messages.some(msg => msg.id === chatMsg.id))
      )) {
        setMessages([]);
      }
    }
  };

  const navigateToMain = () => {
    window.location.href = "/";
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Filter chat history based on search query
  const filteredChatHistory = chatHistory
    .filter(chat => 
      chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.messages.some(msg => msg.text.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

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
  const searchBg = darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300';
  const sourceBg = darkMode ? 'bg-gray-600' : 'bg-gray-200';

  // Format URLs in message text
  const formatMessageText = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split('\n').map((paragraph, i) => (
      <p key={i} className="mb-2">
        {paragraph.split(urlRegex).map((part, j) => {
          if (part.match(urlRegex)) {
            return (
              <a 
                key={j} 
                href={part} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`${darkMode ? 'text-blue-300 hover:text-blue-200' : 'text-blue-600 hover:text-blue-800'} underline flex items-center gap-1`}
              >
                <Link size={14} />
                {part.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
              </a>
            );
          }
          return part;
        })}
      </p>
    ));
  };

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
              <h2 className="text-xl font-bold">Case History</h2>
              <button 
                onClick={() => setIsSidebarOpen(false)} 
                className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search chats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full p-2 rounded-lg border ${searchBg} ${darkMode ? 'text-white placeholder-gray-400' : 'text-gray-800 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            
            <button
              onClick={startNewChat}
              className="w-full mb-4 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
            >
              <Plus size={18} />
              New Consultation
            </button>
            
            <div className="space-y-2 max-h-[60vh] overflow-y-auto">
              {filteredChatHistory.map(chat => (
                <div 
                  key={chat.id}
                  onClick={() => loadChat(chat.id)}
                  className={`p-3 hover:${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg cursor-pointer flex flex-col gap-1 border ${darkMode ? 'border-gray-700' : 'border-gray-200'} relative group`}
                >
                  <div className="flex items-center gap-2">
                    <MessageSquare size={16} className={darkMode ? "text-gray-400" : "text-gray-500"} />
                    <span className="truncate font-medium">{chat.title}</span>
                  </div>
                  <span className={`text-xs ${timestampColor}`}>
                    {new Date(chat.timestamp).toLocaleString()}
                  </span>
                  <button
                    onClick={(e) => deleteChat(chat.id, e)}
                    className={`absolute right-2 top-2 p-1 rounded-full opacity-0 group-hover:opacity-100 ${darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-600'}`}
                  >
                    <X size={16} />
                  </button>
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

      {/* Desktop Sidebar */}
      {!isMobile && (
        <div 
          className={`fixed inset-y-0 left-0 z-30 w-72 ${sidebarBg} border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-4 flex flex-col transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0 shadow-lg' : '-translate-x-full'}`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Case History</h2>
            <button 
              onClick={() => setIsSidebarOpen(false)} 
              className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full p-2 rounded-lg border ${searchBg} ${darkMode ? 'text-white placeholder-gray-400' : 'text-gray-800 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          
          <button
            onClick={startNewChat}
            className="w-full mb-4 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
          >
            <Plus size={18} />
            New Consultation
          </button>
          
          <div className="flex-1 overflow-y-auto">
            {filteredChatHistory.map(chat => (
              <div 
                key={chat.id}
                onClick={() => loadChat(chat.id)}
                className={`p-3 hover:${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg cursor-pointer flex flex-col gap-1 mb-2 border ${darkMode ? 'border-gray-700' : 'border-gray-200'} relative group`}
              >
                <div className="flex items-center gap-2">
                  <MessageSquare size={16} className={darkMode ? "text-gray-400" : "text-gray-500"} />
                  <span className="truncate font-medium">{chat.title}</span>
                </div>
                <span className={`text-xs ${timestampColor}`}>
                  {new Date(chat.timestamp).toLocaleString()}
                </span>
                <button
                  onClick={(e) => deleteChat(chat.id, e)}
                  className={`absolute right-2 top-2 p-1 rounded-full opacity-0 group-hover:opacity-100 ${darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-600'}`}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Header */}
        <div className={`flex items-center justify-between p-4 border-b ${navBg} ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`mr-4 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <Menu size={24} />
            </button>
            <h1 className={`text-xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              LegalBot<span className={darkMode ? "text-white" : "text-gray-800"}>™</span>
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

        {/* Chat Container */}
        <div className="flex-1 flex flex-col p-4 overflow-hidden">
          <div className="flex-1 flex justify-center overflow-hidden">
            <div className={`w-full max-w-4xl h-full flex flex-col rounded-xl shadow-md border ${cardBg} overflow-hidden`}>
              {/* Messages Container */}
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-6 space-y-4"
              >
                {messages.length === 0 && (
                  <div className={`flex flex-col items-center justify-center h-full ${darkMode ? 'text-gray-400' : 'text-gray-500'} py-16`}>
                    <MessageSquare size={48} className="mb-4 opacity-50" />
                    <p className="text-xl">Start the Legal Consultation</p>
                    <p className="text-sm mt-2">Ask about contracts, intellectual property, or employment law</p>
                  </div>
                )}
                
                {messages.map((msg, i) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                      <div
                        className={`px-4 py-3 rounded-xl transition-all duration-300 ${
                          msg.sender === 'user'
                            ? `${messageUserBg} text-white rounded-br-none`
                            : `${messageBotBg} ${darkMode ? 'text-gray-100' : 'text-gray-800'} rounded-bl-none border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`
                        }`}
                        style={{
                          opacity: 0,
                          animation: `fadeIn 0.3s forwards ${i * 0.1}s`
                        }}
                      >
                        {formatMessageText(msg.text)}
                        
                        {/* Sources Section */}
                        {msg.sources && msg.sources.length > 0 && (
                          <div className={`mt-3 pt-3 border-t ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                            <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                              <Link size={16} />
                              References:
                            </h4>
                            <div className="space-y-3">
                              {msg.sources.map((source, idx) => (
                                <div 
                                  key={idx} 
                                  className={`p-2 rounded-lg ${sourceBg} text-sm`}
                                >
                                  <div className="flex items-start gap-2">
                                    <span className={`font-medium ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                                      {idx + 1}.
                                    </span>
                                    <div>
                                      <a 
                                        href={source.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className={`${darkMode ? 'text-blue-300 hover:text-blue-200' : 'text-blue-600 hover:text-blue-800'} font-medium flex items-center gap-1`}
                                      >
                                        {source.title}
                                        <ExternalLink size={14} />
                                      </a>
                                      <p className={`mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        {source.snippet}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
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

              {/* New Chat Button */}
              <div className="px-4 pt-2 border-t border-gray-200">
                <button
                  onClick={startNewChat}
                  className="w-full mb-2 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition text-sm"
                >
                  <Plus size={16} />
                  Start New Consultation
                </button>
              </div>

              {/* Input Area */}
              <div className={`p-4 border-t ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                <div className="relative">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    placeholder="Type your legal question..."
                    className={`w-full resize-none border ${inputBg} ${textColor} rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                  <button 
                    onClick={handleSubmit} 
                    disabled={!input.trim()}
                    className={`absolute right-3 bottom-3 p-1 rounded-full ${input.trim() ? (darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800') : (darkMode ? 'text-gray-500' : 'text-gray-400')}`}
                  >
                    <Send />
                  </button>
                </div>
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
