import React, { useState } from "react";
import {
  Calendar as BigCalendar,
  momentLocalizer,
  View,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Initialize the localizer with moment
const localizer = momentLocalizer(moment);

// Define event type
interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  desc?: string;
  type: "medication" | "appointment" | "reminder";
}

interface CalendarProps {
  events?: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  onSlotSelect?: (slotInfo: { start: Date; end: Date }) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  events = [],
  onEventClick,
  onSlotSelect,
}) => {
  const [view, setView] = useState<View>("month");

  const eventStyleGetter = (event: CalendarEvent) => {
    let backgroundColor = "#3b82f6"; // Default blue
    let borderColor = "#2563eb";

    switch (event.type) {
      case "medication":
        backgroundColor = "#ef4444"; // Red
        borderColor = "#dc2626";
        break;
      case "appointment":
        backgroundColor = "#10b981"; // Green
        borderColor = "#059669";
        break;
      case "reminder":
        backgroundColor = "#f59e0b"; // Yellow
        borderColor = "#d97706";
        break;
    }

    return {
      style: {
        backgroundColor,
        borderColor,
        borderRadius: "4px",
        opacity: 0.8,
        color: "white",
        border: "0",
        display: "block",
      },
    };
  };

  return (
    <div className="h-[600px] bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setView("month")}
            className={view === "month" ? "bg-gray-100 dark:bg-gray-700 " : ""}
          >
            Month
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setView("week")}
            className={view === "week" ? "bg-gray-100 dark:bg-gray-700" : ""}
          >
            Week
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setView("day")}
            className={view === "day" ? "bg-gray-100 dark:bg-gray-700" : ""}
          >
            Day
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        view={view}
        onView={setView}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={onEventClick}
        onSelectSlot={onSlotSelect}
        selectable
        popup
        className="dark:bg-gray-800 dark:text-white calendar-custom"
        components={{
          toolbar: () => null, // Remove default toolbar
        }}
      />

      {/* Custom CSS for calendar dark mode support */}
      <style jsx>{`
        .calendar-custom .rbc-calendar {
          background-color: transparent;
        }

        /* Light mode styles */
        .calendar-custom .rbc-month-view {
          background-color: white;
        }

        .calendar-custom .rbc-date-cell {
          color: #374151;
        }

        .calendar-custom .rbc-today {
          background-color: #dbeafe !important;
          color: #1e40af !important;
        }

        .calendar-custom .rbc-off-range-bg {
          background-color: #f9fafb;
        }

        .calendar-custom .rbc-header {
          background-color: #f3f4f6;
          color: #374151;
          border-bottom: 1px solid #e5e7eb;
        }

        /* Dark mode styles */
        .dark .calendar-custom .rbc-month-view {
          background-color: #1f2937;
        }

        .dark .calendar-custom .rbc-date-cell {
          color: #d1d5db;
        }

        .dark .calendar-custom .rbc-today {
          background-color: #1e40af !important;
          color: #ffffff !important;
        }

        .dark .calendar-custom .rbc-off-range-bg {
          background-color: #111827;
          color: #6b7280;
        }

        .dark .calendar-custom .rbc-header {
          background-color: #374151;
          color: #f9fafb;
          border-bottom: 1px solid #4b5563;
        }

        .dark .calendar-custom .rbc-month-row {
          border-bottom: 1px solid #4b5563;
        }

        .dark .calendar-custom .rbc-day-bg {
          border-right: 1px solid #4b5563;
        }

        .dark .calendar-custom .rbc-date-cell a {
          color: #d1d5db;
        }

        .dark .calendar-custom .rbc-date-cell a:hover {
          color: #ffffff;
        }

        /* Week and day view styles */
        .dark .calendar-custom .rbc-time-view {
          background-color: #1f2937;
        }

        .dark .calendar-custom .rbc-time-header {
          background-color: #374151;
          border-bottom: 1px solid #4b5563;
        }

        .dark .calendar-custom .rbc-time-content {
          border-top: 1px solid #4b5563;
        }

        .dark .calendar-custom .rbc-timeslot-group {
          border-bottom: 1px solid #4b5563;
        }

        .dark .calendar-custom .rbc-time-slot {
          border-top: 1px solid #374151;
        }

        .dark .calendar-custom .rbc-day-slot {
          border-right: 1px solid #4b5563;
        }

        .dark .calendar-custom .rbc-current-time-indicator {
          background-color: #ef4444;
        }
      `}</style>
    </div>
  );
};

export default Calendar;
