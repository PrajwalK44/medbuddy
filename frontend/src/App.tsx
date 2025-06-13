import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { ChevronRight, Moon, Sun } from "lucide-react";
import Dashboard from "./pages/Dashboard";
import MedicationList from "./pages/MedicationList";
import Reports from "./pages/Reports";
import Chatbot from "./components/Chatbot";
import Sidebar from "./components/Sidebar";
import AddMedication from "./components/AddMedication";
import Profile from "./components/Profile";
import NotificationDropdown from "./components/NotificationDropdown";
// Custom styles to hide scrollbars
const scrollbarHideStyles = {
  // For Firefox
  scrollbarWidth: "none",
  // For IE/Edge
  msOverflowStyle: "none",
  // For Chrome/Safari/Opera - needs to be combined with the ::-webkit-scrollbar style
};

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    console.log("=== INITIAL DARK MODE SETUP ===");

    // Check localStorage first
    const savedMode = localStorage.getItem("darkMode");
    console.log("Saved mode from localStorage:", savedMode);

    if (savedMode !== null) {
      const parsed = JSON.parse(savedMode);
      console.log("Using saved preference:", parsed);
      return parsed;
    }

    // Check system preference
    const systemPreference = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    console.log("System dark mode preference:", systemPreference);

    // Let's default to light mode for testing
    console.log("Defaulting to light mode for debugging");
    return false; // Force light mode initially for testing
  });
  const navigate = useNavigate();

  useEffect(() => {
    console.log("=== DARK MODE EFFECT TRIGGERED ===");
    console.log("Current darkMode state:", darkMode);
    console.log("HTML element before changes:", {
      hasClass: document.documentElement.classList.contains("dark"),
      allClasses: document.documentElement.className,
    });

    // Force remove all dark classes first
    document.documentElement.classList.remove("dark");
    document.body.classList.remove("dark");

    // Then add dark class only if needed
    if (darkMode) {
      console.log("Adding dark classes");
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      console.log("Keeping light mode (no dark classes)");
    }

    console.log("HTML element after changes:", {
      hasClass: document.documentElement.classList.contains("dark"),
      allClasses: document.documentElement.className,
    });

    // Save to localStorage
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    console.log("Saved to localStorage:", darkMode);
  }, [darkMode]); // This will run whenever darkMode changes

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      message: "Time to take your Aspirin medication",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: 2,
      message: "Caretaker John added a new medication reminder",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      message: "Your prescription for Lisinopril is ready for refill",
      time: "Yesterday",
      read: true,
    },
  ]);

  const handleMarkAllAsRead = () => {
    // setNotifications(prevNotifications =>
    //   prevNotifications.map(notification => ({
    //     ...notification,
    //     read: true
    //   }))
    // );
    setNotifications([]);
  };

  const handleProfile = () => {
    navigate("/profile");
  };
  const handleHome = () => {
    navigate("/");
  };

  const toggleDarkMode = (): void => {
    console.log("=== TOGGLE CLICKED ===");
    console.log("Current state before toggle:", darkMode);

    setDarkMode((prevMode: boolean) => {
      const newMode = !prevMode;
      console.log("New mode will be:", newMode);
      return newMode;
    });
  };

  // Add a temporary reset button for testing
  const resetToLight = (): void => {
    console.log("=== FORCE RESET TO LIGHT ===");
    localStorage.removeItem("darkMode");
    setDarkMode(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col overflow-hidden">
      <div className="fixed top-0 left-0 bg-red-500 text-white p-2 text-xs z-50">
        <div>Dark Mode State: {darkMode ? "DARK" : "LIGHT"}</div>
        <div>
          HTML has dark class:{" "}
          {document.documentElement.classList.contains("dark") ? "YES" : "NO"}
        </div>
        <button
          onClick={resetToLight}
          className="bg-white text-black px-2 py-1 rounded text-xs mt-1"
        >
          Force Light Mode
        </button>
      </div>

      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center ">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
              >
                <ChevronRight
                  size={24}
                  className={`transition-transform ${
                    sidebarOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <h1
                className="ml-2 text-xl font-bold text-blue-600 dark:text-blue-400 absolute left-4 cursor-pointer"
                onClick={handleHome}
              >
                MedBuddy AI
              </h1>
            </div>
            <div className="flex items-center space-x-4 absolute right-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label={
                  darkMode ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600">
                <NotificationDropdown
                  notifications={notifications}
                  onMarkAllAsRead={handleMarkAllAsRead}
                />
              </button>
              <div
                onClick={handleProfile}
                className="relative group h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium cursor-pointer"
              >
                JD
                <span className="absolute left-1/2 -translate-x-1/2 top-10 scale-0 group-hover:scale-100 transition-transform bg-gray-800 dark:bg-gray-700 text-white text-xs py-1 px-2 rounded">
                  Hello, John Doe
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {sidebarOpen && <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />}

        {/* Main content */}
        <main
          className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8"
          style={scrollbarHideStyles}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/medications" element={<MedicationList />} />
            <Route path="/medications/add" element={<AddMedication />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>

        {/* Chatbot */}
        <Chatbot open={chatbotOpen} setOpen={setChatbotOpen} />
      </div>

      {/* Chatbot toggle button */}
      {!chatbotOpen && (
        <button
          onClick={() => setChatbotOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 dark:bg-blue-500 text-white shadow-lg flex items-center justify-center hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      )}
      <style jsx global>{`
        ::-webkit-scrollbar {
          display: none;
        }
        * {
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
