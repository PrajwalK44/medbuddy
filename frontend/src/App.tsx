import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { ChevronRight, Moon, Sun, MessageCircle } from "lucide-react";
import Dashboard from "./pages/Dashboard";
import MedicationList from "./pages/MedicationList";
import Reports from "./pages/Reports";
import Chatbot from "./components/Chatbot";
import Sidebar from "./components/Sidebar";
import AddMedication from "./pages/AddMedication";
import Profile from "./components/Profile";
import NotificationDropdown from "./components/NotificationDropdown";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientProfile from "./pages/PatientProfile";
import CaregiverProfile from "./pages/CaregiverProfile";
import CalendarPage from "./pages/CalendarPage";
import NearbyPharmaciesPage from "./pages/NearbyPharmaciesPage";

interface Notification {
  id: number;
  message: string;
  time: string;
  read: boolean;
}

// Custom styles to hide scrollbars
const scrollbarHideStyles: React.CSSProperties = {
  scrollbarWidth: "none" as const,
  msOverflowStyle: "none",
};

function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
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
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Save to localStorage whenever darkMode changes
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

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
    setNotifications([]);
  };

  const handleProfile = () => {
    navigate("/profile");
  };
  const handleHome = () => {
    navigate("/");
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm z-10 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-all duration-200"
              >
                <ChevronRight
                  size={24}
                  className={`transition-transform duration-300 ${
                    sidebarOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <h1
                className="ml-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity"
                onClick={handleHome}
              >
                MedBuddy AI
              </h1>
            </div>
            <div className="flex items-center space-x-4 absolute right-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 hover:scale-105"
                aria-label={
                  darkMode ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 hover:scale-105">
                <NotificationDropdown
                  notifications={notifications}
                  onMarkAllAsRead={handleMarkAllAsRead}
                />
              </button>
              <div
                onClick={handleProfile}
                className="relative group h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                JD
                <span className="absolute left-1/2 -translate-x-1/2 top-12 scale-0 group-hover:scale-100 transition-all duration-200 bg-gray-800 dark:bg-gray-700 text-white text-xs py-1 px-2 rounded shadow-lg">
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
          className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm"
          style={scrollbarHideStyles}
        >
          {children}
        </main>

        {/* Chatbot */}
        <Chatbot open={chatbotOpen} setOpen={setChatbotOpen} />
      </div>

      {/* Chatbot toggle button */}
      {!chatbotOpen && (
        <button
          onClick={() => setChatbotOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-400 text-white shadow-lg flex items-center justify-center hover:shadow-xl hover:scale-105 transition-all duration-200"
        >
          <MessageCircle size={24} />
        </button>
      )}
      <style>
        {`
          ::-webkit-scrollbar {
            display: none;
          }
          * {
            scrollbar-width: none;
          }
        `}
      </style>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* All authenticated routes with wildcard for nested routing */}
        <Route
          path="/*"
          element={
            <AuthenticatedLayout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/patient-profile/*" element={<PatientProfile />} />
                <Route
                  path="/caregiver-profile/*"
                  element={<CaregiverProfile />}
                />
                <Route path="/medications/*" element={<MedicationList />} />
                <Route path="/medications/add" element={<AddMedication />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route
                  path="/nearby-pharmacies"
                  element={<NearbyPharmaciesPage />}
                />
              </Routes>
            </AuthenticatedLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
