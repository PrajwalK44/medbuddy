import React, { useState, useEffect, useRef } from 'react';
import { Mic, Send, X, MicOff } from 'lucide-react';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

interface ChatbotProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot: React.FC<ChatbotProps> = ({ open, setOpen }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your MedBuddy AI assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = () => {
    if (input.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    resetTranscript();

    // Simulate bot response
    setTimeout(() => {
      const botResponse = processUserInput(input);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const processUserInput = (text: string): string => {
    const lowerText = text.toLowerCase();
    
    // Simple pattern matching for demonstration
    if (lowerText.includes('take') || lowerText.includes('took') || lowerText.includes('taken')) {
      return "I've logged your medication as taken. Great job staying on track!";
    } else if (lowerText.includes('miss') || lowerText.includes('missed')) {
      return "I've noted that you missed your dose. I'll alert your caregiver and help you reschedule. When would be a good time to take it?";
    } else if (lowerText.includes('side effect') || lowerText.includes('interaction')) {
      return "Let me check that information for you. According to MedlinePlus, common side effects include dizziness and nausea. Would you like more detailed information?";
    } else if (lowerText.includes('schedule') || lowerText.includes('add')) {
      return "I'll add this medication to your schedule. What time would you like to take it?";
    } else if (lowerText.includes('hello') || lowerText.includes('hi')) {
      return "Hello! How can I help with your medications today?";
    } else {
      return "I'm not sure I understand. Could you rephrase that? You can ask me about your medications, log doses as taken, report missed doses, or ask about side effects.";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-30 overflow-hidden lg:inset-auto lg:right-0 lg:bottom-0 lg:top-16 lg:w-96">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div className="fixed inset-y-0 right-0 max-w-full flex">
          <div className="w-screen max-w-md">
            <div className="h-full flex flex-col bg-white shadow-xl">
              {/* Header */}
              <div className="px-4 py-3 bg-blue-600 text-white flex items-center justify-between">
                <h2 className="text-lg font-medium">MedBuddy AI Assistant</h2>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-md text-white hover:text-gray-200 focus:outline-none"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 flex ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-800 border border-gray-200'
                      }`}
                    >
                      <p>{message.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex items-center">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    className="flex-1 border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {browserSupportsSpeechRecognition && (
                    <button
                      onClick={toggleListening}
                      className={`p-2 ${
                        listening ? 'bg-red-500' : 'bg-gray-200'
                      } text-gray-700`}
                    >
                      {listening ? <MicOff size={20} /> : <Mic size={20} />}
                    </button>
                  )}
                  <button
                    onClick={handleSend}
                    className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-700"
                  >
                    <Send size={20} />
                  </button>
                </div>
                {listening && (
                  <div className="mt-2 text-sm text-gray-500">
                    Listening... {transcript ? `"${transcript}"` : ''}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;