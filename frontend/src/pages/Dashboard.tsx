import React, { useState } from "react";
import { Calendar, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import AdherenceChart from "../components/AdherenceChart";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  time: string;
  taken: boolean;
  dueToday: boolean;
}

const Dashboard: React.FC = () => {
  const [medications] = useState<Medication[]>([
    {
      id: "1",
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      time: "08:00",
      taken: true,
      dueToday: true,
    },
    {
      id: "2",
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      time: "09:00",
      taken: false,
      dueToday: true,
    },
    {
      id: "3",
      name: "Atorvastatin",
      dosage: "20mg",
      frequency: "Once daily",
      time: "20:00",
      taken: false,
      dueToday: true,
    },
    {
      id: "4",
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      time: "20:00",
      taken: false,
      dueToday: true,
    },
  ]);

  const today = new Date();
  const currentDate = format(today, "EEEE, MMMM d, yyyy");

  const upcomingMedications = medications
    .filter((med) => med.dueToday && !med.taken)
    .sort((a, b) => a.time.localeCompare(b.time));

  const takenMedications = medications.filter(
    (med) => med.dueToday && med.taken
  );

  const adherenceRate = Math.round(
    (takenMedications.length /
      medications.filter((med) => med.dueToday).length) *
      100
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <div className="flex items-center mt-2 text-gray-500 dark:text-gray-400">
          <Calendar size={18} className="mr-2" />
          <span>{currentDate}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Adherence Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Today's Adherence
          </h2>
          <div className="flex items-center justify-between">
            <div className="text-5xl font-bold text-blue-600 dark:text-blue-400">
              {adherenceRate}%
            </div>
            <div className="w-24 h-24">
              <div className="relative w-full h-full">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="3"
                    className="dark:stroke-gray-700"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="3"
                    strokeDasharray={`${adherenceRate}, 100`}
                    className="dark:stroke-blue-400"
                  />
                </svg>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <CheckCircle
                    size={32}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </div>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            You've taken {takenMedications.length} of{" "}
            {medications.filter((med) => med.dueToday).length} medications
            today.
          </p>
        </div>

        {/* Upcoming Medications */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Upcoming Medications
          </h2>
          {upcomingMedications.length > 0 ? (
            <ul className="space-y-3">
              {upcomingMedications.slice(0, 3).map((medication) => (
                <li key={medication.id} className="flex items-center">
                  <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2 mr-3">
                    <Clock
                      size={18}
                      className="text-blue-600 dark:text-blue-400"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {medication.name} {medication.dosage}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {medication.time}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No upcoming medications for today.
            </p>
          )}
          {upcomingMedications.length > 3 && (
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-3 cursor-pointer hover:underline">
              +{upcomingMedications.length - 3} more
            </p>
          )}
        </div>

        {/* AI Insights */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            AI Insights
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-yellow-100 dark:bg-yellow-900 rounded-full p-2 mr-3 mt-1">
                <AlertCircle
                  size={18}
                  className="text-yellow-600 dark:text-yellow-400"
                />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Adherence Pattern Detected
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  You tend to miss evening doses on weekdays. Consider setting
                  an additional reminder.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-green-100 dark:bg-green-900 rounded-full p-2 mr-3 mt-1">
                <CheckCircle
                  size={18}
                  className="text-green-600 dark:text-green-400"
                />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Improvement Noted
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Your morning medication adherence has improved by 15% this
                  week!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Adherence Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Weekly Adherence
          </h2>
          <select className="border border-gray-300 dark:border-gray-600 rounded-md text-sm p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            <option>Last 7 days</option>
            <option>Last 14 days</option>
            <option>Last 30 days</option>
          </select>
        </div>
        <div className="h-64">
          <AdherenceChart />
        </div>
      </div>

      {/* Caregiver Updates */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Caregiver Updates
        </h2>
        <div className="border-l-4 border-blue-500 dark:border-blue-400 pl-4 py-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Dr. Smith reviewed your adherence report on May 15, 2025
          </p>
        </div>
        <div className="border-l-4 border-green-500 dark:border-green-400 pl-4 py-2 mt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Your daughter Sarah was notified about your improved adherence
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
