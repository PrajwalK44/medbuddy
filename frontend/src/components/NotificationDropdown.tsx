import React, { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";

interface Notification {
  id: number;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationDropdownProps {
    notifications: Notification[];
    onMarkAllAsRead: () => void;  // Properly typed callback function
}

const NotificationDropdown = ({
  notifications = [] as Notification[],
  onMarkAllAsRead,
}: NotificationDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close notifications when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
        className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell size={20} />
        {hasUnread && (
          <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-20 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700">Notifications</h3>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 ${
                    !notification.read ? "bg-blue-50" : ""
                  }`}
                >
                  <p className="text-sm text-gray-800">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {notification.time}
                  </p>
                </div>
              ))
            ) : (
              <div className="px-4 py-6 text-center text-gray-500">
                <p>No notifications</p>
              </div>
            )}
          </div>

            {notifications.length > 0 && (
            <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
                <button
                className="text-xs text-blue-600 hover:text-blue-800"
                onClick={onMarkAllAsRead}
                >
                Clear all notifications
                </button>
            </div>
            )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
