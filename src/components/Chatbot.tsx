import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
// import { useTheme } from '../contexts/ThemeContext'; // Restore this import in your actual project
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';

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
  const [isExpanded, setIsExpanded] = useState(false);
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
  // const { isDarkMode } = useTheme(); // Unused with Tailwind dark mode classes

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
    const timeoutId = setTimeout(() => controller.abort(), 90000);
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

    } catch (error: unknown) {
      console.error("Chat error:", error);

      let errorMessageText = "Sorry, I'm having trouble connecting to the server right now.";

      // Handle Client-Side Timeout specifically
      if (error instanceof Error && error.name === 'AbortError') {
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
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full transition-all duration-300 hover:scale-110 border border-gray-900 dark:border-white bg-white dark:bg-gray-950 text-gray-900 dark:text-white ${isOpen ? 'rotate-90' : 'rotate-0'
          }`}
        aria-label="Toggle Chatbot"
      >
        {isOpen ? <CloseIcon /> : <ChatBubbleOutlineIcon />}
      </button>

      {/* Chat Window */}
      <div className={`fixed z-50 border border-gray-200 dark:border-gray-800 shadow-2xl transition-all duration-300 transform origin-bottom-right flex flex-col overflow-hidden bg-white dark:bg-gray-950 ${
        isOpen
          ? 'scale-100 opacity-100 translate-y-0'
          : 'scale-0 opacity-0 translate-y-10 pointer-events-none'
        } ${
          isExpanded 
            ? 'bottom-6 right-6 w-[95vw] h-[85vh] sm:w-[800px] sm:h-[700px]' 
            : 'bottom-24 right-6 w-[90vw] sm:w-96 h-[500px] max-h-[80vh]'
        }`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 border border-gray-300 dark:border-gray-600 rounded-full text-gray-900 dark:text-white">
              <SmartToyIcon fontSize="small" />
            </div>
            <div>
              <h3 className="font-bold font-mono text-gray-900 dark:text-white">
                Tom Riddle's Diary
              </h3>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
                  Open
                </span>
              </div>
            </div>
          </div>
          
          {/* Expand/Collapse Button */}
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
            aria-label={isExpanded ? "Collapse Chat" : "Expand Chat"}
          >
            {isExpanded ? <CloseFullscreenIcon fontSize="small" /> : <OpenInFullIcon fontSize="small" />}
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-gray-950">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-3 border ${msg.sender === 'user'
                ? 'bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-gray-900 dark:border-white'
                : 'bg-white text-gray-900 border-gray-200 dark:bg-gray-950 dark:text-white dark:border-gray-800'
                }`}>
                <div className="text-sm font-mono leading-relaxed markdown-body">
                    <ReactMarkdown
                    components={{
                      a: ({ node: _node, ...props }) => (
                      <a
                        {...props}
                        className="text-blue-500 underline hover:text-blue-600 break-all"
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                      ),
                      p: ({ node: _node, ...props }) => <p {...props} className="mb-2 last:mb-0" />,
                      ul: ({ node: _node, ...props }) => <ul {...props} className="list-disc ml-4 mb-2" />,
                      ol: ({ node: _node, ...props }) => <ol {...props} className="list-decimal ml-4 mb-2" />,
                      li: ({ node: _node, ...props }) => <li {...props} className="mb-1" />,
                      code: ({ node: _node, ...props }) => (
                      <code {...props} className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-xs font-bold" />
                      ),
                    }}
                    >
                    {msg.text}
                    </ReactMarkdown>
                </div>
                <span className={`text-[10px] font-mono mt-1 block text-right 
                ${msg.sender === 'user'
                  ? 'text-gray-400 dark:text-gray-500'
                  : 'text-gray-400 dark:text-gray-500'
                  }`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="p-4 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
                <div className="flex space-x-1.5">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white placeholder-gray-400 font-mono text-sm focus:outline-none focus:border-gray-900 dark:focus:border-white transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className={`p-3 border transition-all duration-200 ${isLoading || !input.trim()
                ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600 dark:border-gray-700'
                : 'bg-gray-900 text-white border-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:border-white dark:hover:bg-gray-100'
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