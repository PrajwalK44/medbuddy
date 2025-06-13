import React, { useState, useEffect, useRef } from "react";
import { Mic, Send, X, MicOff, Bot } from "lucide-react";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

interface ChatbotProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const Chatbot: React.FC<ChatbotProps> = ({ open, setOpen }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your MedBuddy AI assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = () => {
    if (input.trim() === "") return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    resetTranscript();

    // Simulate bot response
    setTimeout(() => {
      const botResponse = processUserInput(input);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const processUserInput = (text: string): string => {
    const lowerText = text.toLowerCase();

    // Simple pattern matching for demonstration
    if (
      lowerText.includes("take") ||
      lowerText.includes("took") ||
      lowerText.includes("taken")
    ) {
      return "I've logged your medication as taken. Great job staying on track!";
    } else if (lowerText.includes("miss") || lowerText.includes("missed")) {
      return "I've noted that you missed your dose. I'll alert your caregiver and help you reschedule. When would be a good time to take it?";
    } else if (
      lowerText.includes("side effect") ||
      lowerText.includes("interaction")
    ) {
      return "Let me check that information for you. According to MedlinePlus, common side effects include dizziness and nausea. Would you like more detailed information?";
    } else if (lowerText.includes("schedule") || lowerText.includes("add")) {
      return "I'll add this medication to your schedule. What time would you like to take it?";
    } else if (lowerText.includes("hello") || lowerText.includes("hi")) {
      return "Hello! How can I help with your medications today?";
    } else {
      return "I'm not sure I understand. Could you rephrase that? You can ask me about your medications, log doses as taken, report missed doses, or ask about side effects.";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
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
        <div className="absolute inset-0 bg-gray-500/75 backdrop-blur-sm transition-opacity" />
        <div className="fixed inset-y-0 right-0 max-w-full flex">
          <div className="w-screen max-w-md transform transition-all duration-300 ease-in-out">
            <div className="h-full flex flex-col bg-white dark:bg-gray-800 shadow-xl">
              {/* Header */}
              <div className="px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-700 dark:to-blue-600 text-white flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bot size={24} className="animate-bounce" />
                  <h2 className="text-lg font-medium">MedBuddy AI Assistant</h2>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-md text-white hover:text-gray-200 focus:outline-none transition-colors duration-200 hover:bg-white/10 p-1"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    } animate-fadeIn`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-700 dark:to-blue-600 text-white"
                          : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      <p>{message.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === "user"
                            ? "text-blue-100"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
                <div className="flex items-center space-x-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    className="flex-1 border border-gray-300 dark:border-gray-600 rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
                  />
                  {browserSupportsSpeechRecognition && (
                    <button
                      onClick={toggleListening}
                      className={`p-2 rounded-md transition-all duration-200 ${
                        listening
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {listening ? <MicOff size={20} /> : <Mic size={20} />}
                    </button>
                  )}
                  <button
                    onClick={handleSend}
                    className="bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-700 dark:to-blue-600 text-white p-2 rounded-r-md hover:from-blue-700 hover:to-blue-600 dark:hover:from-blue-800 dark:hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
                  >
                    <Send size={20} />
                  </button>
                </div>
                {listening && (
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 animate-pulse">
                    Listening... {transcript ? `"${transcript}"` : ""}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
        `,
        }}
      />
    </div>
  );
};

export default Chatbot;
