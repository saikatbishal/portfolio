import React, { useState, useRef, useEffect } from 'react';
// import { useTheme } from '../contexts/ThemeContext'; // Restore this import in your actual project
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
const useTheme = () => {
  return { isDarkMode: false }; 
};

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ApiResponse {
  answer: string;
  action: string;
  error?: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Saikat's AI assistant. Ask me anything about his portfolio!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Helper to handle scrolling actions from the AI
  const handleAction = (action: string) => {
    if (action === 'none') return;

    // Expected format: "scroll_sectionId"
    const sectionId = action.replace('scroll_', '');
    const element = document.getElementById(sectionId);
    
    if (element) {
      // Small delay to allow the user to read the message first (optional)
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

   
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 35000); 
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ question: userMessage.text }),
        signal: controller.signal, // Attach the abort signal
      });

      clearTimeout(timeoutId); // Clear the safety timer if response arrives

      // Handle Backend Timeout (503 Service Unavailable)
      if (response.status === 503) {
        const errorData = await response.json();
        const timeoutMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: errorData.answer || "I'm thinking a bit too hard and got stuck. Please try asking again in a simpler way!",
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, timeoutMessage]);
        return;
      }

      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      
      // Execute the Smart Navigation Action
      if (data.action) {
        handleAction(data.action);
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.answer,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);

    } catch (error: any) {
      console.error("Chat error:", error);
      
      let errorMessageText = "Sorry, I'm having trouble connecting to the server right now.";
      
      // Handle Client-Side Timeout specifically
      if (error.name === 'AbortError') {
        errorMessageText = "The request timed out. The server is taking too long to respond. Please try again.";
      }

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: errorMessageText,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl ${
          isOpen ? 'rotate-90' : 'rotate-0'
        } ${
          isDarkMode 
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
            : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
        }`}
        aria-label="Toggle Chatbot"
      >
        {isOpen ? <CloseIcon /> : <ChatBubbleOutlineIcon />}
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-24 right-6 z-50 w-[90vw] sm:w-96 h-[500px] max-h-[80vh] rounded-2xl shadow-2xl transition-all duration-300 transform origin-bottom-right flex flex-col overflow-hidden ${
        isOpen 
          ? 'scale-100 opacity-100 translate-y-0' 
          : 'scale-0 opacity-0 translate-y-10 pointer-events-none'
      } ${
        isDarkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-200'
      }`}>
        {/* Header */}
        <div className={`p-4 border-b flex items-center justify-between ${
          isDarkMode 
            ? 'bg-gray-800/50 border-gray-700 backdrop-blur-md' 
            : 'bg-blue-50/50 border-blue-100 backdrop-blur-md'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${
              isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
            }`}>
              <SmartToyIcon fontSize="small" />
            </div>
            <div>
              <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Portfolio Assistant
              </h3>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/>
                <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Online
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${
          isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
                msg.sender === 'user'
                  ? (isDarkMode 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-blue-500 text-white rounded-br-none')
                  : (isDarkMode 
                      ? 'bg-gray-800 text-gray-200 rounded-bl-none border border-gray-700' 
                      : 'bg-white text-gray-800 rounded-bl-none border border-gray-200')
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                <span className={`text-[10px] mt-1 block text-right ${
                  msg.sender === 'user' 
                    ? 'text-blue-100' 
                    : (isDarkMode ? 'text-gray-500' : 'text-gray-400')
                }`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="flex justify-start">
              <div className={`p-4 rounded-2xl rounded-bl-none shadow-sm ${
                isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
              }`}>
                <div className="flex space-x-1.5">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}/>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}/>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}/>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className={`p-4 border-t ${
          isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
        }`}>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className={`flex-1 p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
              }`}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className={`p-3 rounded-xl transition-all duration-200 ${
                isLoading || !input.trim()
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                  : 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg active:scale-95'
              }`}
            >
              <SendIcon fontSize="small" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Chatbot;