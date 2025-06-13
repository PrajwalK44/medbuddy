import React, { useState } from "react";
import Calendar from "../components/Calendar";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  desc?: string;
  type: "medication" | "appointment" | "reminder";
}

const CalendarPage: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "Morning Medication",
      start: new Date(2024, 2, 20, 8, 0),
      end: new Date(2024, 2, 20, 8, 30),
      type: "medication",
    },
    {
      id: "2",
      title: "Doctor Appointment",
      start: new Date(2024, 2, 21, 14, 0),
      end: new Date(2024, 2, 21, 15, 0),
      type: "appointment",
    },
    {
      id: "3",
      title: "Evening Medication",
      start: new Date(2024, 2, 20, 20, 0),
      end: new Date(2024, 2, 20, 20, 30),
      type: "medication",
    },
  ]);

  const handleEventClick = (event: CalendarEvent) => {
    console.log("Event clicked:", event);
    // TODO: Implement event details modal
  };

  const handleSlotSelect = (slotInfo: { start: Date; end: Date }) => {
    console.log("Slot selected:", slotInfo);
    // TODO: Implement new event creation modal
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-500">Calendar</h1>
        <Button className="text-white border-white">
          <Plus className="h-4 w-4 mr-2 text-white" />
          Add Event
        </Button>
      </div>
      <Calendar
        events={events}
        onEventClick={handleEventClick}
        onSlotSelect={handleSlotSelect}
      />
    </div>
  );
};

export default CalendarPage;
