import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Pill, BarChart2, Settings, X } from "lucide-react";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-20 transform ${
        open ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:static lg:inset-auto transition duration-200 ease-in-out bg-white dark:bg-gray-800 shadow-lg lg:shadow-none w-64 overflow-y-auto`}
    >
      <div className="p-4 flex justify-between items-center lg:hidden">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          MedBuddy AI
        </h2>
        <button
          onClick={() => setOpen(false)}
          className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
        >
          <X size={24} />
        </button>
      </div>
      <nav className="mt-5 px-2 space-y-1">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `group flex items-center px-4 py-3 text-sm font-medium rounded-md ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`
          }
        >
          <Home className="mr-3 h-5 w-5" />
          Dashboard
        </NavLink>
        <NavLink
          to="/medications"
          className={({ isActive }) =>
            `group flex items-center px-4 py-3 text-sm font-medium rounded-md ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`
          }
        >
          <Pill className="mr-3 h-5 w-5" />
          Medications
        </NavLink>
        <NavLink
          to="/reports"
          className={({ isActive }) =>
            `group flex items-center px-4 py-3 text-sm font-medium rounded-md ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`
          }
        >
          <BarChart2 className="mr-3 h-5 w-5" />
          Reports
        </NavLink>
      </nav>
      <div className="px-4 py-6 mt-10">
        <div className="border-t border-gray-200 pt-4">
          <NavLink
            to="/settings"
            className="group flex items-center px-4 py-3 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
