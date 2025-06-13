import React, { useState, useRef, useEffect } from "react";
import { Bell, Check, Trash2 } from "lucide-react";

interface Notification {
  id: number;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationDropdownProps {
  notifications: Notification[];
  onMarkAllAsRead: () => void;
}

const NotificationDropdown = ({
  notifications = [] as Notification[],
  onMarkAllAsRead,
}: NotificationDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const hasUnread = notifications.some((n) => !n.read);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 relative transition-all duration-200 hover:scale-105"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell
          size={20}
          className="transition-transform duration-200 hover:rotate-12"
        />
        {hasUnread && (
          <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-20 overflow-hidden transform transition-all duration-200 ease-out animate-slideDown">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Notifications
            </h3>
          </div>

          <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`px-4 py-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 ${
                    !notification.read ? "bg-blue-50 dark:bg-blue-900/20" : ""
                  }`}
                >
                  <p className="text-sm text-gray-800 dark:text-gray-200">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {notification.time}
                  </p>
                </div>
              ))
            ) : (
              <div className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
                <p>No notifications</p>
              </div>
            )}
          </div>

          {notifications.length > 0 && (
            <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <button
                className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center space-x-1 transition-colors duration-200"
                onClick={onMarkAllAsRead}
              >
                <Trash2 size={14} />
                <span>Clear all notifications</span>
              </button>
            </div>
          )}
        </div>
      )}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-slideDown {
            animation: slideDown 0.2s ease-out;
          }
        `,
        }}
      />
    </div>
  );
};

export default NotificationDropdown;
