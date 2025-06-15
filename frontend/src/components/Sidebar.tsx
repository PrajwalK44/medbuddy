import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Pill,
  FileText,
  User,
  UserCircle,
  Users,
  PlusCircle,
  Settings,
  X,
  Calendar,
  MapPin,
} from "lucide-react";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    { path: "/", icon: Home, label: "Dashboard" },
    { path: "/medications", icon: Pill, label: "Medications" },
    { path: "/medications/add", icon: PlusCircle, label: "Add Medication" },
    { path: "/reports", icon: FileText, label: "Reports" },
    { path: "/profile", icon: User, label: "My Profile" },
    { path: "/patient-profile", icon: UserCircle, label: "Patient Profile" },
    { path: "/caregiver-profile", icon: Users, label: "Caregiver Profile" },
    { path: "/calendar", icon: Calendar, label: "Calendar" },
    { path: "/nearby-pharmacies", icon: MapPin, label: "Nearby Pharmacies" },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 z-20 transform ${
        open ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:static lg:inset-auto transition-all duration-300 ease-in-out bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-lg lg:shadow-none w-64 overflow-y-auto border-r border-gray-200 dark:border-gray-700`}
    >
      <div className="p-4 flex justify-between items-center lg:hidden">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
          MedBuddy AI
        </h2>
        <button
          onClick={() => setOpen(false)}
          className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-all duration-200"
        >
          <X size={24} />
        </button>
      </div>
      <div className="h-full flex flex-col">
        <nav className="flex-1 px-2 py-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  isActive(item.path)
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="px-4 py-6 mt-10">
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <Link
            to="/settings"
            className="group flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200 transition-all duration-200"
          >
            <Settings className="mr-3 h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
            Settings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
